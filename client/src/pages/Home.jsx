import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-rose-200 relative overflow-hidden">
     
      <motion.div
        className="pointer-events-none fixed w-64 h-64 rounded-full bg-pink-400/30 blur-3xl"
        style={{ x, y }}
      />

    
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/photos/six.jpeg"
          alt="Hero"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ rotateX, rotateY }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl">
            Welcome to Hamper Heaven
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-200 drop-shadow">
            A world of elegance, memories, and style.
          </p> 
          <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-pink-600 text-white rounded-full font-semibold shadow-lg hover:bg-pink-700 transition-colors"
          >
            Explore Now
          </motion.button>
          </Link>
        </motion.div>
      </section>


      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Our Beautiful Collection
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white/30 backdrop-blur-md border border-white/20 hover:shadow-2xl transition-all group"
            >
              <motion.img
                src={`/photos/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-full h-74 object-cover transform group-hover:scale-110 transition-transform duration-500"
                whileHover={{ rotate: -2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-semibold text-lg">Get Yours</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="bg-gradient-to-br from-rose-50 to-pink-100 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 stylish-font mb-12"
        >
          What We Offer
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          {[
            { icon: "🎁", title: "Quality Hampers", desc: "Hand-curated premium hampers for every occasion." },
            { icon: "💝", title: "Elegant Packaging", desc: "Beautiful presentation to make every gift special." },
            { icon: "🚚", title: "Reliable Delivery", desc: "On-time delivery ensuring safe and perfect condition." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

     
      <section className="py-20 bg-pink-600 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Gift Happiness?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg text-pink-100 mb-8"
        >
          Choose from our exclusive collection and make every occasion memorable.
        </motion.p>
<Link to="/products">
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "#fce7f3", color: "#db2777" }}
    whileTap={{ scale: 0.95 }}
    className="px-10 py-4 bg-white text-pink-600 rounded-full font-semibold shadow-lg transition-colors"
  >
    Shop Now
  </motion.button>
</Link>





      </section>
    </div>
  );
};

export default Home;
