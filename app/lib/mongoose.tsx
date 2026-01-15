// app/lib/mongoose.tsx - ULTRA SIMPLE VERSION
import mongoose from 'mongoose';

const connectionToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  // ALWAYS return mongoose during build - no exceptions
  if (!MONGODB_URI) {
    // Return mongoose instance without connecting
    return mongoose;
  }
  
  // If already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  
  // Try to connect (only in production with valid URI)
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');
    return mongoose;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    // Still return mongoose to prevent crashes
    return mongoose;
  }
};

export default connectionToDatabase;