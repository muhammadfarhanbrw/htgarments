"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/img/logo.png";

// Define the types for Clerk components
interface ClerkComponents {
  SignInButton: React.ComponentType<any>;
  SignUpButton: React.ComponentType<any>;
  SignedIn: React.ComponentType<any>;
  SignedOut: React.ComponentType<any>;
  UserButton: React.ComponentType<any>;
}

// Create a wrapper component for Clerk buttons
function ClerkAuthButtons({ isMobile, setOpen }: { isMobile: boolean; setOpen?: (open: boolean) => void }) {
  const [ClerkComponents, setClerkComponents] = useState<ClerkComponents | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only load Clerk on client side and when publishable key exists
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      const loadClerk = async () => {
        try {
          const clerk = await import("@clerk/nextjs");
          setClerkComponents({
            SignInButton: clerk.SignInButton,
            SignUpButton: clerk.SignUpButton,
            SignedIn: clerk.SignedIn,
            SignedOut: clerk.SignedOut,
            UserButton: clerk.UserButton,
          });
        } catch (error) {
          console.error("Failed to load Clerk components:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadClerk();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className={`flex ${isMobile ? 'flex-col space-y-3 pt-4' : 'items-center space-x-4'}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-20 h-10"></div>
        <div className="animate-pulse bg-gray-200 rounded-full w-24 h-10"></div>
      </div>
    );
  }

  // If Clerk components loaded successfully
  if (ClerkComponents) {
    const { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } = ClerkComponents;
    
    if (isMobile) {
      return (
        <>
          <SignedOut>
            <div className="flex flex-col space-y-3 pt-4">
              <SignInButton mode="modal">
                <button 
                  onClick={() => setOpen?.(false)}
                  className="text-gray-700 hover:text-indigo-600 text-left"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button 
                  onClick={() => setOpen?.(false)}
                  className="bg-[#6c47ff] text-white py-2 rounded-xl"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="pt-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-gray-700 hover:text-indigo-600 transition cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    );
  }

  // Fallback when Clerk is not available
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 pt-4">
        <Link
          onClick={() => setOpen?.(false)}
          href="/sign-in"
          className="text-gray-700 hover:text-indigo-600"
        >
          Sign In
        </Link>
        <Link
          onClick={() => setOpen?.(false)}
          href="/sign-up"
          className="bg-[#6c47ff] text-white py-2 rounded-xl text-center"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/sign-in"
        className="text-gray-700 hover:text-indigo-600 transition"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={logo} 
              alt="Brand Logo" 
              width={160}
              height={60}
              className="h-12 w-auto"
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-indigo-600 transition">Services</Link>
            <Link href="/shop" className="text-gray-700 hover:text-indigo-600 transition">Shop</Link>
            <Link href="/admin" className="text-gray-700 hover:text-indigo-600 transition">Admin</Link>
            
            <Suspense fallback={
              <div className="flex items-center space-x-4">
                <div className="animate-pulse bg-gray-200 rounded-lg w-20 h-10"></div>
                <div className="animate-pulse bg-gray-200 rounded-full w-24 h-10"></div>
              </div>
            }>
              <ClerkAuthButtons isMobile={false} />
            </Suspense>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-6 py-6">
            <Link onClick={() => setOpen(false)} href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link onClick={() => setOpen(false)} href="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link onClick={() => setOpen(false)} href="/services" className="text-gray-700 hover:text-indigo-600">Services</Link>
            <Link onClick={() => setOpen(false)} href="/shop" className="text-gray-700 hover:text-indigo-600">Shop</Link>
            <Link onClick={() => setOpen(false)} href="/admin" className="text-gray-700 hover:text-indigo-600">Admin</Link>
            
            <Suspense fallback={
              <div className="flex flex-col space-y-3 pt-4">
                <div className="animate-pulse bg-gray-200 rounded-lg w-20 h-10"></div>
                <div className="animate-pulse bg-gray-200 rounded-lg w-20 h-10"></div>
              </div>
            }>
              <ClerkAuthButtons isMobile={true} setOpen={setOpen} />
            </Suspense>
          </div>
        </div>
      )}
    </nav>
  );
}