'use client';

import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const categories = [
    { name: 'Men\'s Collection', href: '/shop?category=men' },
    { name: 'Women\'s Collection', href: '/shop?category=women' },
    { name: 'Kids Wear', href: '/shop?category=kids' },
    { name: 'Traditional Wear', href: '/shop?category=traditional' },
    { name: 'Casual Wear', href: '/shop?category=casual' },
    { name: 'Formal Wear', href: '/shop?category=formal' },
  ];

  const services = [
    { name: 'Free Fitting', href: '/services#fitting' },
    { name: 'Home Delivery', href: '/services#delivery' },
    { name: 'Easy Exchange', href: '/services#exchange' },
    { name: 'Stitching Service', href: '/services#stitching' },
    { name: 'Gift Wrapping', href: '/services#gift' },
    { name: 'Installment Payment', href: '/services#payment' },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">HT</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  HT-Garments
                </h2>
                <p className="text-sm text-gray-600">Premium Clothing Store</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Your premier destination for quality garments in Burewala. Experience style, comfort, and elegance in every stitch.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Store Location</p>
                  <p className="text-gray-600 text-sm">
                    HT-Garments near Al Rahman store<br />
                    C-block Burewala
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Contact Numbers</p>
                  <div className="space-y-1">
                    <a href="tel:03146466648" className="text-gray-600 text-sm hover:text-blue-600 transition-colors block">
                      📞 0314-6466648
                    </a>
                    <a href="tel:03136956888" className="text-gray-600 text-sm hover:text-blue-600 transition-colors block">
                      📞 0313-6956888
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-gray-200 relative">
              <span className="relative text-gray-900">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-gray-200 relative">
              <span className="relative text-gray-900">
                Categories
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href}
                    className="text-gray-600 hover:text-green-600 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-2 transition-transform">{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Timing */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-gray-200 relative">
              <span className="relative text-gray-900">
                Stay Updated
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              </span>
            </h3>
            
            <div className="mb-8">
              <p className="text-gray-600 mb-4">Subscribe for updates on new arrivals and special offers</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Store Timing */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Store Hours
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday - Sunday</span>
                    <span className="text-gray-900 font-medium">10:00 AM - 11:00 PM</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <span className="text-gray-600">Ramadan Timing:</span>
                    <span className="text-gray-900 font-medium ml-2">1:00 PM - 3:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold mb-6 text-center text-gray-900">
            Our Premium Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service) => (
              <a
                key={service.name}
                href={service.href}
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-gray-200">
                  <span className="text-lg">
                    {service.name.includes('Fitting') && '👕'}
                    {service.name.includes('Delivery') && '🚚'}
                    {service.name.includes('Exchange') && '🔄'}
                    {service.name.includes('Stitching') && '🧵'}
                    {service.name.includes('Gift') && '🎁'}
                    {service.name.includes('Payment') && '💳'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  {service.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} HT-Garments Burewala. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="https://wa.me/923144646648" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors border border-green-200">
                    <span className="text-lg">💬</span>
                  </div>
                  <span className="text-sm">WhatsApp</span>
                </div>
              </a>
              
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors border border-blue-200">
                    <span className="text-lg">📘</span>
                  </div>
                  <span className="text-sm">Facebook</span>
                </div>
              </a>
              
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center transition-colors border border-pink-200">
                    <span className="text-lg">📸</span>
                  </div>
                  <span className="text-sm">Instagram</span>
                </div>
              </a>
            </div>
            
            <div className="text-gray-600 text-sm">
              Crafted with ❤️ for Burewala
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923144646648"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full shadow-2xl flex items-center justify-center animate-bounce-slow hover:scale-110 transition-transform group"
      >
        <span className="text-2xl">💬</span>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat with us on WhatsApp
        </div>
      </a>
    </footer>
  );
};

export default Footer;