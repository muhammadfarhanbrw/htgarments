'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Create a separate component for the content that uses useSearchParams
function UploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get reference code from URL if exists
  const refCodeFromURL = searchParams.get('code');
  const totalFromURL = searchParams.get('total');
  
  const [formData, setFormData] = useState({
    refCode: refCodeFromURL || '',
    phone: '',
    transactionId: '',
    paymentMethod: 'jazzcash',
    screenshot: null
  });
  
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, screenshot: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.refCode.trim()) {
      setMessage('❌ Please enter your reference code');
      return;
    }
    
    if (!formData.phone.trim()) {
      setMessage('❌ Please enter your phone number');
      return;
    }
    
    if (!formData.transactionId.trim()) {
      setMessage('❌ Please enter transaction ID');
      return;
    }
    
    if (!formData.screenshot) {
      setMessage('❌ Please upload payment screenshot');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      // 1. Upload screenshot
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.screenshot);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      const uploadData = await uploadRes.json();
      
      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Upload failed');
      }
      
      // 2. Save payment info (to localStorage for now)
      const paymentInfo = {
        refCode: formData.refCode.toUpperCase(),
        phone: formData.phone,
        transactionId: formData.transactionId,
        paymentMethod: formData.paymentMethod,
        screenshot: uploadData.url,
        total: totalFromURL || 'N/A',
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      // Save to localStorage
      const existingPayments = JSON.parse(localStorage.getItem('customerPayments') || '[]');
      existingPayments.push(paymentInfo);
      localStorage.setItem('customerPayments', JSON.stringify(existingPayments));
      
      // Also save individually for easy access
      localStorage.setItem(`payment_${formData.refCode}`, JSON.stringify(paymentInfo));
      
      setMessage('✅ Payment submitted successfully! Admin will verify within 24 hours.');
      
      // Clear form
      setFormData({
        refCode: '',
        phone: '',
        transactionId: '',
        paymentMethod: 'jazzcash',
        screenshot: null
      });
      setPreview('');
      
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Payment Verification
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload your payment screenshot after sending money via JazzCash/EasyPaisa
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Instructions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📋</span> How to Pay
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-lg w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Send Payment</p>
                    <p className="text-sm text-gray-600">
                      Send amount via JazzCash or EasyPaisa
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-lg w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Take Screenshot</p>
                    <p className="text-sm text-gray-600">
                      Capture payment confirmation screen
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-lg w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Fill Form</p>
                    <p className="text-sm text-gray-600">
                      Enter details and upload screenshot
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-lg w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Wait for Verification</p>
                    <p className="text-sm text-gray-600">
                      Admin will verify within 24 hours
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Payment Details */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">Payment Accounts:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">JazzCash:</span>
                    <span className="font-mono">0300-1234567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">EasyPaisa:</span>
                    <span className="font-mono">0312-7654321</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-2">
                    Include your reference code in payment notes
                  </div>
                </div>
              </div>
            </div>
            
            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <span className="mr-2">❓</span> Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                If you face any issues, contact us:
              </p>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/923001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 hover:text-green-700"
                >
                  <span className="mr-2">📱</span> WhatsApp: 0300-1234567
                </a>
                <a 
                  href="tel:03001234567"
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <span className="mr-2">📞</span> Call: 0300-1234567
                </a>
              </div>
            </div>
          </div>
          
          {/* Right: Upload Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Submit Payment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Reference Code */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reference Code *
                </label>
                <input
                  type="text"
                  value={formData.refCode}
                  onChange={(e) => setFormData({...formData, refCode: e.target.value})}
                  placeholder="Enter code from checkout"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {refCodeFromURL && (
                  <p className="text-sm text-green-600 mt-1">
                    Pre-filled from checkout
                  </p>
                )}
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Transaction ID *
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                  placeholder="From JazzCash/EasyPaisa app"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'jazzcash'})}
                    className={`p-3 border rounded-lg flex items-center justify-center ${
                      formData.paymentMethod === 'jazzcash' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300'
                    }`}
                  >
                    <span className="mr-2">📱</span> JazzCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'easypaisa'})}
                    className={`p-3 border rounded-lg flex items-center justify-center ${
                      formData.paymentMethod === 'easypaisa' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300'
                    }`}
                  >
                    <span className="mr-2">💳</span> EasyPaisa
                  </button>
                </div>
              </div>
              
              {/* Screenshot Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Screenshot *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="screenshot-upload"
                    required
                  />
                  <label htmlFor="screenshot-upload" className="cursor-pointer block">
                    {preview ? (
                      <div className="relative">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview('');
                            setFormData({...formData, screenshot: null});
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl mb-3">📸</div>
                        <p className="text-gray-600">Click to upload screenshot</p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Upload clear screenshot showing amount and transaction ID
                </p>
              </div>
              
              {/* Message */}
              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('✅') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </span>
                ) : 'Submit Payment'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your payment will be verified within 24 hours. You'll receive confirmation via WhatsApp/SMS.</p>
          <p className="mt-2">© {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function UploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment form...</p>
        </div>
      </div>
    }>
      <UploadContent />
    </Suspense>
  );
}