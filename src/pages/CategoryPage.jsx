import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../apiConfig';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';
import { Loader2, BookOpen } from 'lucide-react';

const BookCard = ({ book, isDarkMode }) => (
  <Link to={`/book/${book.id}`}>
    <div className={`transform transition-all duration-300 hover:scale-105 p-3 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm' : 'bg-white/50 hover:bg-gray-50/50 backdrop-blur-sm'
      }`}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-4">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || '/api/placeholder/200/300'}
          alt={book.volumeInfo.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold line-clamp-2">{book.volumeInfo.title}</h3>
      <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        by {book.volumeInfo.authors?.join(', ')}
      </p>
      <p className="text-sm mt-2 line-clamp-3">{book.volumeInfo.description}</p>
      <div className="mt-3 flex items-center text-sm">
        <BookOpen className="w-4 h-4 mr-1" />
        <span>{book.volumeInfo.pageCount || 'N/A'} pages</span>
      </div>
    </div>
  </Link>
);

const CategoryPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const decodedCategory = category
    .replace(/-/g, ' ') 
    .replace(/\b(?:the|and|of|in|on)\b/g, (match) => match.toLowerCase()) 
    .replace(/\b\w/g, (char) => char.toUpperCase()) 
    .replace('&', ' & '); 

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_CONFIG.baseUrl}?q=subject:${decodedCategory}&key=${API_CONFIG.apiKey}`
        );
        if (response.status === 200 && response.data.items) {
          setBooks(response.data.items);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [decodedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const bookCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-left mb-16 mt-16"
        >
          {decodedCategory} Books
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
          >
            {books.length > 0 ? (
              books.map((book) => (
                <motion.div
                  key={book.id}
                  variants={bookCardVariants}
                >
                  <BookCard book={book} isDarkMode={isDarkMode} />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-lg"
              >
                No books found in this category.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;