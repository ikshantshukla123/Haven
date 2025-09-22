import React, { useState } from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-pink-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black stylish-font mb-6">About Hamper Heaven</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating moments of joy through carefully curated gift hampers that speak from the heart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-black mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded with a passion for bringing people together, Hamper Heaven was born from the idea that 
              every special moment deserves to be celebrated with something unique and meaningful.
            </p>
            <p className="text-gray-600 mb-4">
             At Hamper Heaven, we believe that every gift tells a story. Founded with a passion for spreading joy and celebrating life’s special moments, we specialize in creating thoughtfully curated hampers that bring smiles to your loved ones.

From birthdays and anniversaries to festivals and corporate events, our hampers are more than just gifts – they’re an experience of love, care, and togetherness. Each hamper is handpicked with high-quality products, beautifully designed packaging, and a personal touch that makes every moment unforgettable.
            </p>
           
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
             At Hamper Heaven, we don’t just sell hampers – we create memories. Because a perfect gift isn’t about the price tag, it’s about the thought, care, and happiness it brings.
            </p>
            
            <h3 className="text-lg font-semibold text-black mb-2 mt-6">What Makes Us Special:</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Hand-curated products from trusted artisans</li>
              <li>• Beautiful presentation that makes unwrapping a joy</li>
              <li>• Customizable options for personal touches</li>
              <li>• Sustainable and eco-friendly packaging</li>
              <li>• Exceptional customer service and support</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black stylish-font mb-4">Why Choose Hamper Heaven?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-semibold text-black mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">
                  Every item is carefully selected for its quality and presentation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-semibold text-black mb-2">Beautiful Packaging</h3>
                <p className="text-gray-600 text-sm">
                  Our hampers are beautifully packaged to create an unforgettable unboxing experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-black mb-2">Reliable Delivery</h3>
                <p className="text-gray-600 text-sm">
                  We ensure your hampers reach their destination on time and in perfect condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-black mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We never compromise on the quality of our products and services.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Care</h3>
              <p className="text-gray-600 text-sm">
                Every hamper is assembled with love and attention to detail.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We continuously explore new ways to delight our customers.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                We're committed to environmentally responsible practices.
              </p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-black stylish-font mb-8 text-center">Our Team</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
         
         <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-72">
  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-200 mb-4 shadow">
    <img
      src="/abhijay.jpeg"
      alt="Abhijay Maurya"
      className="w-full h-full object-cover object-top" 
    />
  </div>
  <h3 className="text-xl font-bold text-black mb-1">Abhijay Maurya</h3>
  <a
    href="https://www.instagram.com/abhijay_maurya12?igsh=MWJkeXVzOHNuenhxaw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-pink-600 hover:text-blue-800 font-medium mt-1"
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
    </svg>
    Instagram
  </a>
</div>
         
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-72">
            <img src="/pratyush.jpeg" alt="Pratyush Rohilla" className="w-28 h-28 rounded-full object-cover border-4 border-pink-200 mb-4 shadow" />
            <h3 className="text-xl font-bold text-black mb-1">Pratyush Rohilla</h3>
            <a href="https://www.instagram.com/pratyush__rohilla?igsh=MWhrdDRzNGNtNmZtZQ%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:text-blue-800 font-medium mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
              Instagram
            </a>
          </div>
          
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-72">
            <img src="/kavita.jpeg" alt="Kavita Goswami" className="w-28 h-28 rounded-full object-cover border-4 border-pink-200 mb-4 shadow" />
            <h3 className="text-xl font-bold text-black mb-1">Kavita Goswami</h3>
            <a href="https://www.instagram.com/kavitaa_19?igsh=am9yZ21rem53ZWhv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:text-blue-800 font-medium mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


// Floating Portfolio Button
const PortfolioPopup = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-white/60"
        title="View Portfolio"
        aria-label="View Portfolio"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0v2m0 4h.01"/></svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-pink-600 mb-4 text-center stylish-font">My Portfolio</h2>
            <a
              href="https://my-portfolio-347j.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-pink-500 text-white text-center px-6 py-3 rounded-lg font-semibold shadow hover:bg-pink-700 transition-colors duration-200"
            >
              Visit 
            </a>
          </div>
        </div>
      )}
    </>
  );
};

const AboutUsWithPortfolio = () => (
  <>
    <AboutUs />
    <PortfolioPopup />
  </>
);

export default AboutUsWithPortfolio;