import React from "react";
import { FaBook, FaSearch, FaSmile } from "react-icons/fa";
import bookshelfImage from "../assets/henry-be-lc7xcWebECc-unsplash.jpg";
import { useTheme } from '../ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={bookshelfImage}
              alt="Bookshelf"
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
            />
            <div className={`absolute inset-0 ${
              isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/30'
            }`} />
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                About
                <span className="block text-4xl sm:text-5xl mt-2 text-yellow-500">Us</span>
              </h1>
              <p className={`text-xl mt-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Welcome to our book discovery platform!
              </p>
            </div>

            <div className={`space-y-6 text-sm sm:text-base ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p className="leading-relaxed">
                Our app allows users to explore a vast collection of books using the powerful Google Books API. Whether you're searching for your next read or diving deep into research, we've got you covered!
              </p>
              <p className="leading-relaxed">
                Books have always been a gateway to knowledge, inspiration, and escapism. Our goal is to create a platform where readers, researchers, and book enthusiasts can find a world of literature at their fingertips.
              </p>
              <p className="leading-relaxed">
                From timeless classics to the latest releases, our platform offers something for everyone. Through curated lists, featured collections, and themed categories, we aim to bring readers together over shared interests and discussions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: FaSearch,
                  title: "Discover Books",
                  description: "Quickly find books across genres, authors, and topics."
                },
                {
                  icon: FaBook,
                  title: "Vast Library",
                  description: "From classics to bestsellers, tailored to your interests."
                },
                {
                  icon: FaSmile,
                  title: "Intuitive Design",
                  description: "User-friendly interface with personalized features."
                }
              ].map((feature, index) => (
                <div key={index} className={`p-6 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}>
                  <feature.icon className="text-4xl text-yellow-500 mb-4 animate-bounce" />
                  <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-16 rounded-2xl shadow-xl overflow-hidden ${
          isDarkMode ? 'bg-gradient-to-r from-black via-indigo-950 to-black' : 'bg-gradient-to-r from-lime-100 to-rose-300'
        }`}>
          <div className="px-8 py-12 text-center">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Join Our Community
            </h2>
            <p className={`max-w-2xl mx-auto mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Discover, explore, and connect with a world of literature. Be part of
              a growing community of book lovers who share your passion.
            </p>
            <button className="px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;