import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../apiConfig';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseUrl}/${id}?key=${API_CONFIG.apiKey}`
        );
        if (response.status === 200) {
          setBook(response.data);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <p className="text-xl">No details available for this book.</p>
      </div>
    );
  }

  const { volumeInfo } = book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${
        isDarkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mb-8 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative group">
              <img
                src={volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg'}
                alt={volumeInfo.title}
                className="rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105 max-w-xs w-full"
              />
              <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 group-hover:opacity-0 ${
                isDarkMode ? 'bg-black/20' : 'bg-white/20'
              }`} />
            </div>
            
            <a
              href={volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 text-sm mt-8"
            >
              View on Google Books
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {volumeInfo.title}
              </h1>
              {volumeInfo.authors?.length > 0 && (
                <p className={`text-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  by {volumeInfo.authors.join(', ')}
                </p>
              )}
            </div>

            {volumeInfo.categories && (
              <div className="flex flex-wrap gap-2">
                {volumeInfo.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {volumeInfo.description && (
              <div className={`prose max-w-none ${
                isDarkMode ? 'prose-invert' : ''
              }`}>
                <div
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                  className={`text-base leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                />
              </div>
            )}
            
            <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}>
              {volumeInfo.publisher && (
                <div>
                  <h3 className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Publisher</h3>
                  <p className="mt-1">{volumeInfo.publisher}</p>
                </div>
              )}
              {volumeInfo.publishedDate && (
                <div>
                  <h3 className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Published Date</h3>
                  <p className="mt-1">{volumeInfo.publishedDate}</p>
                </div>
              )}
              {volumeInfo.pageCount && (
                <div>
                  <h3 className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Pages</h3>
                  <p className="mt-1">{volumeInfo.pageCount}</p>
                </div>
              )}
              {volumeInfo.language && (
                <div>
                  <h3 className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Language</h3>
                  <p className="mt-1">{volumeInfo.language.toUpperCase()}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;