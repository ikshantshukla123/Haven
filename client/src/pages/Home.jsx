import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const photos = [
  "one.jpeg",
  "two.jpeg",
  "three.jpeg",
  "four.jpeg",
  "five.jpeg",
  "six.jpeg",
  "seven.jpeg",
  "eight.jpeg",
  "nine.jpeg",
  "ten.jpeg",
  "eleven.jpeg",
  "twelve.jpeg",
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3); // Cycle through first 3 images
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const heroImages = ["/photos/six.jpeg", "/photos/one.jpeg", "/photos/two.jpeg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="pointer-events-none fixed w-80 h-80 rounded-full bg-pink-400/20 blur-3xl"
        style={{ x, y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="pointer-events-none fixed w-96 h-96 rounded-full bg-rose-300/15 blur-3xl -bottom-48 -left-48"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt="Hero"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-[1px]"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              🎀 Premium Gift Hampers
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
              Hamper
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-100 to-pink-200 bg-clip-text text-transparent">
              Heaven
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-xl md:text-2xl text-rose-100 mb-8 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Where every gift tells a story of elegance, love, and unforgettable moments
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(219, 39, 119, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🎁 Explore Collection
              </motion.button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Learn More
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent"></div>
        
        <div className="max-w-8xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.span 
              variants={fadeUp}
              className="text-pink-500 font-semibold text-lg mb-4 block"
            >
              Our Masterpieces
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
            >
              Visual <span className="text-transparent bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text">Elegance</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our carefully crafted hampers, each designed to create lasting memories and bring joy to your special moments
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-rose-50 shadow-xl hover:shadow-2xl border border-white/50 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={`/photos/${photo}`}
                    alt={`Luxury Hamper ${index + 1}`}
                    loading="lazy"
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                 
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-bold text-lg mb-1">Luxury Collection</p>
                        <p className="text-rose-200 text-sm">Starting from ₹50</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <span className="text-lg">→</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
            >
              Why Choose <span className="text-transparent bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text">Us?</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: "🎁", 
                title: "Premium Quality", 
                desc: "Hand-curated with the finest products, ensuring excellence in every detail",
                features: ["Premium Materials", "Handcrafted", "Quality Assured"]
              },
              { 
                icon: "💝", 
                title: "Elegant Packaging", 
                desc: "Stunning presentation that turns every gift into an unforgettable experience",
                features: ["Luxury Wrapping", "Custom Designs", "Eco-friendly"]
              },
              { 
                icon: "🚚", 
                title: "Seamless Delivery", 
                desc: "Reliable nationwide delivery with care and attention to every package",
                features: ["Fast Shipping", "Safe Delivery", "Tracking Available"]
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-rose-100 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-1"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 h-full transform group-hover:-rotate-1 transition-transform duration-500">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-500"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb25c5d1c9c1?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <motion.span 
            variants={fadeUp}
            className="text-pink-200 font-semibold text-lg mb-4 block"
          >
            Ready to Create Magic?
          </motion.span>
          
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Spread <span className="text-transparent bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text">Joy</span> & <span className="text-transparent bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text">Happiness</span>
          </motion.h2>
          
          <motion.p
            variants={fadeUp}
            className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your special moments into unforgettable memories with our exclusive collection of premium hampers
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#fdf2f8",
                  color: "#db2777"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-12 py-4 bg-white text-rose-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🛍️ Start Shopping
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80"
          >
            {[
              { number: "100+", label: "Happy Customers" },
              { number: "200+", label: "Unique Designs" },
              { number: "24/7", label: "Support" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.p 
                  className="text-3xl font-black text-white mb-2"
                  whileInView={{ scale: [0.5, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;