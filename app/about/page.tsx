'use client';

import { useState } from 'react';
import store2 from '../../public/img/store2.jpg';
import Image from 'next/image';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');

  // Shop information
  const shopInfo = {
    name: "HT-Garments",
    founded: "2010",
    location: "HT-Garments store nazad Al Rahaman store C-Block Burewala",
    tagline: "Best clothing for every age and season",
  };

  // Our services
  const services = [
    {
      title: 'Free Fitting',
      description: 'Free fitting service for all types of clothing',
      icon: '👚'
    },
    {
      title: 'Home Delivery',
      description: 'Free home delivery across Burewala',
      icon: '🚚'
    },
    {
      title: 'Exchange Policy',
      description: 'Easy exchange within 7 days',
      icon: '🔄'
    },
    {
      title: 'Stitching Service',
      description: 'Clothing repair and stitching facility',
      icon: '🧵'
    }
  ];

  // Our products
  const products = [
    { category: "Men's Clothing", items: ['Shirts', 'Pants', 'Suits', 'Jeans'] },
    { category: "Women's Clothing", items: ['Sarees', 'Shalwar Kameez', 'Embroidered', 'Skirts'] },
    { category: "Children's Clothing", items: ['Frocks', 'T-Shirts', 'Pants', 'Jackets'] },
    { category: "Special Occasions", items: ['Wedding Outfits', 'Eid Clothes', 'Ceremony Dresses'] },
  ];

  // Shop timings
  const timings = [
    { day: 'Monday to Thursday', time: '10 AM to 9 PM' },
    { day: 'Friday', time: '10 AM to Asr, 7 PM to 10 PM' },
    { day: 'Saturday - Sunday', time: '11 AM to 10 PM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header - EXACT SAME STRUCTURE AS COMPACTSLIDER */}
      <div className="relative mx-auto max-w-7xl h-[460px] overflow-hidden mt-3">
        {/* Background Image Container */}
        <div className="relative w-full h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={store2}
              alt="HT-Garments Store"
              fill
              className="w-full h-full object-cover"
              priority
              quality={100}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Overlay gradient for better text readability - EXACT SAME AS COMPACTSLIDER */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          </div>
          
          {/* Main Content - Centered - SIMILAR TO COMPACTSLIDER */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
            {/* Main Title - Elegant Styling */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-light text-white tracking-widest mb-4">
                HT-GARMENTS
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
            </div>
            
            {/* Beautiful Sentence */}
            <div className="max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-white/95 font-serif italic mb-6">
                "Best clothing for every age and season"
              </p>
              
              {/* Store-specific content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                  Welcome to Our Store
                </h2>
                <p className="text-lg md:text-xl text-white/90">
                  Serving you since {shopInfo.founded}
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements - SIMILAR TO COMPACTSLIDER */}
          <div className="absolute top-8 left-8 z-10">
            <div className="text-white/80 text-sm tracking-widest font-light">
              QUALITY CLOTHING
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 z-10">
            <div className="text-white/80 text-sm tracking-widest font-light">
              SINCE {shopInfo.founded}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Constrained to max-w-7xl */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex min-w-max justify-center gap-2 rounded-2xl bg-white p-2 shadow-lg">
            {[
              { id: 'about', label: 'About Store', icon: '🏪' },
              { id: 'products', label: 'Products', icon: '👕' },
              { id: 'services', label: 'Services', icon: '🛠️' },
              { id: 'timings', label: 'Timings', icon: '⏰' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center rounded-xl px-5 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2 text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* About Store Section */}
        <section className={`mb-12 transition-all ${activeTab === 'about' ? 'block' : 'hidden'}`}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 p-4">
                  <span className="text-4xl">🌟</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Journey</h2>
              </div>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-rose-600">{shopInfo.name}</strong> was founded in <strong>{shopInfo.founded}</strong>.
                  Our goal was to provide quality, modern and accessible clothing to people in <strong>{shopInfo.location}</strong> and surrounding areas.
                </p>
                <p>
                  Starting with just a small shop, we have built a reputable name today with the trust and love of our customers.
                  We have clothing for every age and every class.
                </p>
                <p>
                  In our store you will find clothing according to <strong>local designs</strong> as well as <strong>international fashion</strong>.
                  Our goal is that every customer leaves satisfied from our store.
                </p>
              </div>
              
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800">Our Identity</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="mr-3 text-rose-500">✓</span>
                    <span>100% Original Fabric</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-rose-500">✓</span>
                    <span>Fair Prices</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-rose-500">✓</span>
                    <span>Latest Fashion</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-rose-500">✓</span>
                    <span>Friendly Environment</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-rose-200 to-pink-200">
                  <span className="text-9xl">🏬</span>
                </div>
                <div className="bg-white p-6">
                  <h3 className="mb-3 text-2xl font-bold text-gray-800">Our Store</h3>
                  <p className="text-gray-600">
                    Our store spans 3000 square feet where you can browse comfortably.
                    We have separate cash counters, fitting rooms and waiting area.
                  </p>
                </div>
              </div>
              
              <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-pink-600 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">Our Promise</h3>
                <p className="mb-6">
                  We promise to give you the best products, friendly service and competitive prices.
                  Your satisfaction is our success.
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-5xl">🤝</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={`mb-12 transition-all ${activeTab === 'products' ? 'block' : 'hidden'}`}>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">Our Products</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              We have a wide range for every age, every season and every occasion
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((category, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-100 text-3xl transition-transform group-hover:scale-110">
                  {index === 0 ? '👨' : index === 1 ? '👩' : index === 2 ? '👶' : '🎉'}
                </div>
                
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  {category.category}
                </h3>
                
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600">
                      <span className="mr-2 text-rose-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 rounded-lg bg-rose-50 p-3 text-center">
                  <p className="text-sm font-medium text-rose-600">
                    50+ styles available in this category
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-6 md:mb-0">
                <h3 className="mb-2 text-2xl font-bold">New Collection!</h3>
                <p>Our new summer collection has arrived. Visit us today.</p>
              </div>
              <div className="flex gap-4">
                <button className="rounded-full bg-white px-6 py-3 font-medium text-rose-600 shadow-lg transition-all hover:shadow-xl">
                  <span className="mr-2">👀</span> View Collection
                </button>
                <button className="rounded-full border-2 border-white bg-transparent px-6 py-3 font-medium transition-all hover:bg-white/20">
                  <span className="mr-2">📍</span> Location
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={`mb-12 transition-all ${activeTab === 'services' ? 'block' : 'hidden'}`}>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">Our Special Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Not just products, but a complete shopping experience
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex items-start rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
              >
                <div className="mr-4 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 p-4 transition-transform group-hover:scale-110">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-rose-50 px-4 py-1 text-sm font-medium text-rose-600">
                    <span className="mr-2">🎯</span> Free Service
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">Custom Order Preparation</h3>
              <p className="mb-6">
                If you don't find your desired size or color in our store, we can get it specially prepared for you.
              </p>
              <div className="flex items-center">
                <span className="mr-4 text-4xl">✂️</span>
                <span className="font-medium">Preparation in 7-10 days</span>
              </div>
            </div>
            
            <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">Seasonal Offers</h3>
              <p className="mb-6">
                Special discounts and offers in every season. Check our seasonal offers now.
              </p>
              <button className="rounded-full bg-white px-6 py-3 font-medium text-amber-600 shadow-lg">
                <span className="mr-2">🔥</span> View Current Offers
              </button>
            </div>
          </div>
        </section>

        {/* Timings Section */}
        <section className={`mb-12 transition-all ${activeTab === 'timings' ? 'block' : 'hidden'}`}>
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-4xl font-bold text-gray-800">Our Timings</h2>
              <p className="text-gray-600">We work long hours for your convenience</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {timings.map((timing, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-rose-100 bg-gradient-to-br from-rose-50 to-white p-6 text-center"
                >
                  <div className="mb-4 inline-flex rounded-full bg-white p-3 shadow-sm">
                    <span className="text-2xl">
                      {index === 0 ? '📅' : index === 1 ? '🕌' : '🎉'}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">{timing.day}</h3>
                  <p className="text-lg font-medium text-rose-600">{timing.time}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 p-6 text-center text-white">
              <h3 className="mb-2 text-2xl font-bold">Special Occasion?</h3>
              <p className="mb-4">
                If you need to come to the store at a specific time, contact us in advance.
              </p>
              <button className="rounded-full bg-white px-6 py-3 font-medium text-rose-600 shadow-lg transition-all hover:shadow-xl">
                <span className="mr-2">📞</span> Book Appointment
              </button>
            </div>
          </div>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">Our Address</h3>
              <p className="mb-4 text-gray-600">
                HT-Garments store nazad Al Rahaman store c-Block, Burewala
              </p>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <span className="mr-3">📱</span>
                  <span>03146466648, 03136956888</span>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-3">📧</span>
                  <span>htgarments1@email.com</span>
                </p>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">Parking Facility</h3>
              <p className="mb-4 text-gray-600">
                Free parking facility available in front of the store.
              </p>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="flex items-center text-green-700">
                  <span className="mr-3">🅿️</span>
                  <span className="font-medium">Free parking for 5 cars</span>
                </p>
              </div>
            </div>
          </div>
        </section>

       
      </main>

   

      {/* Global CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #db2777);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}