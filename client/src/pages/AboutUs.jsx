import React, { useState } from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 stylish-font">
            About <span className="text-yellow-200">Hamper Heaven</span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
            Creating moments of joy through carefully curated gift hampers that speak from the heart
          </p>
          <div className="w-24 h-1 bg-yellow-200 mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Our Story Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">📖</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Hamper Heaven, we believe that every gift tells a story. Founded with a passion for 
                spreading joy and celebrating life's special moments, we specialize in creating thoughtfully 
                curated hampers that bring smiles to your loved ones.
              </p>
              <p>
                From birthdays and anniversaries to festivals and corporate events, our hampers are more than 
                just gifts – they're an experience of love, care, and togetherness. Each hamper is handpicked 
                with high-quality products, beautifully designed packaging, and a personal touch that makes 
                every moment unforgettable.
              </p>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Hamper Heaven, we don't just sell hampers – we create memories. Because a perfect gift 
              isn't about the price tag, it's about the thought, care, and happiness it brings.
            </p>
            
            <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
              <h3 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                What Makes Us Special:
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Hand-curated products from trusted artisans
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Beautiful presentation that makes unwrapping a joy
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Customizable options for personal touches
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Sustainable and eco-friendly packaging
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Exceptional customer service and support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative text-center mb-12">
            <h2 className="text-4xl font-black mb-4 stylish-font">
              Why Choose <span className="text-yellow-200">Hamper Heaven?</span>
            </h2>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto">
              We go above and beyond to make every gift-giving experience special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                icon: "🎁",
                title: "Quality Products",
                description: "Every item is carefully selected for its quality and presentation excellence"
              },
              {
                icon: "💝",
                title: "Beautiful Packaging",
                description: "Our hampers are beautifully packaged to create an unforgettable unboxing experience"
              },
              {
                icon: "🚚",
                title: "Reliable Delivery",
                description: "We ensure your hampers reach their destination on time and in perfect condition"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-pink-100 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-pink-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 stylish-font">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Hamper Heaven
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality",
                description: "We never compromise on the quality of our products and services",
                color: "from-pink-500 to-rose-500"
              },
              {
                title: "Care",
                description: "Every hamper is assembled with love and attention to detail",
                color: "from-rose-500 to-pink-500"
              },
              {
                title: "Innovation",
                description: "We continuously explore new ways to delight our customers",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Sustainability",
                description: "We're committed to environmentally responsible practices",
                color: "from-green-500 to-emerald-500"
              }
            ].map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl`}>
                  <span className="text-white text-xl font-bold">{value.title.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-8 md:p-12 border border-rose-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 stylish-font">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">
              The passionate individuals behind Hamper Heaven's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Abhijay Maurya",
                image: "/abhijay.jpeg",
                instagram: "https://www.instagram.com/abhijay_maurya12?igsh=MWJkeXVzOHNuenhxaw%3D%3D"
              },
              {
                name: "Pratyush Rohilla",
                image: "/pratyush.jpeg", 
                instagram: "https://www.instagram.com/pratyush__rohilla?igsh=MWhrdDRzNGNtNmZtZQ%3D%3D"
              },
              {
                name: "Kavita Goswami",
                image: "/kavita.jpeg",
                instagram: "https://www.instagram.com/kavitaa_19?igsh=am9yZ21rem53ZWhv"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 group border border-pink-100">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-4 border-pink-200 group-hover:border-pink-300 transition-colors duration-300 shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl border-2 border-pink-300/30 group-hover:border-pink-400/50 transition-colors duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
                  </svg>
                  <span>Follow</span>
                </a>
              </div>
            ))}
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
        className="fixed z-50 bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-3xl transition-all duration-300 border-4 border-white/20 backdrop-blur-sm"
        title="View Portfolio"
        aria-label="View Portfolio"
      >
        <div className="text-center">
          <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0v2m0 4h.01"/>
          </svg>
          <span className="text-xs font-bold">Portfolio</span>
        </div>
      </button>
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in border border-pink-100">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-2xl font-bold transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 stylish-font">My Portfolio</h2>
              <p className="text-gray-600 mb-6">Check out my amazing work and projects</p>
              <a
                href="https://my-portfolio-347j.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
              >
                Visit Portfolio
              </a>
            </div>
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