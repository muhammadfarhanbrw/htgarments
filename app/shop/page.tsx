'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ... (All your existing Icon components remain the same - they stay unchanged)
const ShoppingCartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HeartIcon = ({ filled = false, className = "" }: { filled?: boolean; className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

// Pagination Icons
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

// Payment numbers - replace with your actual numbers
const PAYMENT_NUMBERS = [
  { provider: 'JazzCash', number: '0300-1234567', name: 'Ali Khan' },
  { provider: 'EasyPaisa', number: '0312-9876543', name: 'Ali Khan' }
];

// Color palette for categories
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; line: string }> = {
  'all': { bg: 'bg-gradient-to-r from-blue-50 to-indigo-50', text: 'text-blue-700', border: 'border-blue-200', line: 'from-blue-600 to-indigo-600' },
  'pents': { bg: 'bg-gradient-to-r from-purple-50 to-pink-50', text: 'text-purple-700', border: 'border-purple-200', line: 'from-purple-600 to-pink-600' },
  'shirts': { bg: 'bg-gradient-to-r from-green-50 to-emerald-50', text: 'text-green-700', border: 'border-green-200', line: 'from-green-600 to-emerald-600' },
  'undergarments': { bg: 'bg-gradient-to-r from-orange-50 to-red-50', text: 'text-orange-700', border: 'border-orange-200', line: 'from-orange-600 to-red-600' },
  'watches': { bg: 'bg-gradient-to-r from-cyan-50 to-blue-50', text: 'text-cyan-700', border: 'border-cyan-200', line: 'from-cyan-600 to-blue-600' },
  'kids': { bg: 'bg-gradient-to-r from-pink-50 to-rose-50', text: 'text-pink-700', border: 'border-pink-200', line: 'from-pink-600 to-rose-600' },
  'trending': { bg: 'bg-gradient-to-r from-red-50 to-orange-50', text: 'text-red-700', border: 'border-red-200', line: 'from-red-600 to-orange-600' },
  'deal': { bg: 'bg-gradient-to-r from-yellow-50 to-amber-50', text: 'text-yellow-700', border: 'border-yellow-200', line: 'from-yellow-600 to-amber-600' },
};

// Get color for category
const getCategoryColor = (categoryId: string) => {
  return CATEGORY_COLORS[categoryId] || { 
    bg: 'bg-gradient-to-r from-gray-50 to-gray-100', 
    text: 'text-gray-700', 
    border: 'border-gray-200',
    line: 'from-gray-600 to-gray-700'
  };
};

export default function Shop() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // New state for product details modal
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  // Payment state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12); // Set to 12 products per page

  // Slider state for trending/deal sections
  const [trendingScroll, setTrendingScroll] = useState(0);
  const [dealScroll, setDealScroll] = useState(0);
  const trendingContainerRef = useRef<HTMLDivElement>(null);
  const dealContainerRef = useRef<HTMLDivElement>(null);

  // Available categories from products
  const [availableCategories, setAvailableCategories] = useState<Array<{id: string, name: string, count: number}>>([
    { id: 'all', name: 'All Products', count: 0 }
  ]);

  // Function to show product details
  const showProductDetails = (product: any) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setIsProductModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Function to close product details
  const closeProductDetails = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        console.log('🔄 Fetching products...');
        const res = await fetch('/api/products');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          const text = await res.text();
          console.log('📝 Raw response (not JSON):', text.substring(0, 200));
          throw new Error('Response is not JSON');
        }
        
        const data = await res.json();
        console.log('✅ Products fetched:', data.length);
        
        // Filter out products without category
        const validProducts = Array.isArray(data) 
          ? data.filter(product => product && product.category)
          : [];
        
        setProducts(validProducts);
        
        // Extract unique categories from products (excluding special categories)
        const categoriesMap = new Map();
        validProducts.forEach(product => {
          const cat = product.category.toLowerCase();
          // Only include regular categories, not special ones
          if (cat !== 'trending' && cat !== 'deal') {
            categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
          }
        });
        
        // Create categories array with counts
        const categoriesArray = Array.from(categoriesMap.entries()).map(([id, count]) => {
          // Capitalize first letter of each word
          const name = id.split(' ').map((word: string) => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          
          return { id, name, count };
        });
        
        // Sort by count (descending)
        categoriesArray.sort((a, b) => b.count - a.count);
        
        // Add "All Products" with total count
        setAvailableCategories([
          { id: 'all', name: 'All Products', count: validProducts.length },
          ...categoriesArray
        ]);
        
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setProducts([]);
        setAvailableCategories([{ id: 'all', name: 'All Products', count: 0 }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update cart count
  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(totalItems);
  }, [cart]);

  // Filter products by special categories
  const trendingProducts = products.filter(product => 
    product && product.category && product.category.toLowerCase() === 'trending'
  );

  const dealProducts = products.filter(product => 
    product && product.category && product.category.toLowerCase() === 'deal'
  );

  // Filter and sort products for main grid
  const filteredProducts = products.filter(product => {
    if (!product || !product.name) return false;
    
    // Exclude trending and deal products from main grid
    const isSpecialCategory = product.category && 
      (product.category.toLowerCase() === 'trending' || product.category.toLowerCase() === 'deal');
    
    if (isSpecialCategory) return false;
    
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return (a.price || 0) - (b.price || 0);
      case 'price-high': return (b.price || 0) - (a.price || 0);
      case 'name-asc': return (a.name || '').localeCompare(b.name || '');
      case 'name-desc': return (b.name || '').localeCompare(a.name || '');
      default: return 0;
    }
  });

  // Pagination logic
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Calculate paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: (item.quantity || 1) + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item => 
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const totalPrice = cart.reduce((total, item) => 
    total + ((item.price || 0) * (item.quantity || 1)), 0
  );

  // Add to cart from product details
  const addToCartFromDetails = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, productQuantity);
    }
  };

  // Generate reference code
  const generateReferenceCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRTUVWXYZ23456789';
    let code = 'ORD';
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Generate reference code
    const refCode = generateReferenceCode();
    setReferenceCode(refCode);
    setOrderTotal(totalPrice);
    
    // Save order to localStorage
    const order = {
      refCode,
      items: cart,
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.setItem('refCode', refCode);
    
    // Show payment modal
    setShowPaymentModal(true);
  };

  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setIsCartOpen(false);
  };

  // Complete order and clear cart
  const completeOrder = () => {
    // Clear cart
    setCart([]);
    // Close modals
    setShowPaymentModal(false);
    setIsCartOpen(false);
    // Show success message
    alert(`✅ Order placed successfully!\n\nReference Code: ${referenceCode}\nAmount: $${orderTotal}\n\nPlease save your reference code for tracking.`);
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Slider functions for trending section
  const scrollTrending = (direction: 'left' | 'right') => {
    if (!trendingContainerRef.current) return;
    
    const container = trendingContainerRef.current;
    const scrollAmount = 320; // Width of one card + gap
    const newScroll = direction === 'left' 
      ? Math.max(0, trendingScroll - scrollAmount)
      : trendingScroll + scrollAmount;
    
    setTrendingScroll(newScroll);
    container.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  // Slider functions for deal section
  const scrollDeal = (direction: 'left' | 'right') => {
    if (!dealContainerRef.current) return;
    
    const container = dealContainerRef.current;
    const scrollAmount = 320; // Width of one card + gap
    const newScroll = direction === 'left' 
      ? Math.max(0, dealScroll - scrollAmount)
      : dealScroll + scrollAmount;
    
    setDealScroll(newScroll);
    container.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  // Render product card component
  const ProductCard = ({ product, index }: { product: any, index: number }) => {
    const isInWishlist = wishlist.includes(product._id);
    const discount = product.originalPrice ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 
      null;

    return (
      <div 
        key={product._id || `product-${index}`}
        className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 min-w-[280px] flex-shrink-0"
      >
        {/* Product Image Container with Hover Overlay */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            src={product.imageUrl || `https://source.unsplash.com/featured/400x300?${product.category}`} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `https://source.unsplash.com/featured/400x300?${product.category}`;
            }}
          />
          
          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Product Name Overlay - Appears on Hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <h3 className="text-white text-lg font-bold text-center mb-4 px-4 line-clamp-2">
              {product.name}
            </h3>
            
            {/* Detail View Button - Appears on Hover */}
            <button
              onClick={() => showProductDetails(product)}
              className="px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
          
          {/* Wishlist Button - Always Visible */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          >
            <HeartIcon filled={isInWishlist} className={isInWishlist ? 'text-red-500' : 'text-gray-600'} />
          </button>
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
              -{discount}% OFF
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Product Info Below Image */}
        <div className="p-4">
          {/* Price Display */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-gray-900">
                Rs:{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : '0.00'}
                </span>
              )}
            </div>
          </div>
          
          {/* Transparent Add to Cart Button - Below Image */}
          <button
            onClick={() => addToCart(product)}
            className="w-full px-4 py-3 bg-transparent border-2 border-blue-500 hover:border-blue-600 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50/50 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    // Generate page numbers to display
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{indexOfFirstProduct + 1}</span> to{' '}
          <span className="font-semibold">{Math.min(indexOfLastProduct, totalProducts)}</span> of{' '}
          <span className="font-semibold">{totalProducts}</span> products
        </div>
        
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2.5 rounded-xl border font-medium transition-all duration-200 ${
              currentPage === 1
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            <ChevronLeftIcon />
            <span className="ml-2 hidden sm:inline">Previous</span>
          </button>
          
          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {startPage > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    currentPage === 1
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  1
                </button>
                {startPage > 2 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                )}
              </>
            )}
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-200 ${
                  currentPage === number
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {number}
              </button>
            ))}
            
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    currentPage === totalPages
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2.5 rounded-xl border font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            <span className="mr-2 hidden sm:inline">Next</span>
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">HT<span className="text-blue-600">Garments</span></h1>
          </div>

          <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-96 shadow-sm hover:shadow-md transition-shadow">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              className="bg-transparent outline-none w-full ml-3 text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 group"
          >
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Trending Products Section with Slider */}
        {trendingProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">🔥 Trending Now</h2>
                <p className="text-gray-600 mt-2">Hot picks everyone's loving right now</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-full border border-red-200">
                  <span className="text-red-700 font-medium">{trendingProducts.length} Products</span>
                </div>
                
                {/* Slider Navigation for Trending */}
                {trendingProducts.length > 4 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollTrending('left')}
                      disabled={trendingScroll <= 0}
                      className={`p-2 rounded-full border ${trendingScroll <= 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-red-300 text-red-600 hover:bg-red-50'}`}
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      onClick={() => scrollTrending('right')}
                      className="p-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Slider Container */}
            <div className="relative">
              <div 
                ref={trendingContainerRef}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
              >
                {trendingProducts.map((product, index) => (
                  <div key={`trending-${product._id || index}`} className="snap-start">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
              
              {/* Gradient overlay for slider */}
              <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>
          </section>
        )}

        {/* Hot Deals Section with Slider */}
        {dealProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">🔥 Hot Deals</h2>
                <p className="text-gray-600 mt-2">Limited time offers you can't miss</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-full border border-yellow-200">
                  <span className="text-yellow-700 font-medium">{dealProducts.length} Deals</span>
                </div>
                
                {/* Slider Navigation for Deals */}
                {dealProducts.length > 4 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollDeal('left')}
                      disabled={dealScroll <= 0}
                      className={`p-2 rounded-full border ${dealScroll <= 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'}`}
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      onClick={() => scrollDeal('right')}
                      className="p-2 rounded-full border border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Slider Container */}
            <div className="relative">
              <div 
                ref={dealContainerRef}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
              >
                {dealProducts.map((product, index) => (
                  <div key={`deal-${product._id || index}`} className="snap-start">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
              
              {/* Gradient overlay for slider */}
              <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3">Discover our premium collection</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {availableCategories.map((cat) => {
              const colors = getCategoryColor(cat.id);
              const isSelected = selectedCategory === cat.id;
              
              return (
                <div key={cat.id} className="relative group">
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                      isSelected
                        ? `${colors.bg} ${colors.text} border ${colors.border} shadow-lg scale-105`
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <span className="mr-2">
                      {cat.id === 'all' && '🛍️'}
                      {cat.id === 'pents' && '👖'}
                      {cat.id === 'shirts' && '👕'}
                      {cat.id === 'undergarments' && '🩲'}
                      {cat.id === 'watches' && '⌚'}
                      {cat.id === 'kids' && '👶'}
                    </span>
                    {cat.name}
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      isSelected ? 'bg-white/30' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                  
                  {/* Animated line under selected category */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1">
                      <div className={`h-full bg-gradient-to-r ${colors.line} rounded-full animate-pulse`}></div>
                    </div>
                  )}
                  
                  {/* Hover line effect */}
                  {!isSelected && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-0.5 transition-all duration-300">
                      <div className={`h-full bg-gradient-to-r ${colors.line} rounded-full`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Separator line */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>
        </section>

        {/* Sort Options */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : 
                availableCategories.find(c => c.id === selectedCategory)?.name || 'Products'}
              <span className="ml-2 text-blue-600">({sortedProducts.length})</span>
            </h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                Search results for: "<span className="font-semibold">{searchQuery}</span>"
              </p>
            )}
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={`skeleton-${i}`} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard 
                  key={`product-${product._id || product.id || index}`} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>
            
            {/* Pagination Component */}
            <Pagination />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchQuery 
                ? `No products match your search for "${searchQuery}". Try different keywords or browse categories.`
                : selectedCategory !== 'all'
                ? `No products available in ${availableCategories.find(c => c.id === selectedCategory)?.name || 'this category'}. Try another category.`
                : 'No products available at the moment. Check back soon!'}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Details Modal - FIXED */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100]">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeProductDetails}
          />
          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <div 
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeProductDetails}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <CloseIcon />
                </button>
                
                <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                  {/* Product Image */}
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={selectedProduct.imageUrl || `https://source.unsplash.com/featured/600x600?${selectedProduct.category}`} 
                        alt={selectedProduct.name}
                        className="w-full h-96 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://source.unsplash.com/featured/600x600?${selectedProduct.category}`;
                        }}
                      />
                    </div>
                    
                    {/* Price Display */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Total Price:</span>
                          <div className="flex items-center mt-1">
                            <span className="text-2xl font-bold text-gray-900">
                              ${typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : '0.00'}
                            </span>
                            {selectedProduct.originalPrice && (
                              <span className="ml-3 text-lg text-gray-400 line-through">
                                ${typeof selectedProduct.originalPrice === 'number' ? selectedProduct.originalPrice.toFixed(2) : '0.00'}
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedProduct.originalPrice && (
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                            Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {selectedProduct.category}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {selectedProduct.name}
                      </h1>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Product Details</h3>
                      <p className="text-gray-700">
                        {selectedProduct.description || 'No description available for this product.'}
                      </p>
                    </div>
                    
                    {/* Quantity and Add to Cart */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700 mb-2 block">Quantity:</span>
                            <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                              <button 
                                onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <MinusIcon />
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center font-medium bg-gray-50">
                                {productQuantity}
                              </span>
                              <button 
                                onClick={() => setProductQuantity(productQuantity + 1)}
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-700 mb-2 block">Subtotal:</span>
                            <span className="text-2xl font-bold text-gray-900">
                              ${((selectedProduct.price || 0) * productQuantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={addToCartFromDetails}
                            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add to Cart
                          </button>
                          
                          <button
                            onClick={() => {
                              addToCartFromDetails();
                              setIsCartOpen(true);
                              closeProductDetails();
                            }}
                            className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Buy Now
                          </button>
                        </div>
                        
                        <button
                          onClick={() => toggleWishlist(selectedProduct._id)}
                          className={`w-full py-3 border rounded-lg flex items-center justify-center transition-all duration-200 ${
                            wishlist.includes(selectedProduct._id)
                              ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <HeartIcon 
                            filled={wishlist.includes(selectedProduct._id)} 
                            className={`mr-2 ${wishlist.includes(selectedProduct._id) ? 'text-red-500' : 'text-gray-600'}`}
                          />
                          {wishlist.includes(selectedProduct._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}