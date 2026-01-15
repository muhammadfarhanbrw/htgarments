import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    console.log("🔄 Upload API: Processing file upload...");
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const fileName = `payment-${timestamp}-${random}-${originalName}`;
    
    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log(`📁 Upload directory created: ${uploadDir}`);
    } catch (err) {
      console.error("❌ Error creating upload directory:", err);
    }
    
    // Save file to public/uploads
    const filePath = path.join(uploadDir, fileName);
    
    try {
      await writeFile(filePath, buffer);
      console.log(`✅ File saved: ${filePath}`);
    } catch (err: any) {
      console.error("❌ Error saving file:", err);
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      );
    }
    
    // Return the relative URL
    const imageUrl = `/uploads/${fileName}`;
    
    console.log("✅ Upload API: File uploaded successfully", {
      fileName,
      imageUrl,
      size: file.size,
      type: file.type,
    });
    
    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: 'File uploaded successfully',
      fileName: fileName,
      size: file.size,
    });
    
  } catch (error: any) {
    console.error("❌ Upload API Error:", error);
    return NextResponse.json(
      { error: 'Failed to upload file: ' + error.message },
      { status: 500 }
    );
  }
}