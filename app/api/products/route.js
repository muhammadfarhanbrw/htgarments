// app/api/products/route.js - UPDATED VERSION
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

let Product;
let isDbConnected = false;

async function connectToDatabase() {
  if (!isDbConnected && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      Product = (await import('../../models/Product')).default;
      isDbConnected = true;
      console.log("✅ MongoDB Connected in products route");
    } catch (error) {
      console.error("❌ MongoDB Connection Error in products route:", error);
    }
  }
  return Product;
}

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  try {
    console.log("🔄 GET: Fetching products...");
    
    // During build, return mock data
    if (!process.env.MONGODB_URI) {
      console.log("📦 Build phase: Returning mock products");
      return NextResponse.json([
        { id: '1', name: 'Sample Product 1', price: 99.99, category: 'sample' },
        { id: '2', name: 'Sample Product 2', price: 149.99, category: 'sample' }
      ], { status: 200 });
    }
    
    const ProductModel = await connectToDatabase();
    
    if (!ProductModel) {
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }

    const products = await ProductModel.find({});
    console.log(`📊 GET: Found ${products.length} products`);
    
    const productsData = products.map(product => ({
      id: product._id.toString(),
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      category: product.category || '',
      imageUrl: product.imageUrl || '',
    }));

    return NextResponse.json(productsData, { status: 200 });
    
  } catch (error) {
    console.error("❌ GET Error fetching products:", error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request) {
  try {
    console.log("📝 POST: Creating product...");
    
    // During build, return mock response
    if (!process.env.MONGODB_URI) {
      console.log("📦 Build phase: Mock product creation");
      return NextResponse.json(
        { 
          message: 'Product would be created in production', 
          product: { id: 'mock-id', name: 'Mock Product', price: 99.99 } 
        },
        { status: 201 }
      );
    }
    
    const ProductModel = await connectToDatabase();
    
    if (!ProductModel) {
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }

    const data = await request.json();
    const newProduct = new ProductModel(data);
    await newProduct.save();

    return NextResponse.json(
      { 
        message: 'Product created successfully', 
        product: {
          id: newProduct._id.toString(),
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          imageUrl: newProduct.imageUrl
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST Error creating product:", error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}