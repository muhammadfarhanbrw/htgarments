'use client';

import { useState } from 'react';
import service1 from '../../public/img/service.webp';
import Image from 'next/image';
import ceo from '../../public/img/ceo.png';
import bm from '../../public/img/bm.png';
import accountant from '../../public/img/accountant.png';
import seniormanager from '../../public/img/senoir catagory.png';
import salesman1 from '../../public/img/salesman1.png';
import salesman2 from '../../public/img/salesman2.png';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  // Team members array
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      designation: 'CEO & Founder',
      image: ceo,
      description: 'Visionary leader with 15+ years in fashion retail industry.',
      experience: '15 Years'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      designation: 'Branch Manager',
      image: bm,
      description: 'Expert in operations management and customer relationship.',
      experience: '10 Years'
    },
    {
      id: 3,
      name: 'Michael Chen',
      designation: 'Senior Accountant',
      image: accountant,
      description: 'Financial expert ensuring smooth business operations.',
      experience: '12 Years'
    },
    {
      id: 4,
      name: 'Robert Davis',
      designation: 'Senior Manager',
      image: seniormanager,
      description: 'Oversees daily store operations and team coordination.',
      experience: '8 Years'
    },
    {
      id: 5,
      name: 'David Wilson',
      designation: 'Sales Executive',
      image: salesman1,
      description: 'Expert in customer service and product recommendations.',
      experience: '5 Years'
    },
    {
      id: 6,
      name: 'James Miller',
      designation: 'Sales Associate',
      image: salesman2,
      description: 'Dedicated to providing exceptional shopping experiences.',
      experience: '3 Years'
    }
  ];

  // All services
  const allServices = [
    {
      id: 1,
      title: 'Free Fitting Service',
      description: 'Free fitting for all types of clothing. Our experts will help you select the best fitting outfit.',
      category: 'instore',
      icon: '👕',
      price: 'Free',
      duration: '20 minutes',
      features: ['All Clothing', 'Expert Consultant', 'Quick Service'],
      popular: true
    },
    {
      id: 2,
      title: 'Home Delivery',
      description: 'Free home delivery across Burewala. Complete free delivery on orders above 5000.',
      category: 'delivery',
      icon: '🚚',
      price: 'Free / ₹50',
      duration: '24 hours',
      features: ['Quick Delivery', 'Safe Packaging', 'Tracking'],
      popular: true
    },
    {
      id: 3,
      title: 'Easy Exchange',
      description: 'Easy exchange within 7 days of purchase. Complete outfit with bill and tags.',
      category: 'exchange',
      icon: '🔄',
      price: 'Free',
      duration: '10 minutes',
      features: ['7 Day Policy', 'Easy Process', 'Quick Change'],
      popular: true
    },
    {
      id: 4,
      title: 'Stitching and Repair',
      description: 'Clothing stitching, repair and alteration service. Professional work by expert tailor.',
      category: 'tailoring',
      icon: '🧵',
      price: 'Starting from ₹100',
      duration: '2-3 days',
      features: ['Expert Tailor', 'Quality Work', 'Fast'],
      popular: false
    },
    {
      id: 5,
      title: 'Gift Wrapping',
      description: 'Free beautiful gift wrapping service for gifts. Various designs and colors available.',
      category: 'gift',
      icon: '🎁',
      price: 'Free',
      duration: '15 minutes',
      features: ['Free Service', 'Multiple Designs', 'Beautiful Packaging'],
      popular: false
    },
    {
      id: 6,
      title: 'Phone Order',
      description: 'Place order on phone and receive products at home. Our team is ready to assist you.',
      category: 'phone',
      icon: '📱',
      price: 'Free',
      duration: '10 minutes',
      features: ['Easy Order', 'Guidance', 'Quick Confirmation'],
      popular: true
    },
    {
      id: 7,
      title: 'Special Appointment',
      description: 'Private shopping experience at specific time. Shop in peaceful environment.',
      category: 'appointment',
      icon: '📅',
      price: 'Free',
      duration: '1 hour',
      features: ['Private Shopping', 'Expert Guide', 'Special Attention'],
      popular: false
    },
    {
      id: 8,
      title: 'Installment Payment',
      description: 'Installment payment facility to easily buy expensive products.',
      category: 'payment',
      icon: '💳',
      price: '0% Interest',
      duration: '3-12 months',
      features: ['0% Interest', 'Easy Terms', 'Quick Approval'],
      popular: true
    },
    {
      id: 9,
      title: 'Return Facility',
      description: 'Return facility within 3 days if you are not satisfied (under terms and conditions).',
      category: 'return',
      icon: '↩️',
      price: 'Free',
      duration: '24 hours',
      features: ['3 Day Policy', 'Full Refund', 'Easy Process'],
      popular: false
    },
    {
      id: 10,
      title: '24/7 Customer Support',
      description: '24-hour customer support for any problem or question. We are at your service all the time.',
      category: 'support',
      icon: '📞',
      price: 'Free',
      duration: 'Immediate',
      features: ['24/7 Available', 'WhatsApp Support', 'Quick Solution'],
      popular: true
    },
    {
      id: 11,
      title: 'Personal Shopping Assistant',
      description: 'Personal shopping assistant for you who will help you in best selection.',
      category: 'personal',
      icon: '👨‍💼',
      price: 'Free',
      duration: 'Full Duration',
      features: ['Personal Attention', 'Expert Advice', 'Time Saving'],
      popular: false
    },
    {
      id: 12,
      title: 'Loyalty Program',
      description: 'Special loyalty program for our regular customers. Earn points on every purchase.',
      category: 'loyalty',
      icon: '⭐',
      price: 'Free Registration',
      duration: 'Permanent',
      features: ['Points on Purchase', 'Special Discounts', 'Exclusive Offers'],
      popular: true
    }
  ];

  // Service categories
  const categories = [
    { id: 'all', name: 'All Services', count: allServices.length },
    { id: 'instore', name: 'Store Services', count: allServices.filter(s => s.category === 'instore').length },
    { id: 'delivery', name: 'Delivery Services', count: allServices.filter(s => s.category === 'delivery').length },
    { id: 'exchange', name: 'Exchange/Return', count: allServices.filter(s => s.category === 'exchange' || s.category === 'return').length },
    { id: 'tailoring', name: 'Stitching Services', count: allServices.filter(s => s.category === 'tailoring').length },
    { id: 'payment', name: 'Payment Methods', count: allServices.filter(s => s.category === 'payment').length },
    { id: 'support', name: 'Customer Support', count: allServices.filter(s => s.category === 'support' || s.category === 'phone' || s.category === 'personal').length },
  ];

  // Filtered services
  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your inquiry has been submitted. We will contact you soon.');
    setInquiryForm({ name: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-3">
      {/* Header with Image - Fixed to max-w-7xl */}
      <div className="relative w-full overflow-hidden text-white">
        {/* Background image with max-w-7xl container */}
        <div className="relative h-[400px] md:h-[500px] w-full max-w-7xl mx-auto">
          <div className="absolute inset-0">
            <Image
              src={service1}
              alt="HT-Garments Services"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>

          {/* Decorative icons */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-10 top-10 text-6xl">🛠️</div>
            <div className="absolute right-10 top-20 text-5xl">🚚</div>
            <div className="absolute bottom-10 left-20 text-4xl">📦</div>
            <div className="absolute bottom-20 right-20 text-6xl">💝</div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl drop-shadow-lg">
                  Our Premium Services
                </h1>
                
                <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl drop-shadow-md">
                  Not just shopping, a complete experience! HT-Garments provides you the best services.
                </p>
                
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <span className="rounded-full bg-white/20 px-5 py-2 text-sm shadow-lg backdrop-blur-sm">
                    <span className="mr-2">✅</span> 100% Satisfaction Guarantee
                  </span>
                  <span className="rounded-full bg-white/20 px-5 py-2 text-sm shadow-lg backdrop-blur-sm">
                    <span className="mr-2">🕒</span> 24/7 Available
                  </span>
                  <span className="rounded-full bg-white/20 px-5 py-2 text-sm shadow-lg backdrop-blur-sm">
                    <span className="mr-2">💰</span> Best Price
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Same max-width as CompactSlider */}
      <main className="w-full max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Your Happiness is Our Priority
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We don't just sell clothes, we provide a complete shopping experience.
            Our services are designed to make your life easier.
          </p>
        </section>

        {/* Service Categories */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Service Categories
            </h2>
            <p className="mt-2 text-gray-600">Select services according to your need</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center rounded-full px-5 py-3 font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                }`}
              >
                <span>{category.name}</span>
                <span className={`ml-2 rounded-full px-2 py-1 text-xs ${
                  activeCategory === category.id ? 'bg-white/30' : 'bg-blue-100 text-blue-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Services List */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`group relative rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 ${
                  service.popular ? 'border-2 border-blue-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                    <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-bold text-white">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 p-4 text-blue-600 group-hover:scale-110 transition-transform text-2xl">
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <div className="mb-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-500">{service.duration}</div>
                  </div>
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-gray-800">{service.title}</h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-bold text-gray-700">Includes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800">
                    Use Service
                  </button>
                  <button className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Meet Our Expert Team
            </h2>
            <p className="mt-2 text-gray-600">Professional team dedicated to serve you</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center">
                  {/* Image Container */}
                  <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full border-4 border-blue-100 group-hover:border-blue-300 transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 192px) 100vw, 192px"
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="mb-1 text-xl font-bold text-gray-800">{member.name}</h3>
                    <div className="mb-3">
                      <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 text-xs font-bold text-white">
                        {member.designation}
                      </span>
                    </div>
                    <p className="mb-3 text-gray-600">{member.description}</p>
                    <div className="flex items-center justify-center">
                      <span className="mr-2 text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">{member.experience} Experience</span>
                    </div>
                  </div>
                  
                  {/* Social/Contact Icons */}
                  <div className="mt-4 flex space-x-3">
                    <button className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors">
                      <span className="text-lg">📧</span>
                    </button>
                    <button className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors">
                      <span className="text-lg">💬</span>
                    </button>
                    <button className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors">
                      <span className="text-lg">📞</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits of Our Services */}
        <section className="mb-16 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-white">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Benefits of Our Services
            </h2>
            <p className="mt-2 text-blue-200">
              Why are we different?
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Fast</h3>
              <p className="text-blue-200">Fastest service, time commitment</p>
            </div>
            
            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Affordable</h3>
              <p className="text-blue-200">Best price, no extra charges</p>
            </div>
            
            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Expert</h3>
              <p className="text-blue-200">Experienced staff, professional service</p>
            </div>
            
            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Responsible</h3>
              <p className="text-blue-200">Complete responsibility, problem solution</p>
            </div>
          </div>
        </section>

        {/* Service Inquiry Form */}
        <section className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Service Inquiry
              </h2>
              <p className="mb-6 text-gray-600">
                Apply for any service. Our team will contact you within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Select Service
                  </label>
                  <select
                    required
                    value={inquiryForm.service}
                    onChange={(e) => setInquiryForm({...inquiryForm, service: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select Service</option>
                    {allServices.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Additional Information
                  </label>
                  <textarea
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Tell us more about your requirement..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">Immediate Contact</h3>
                <p className="mb-6">
                  Contact us directly for any urgent issue.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-white/20 p-3">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <p className="text-sm">Phone Number</p>
                      <p className="text-xl font-bold">0300-1234567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-white/20 p-3">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <p className="text-sm">WhatsApp</p>
                      <p className="text-xl font-bold">0312-7654321</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-white/20 p-3">
                      <span className="text-xl">🕒</span>
                    </div>
                    <div>
                      <p className="text-sm">Working Hours</p>
                      <p className="text-xl font-bold">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  Service Steps
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Submit Request</h4>
                      <p className="text-gray-600">Submit request on form</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Confirmation</h4>
                      <p className="text-gray-600">Our team will contact you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Receive Service</h4>
                      <p className="text-gray-600">Enjoy our service</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Give Feedback</h4>
                      <p className="text-gray-600">Share your experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}