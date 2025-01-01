import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from './apiConfig';
import { useTheme } from './ThemeContext';
import { Search, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const { isDarkMode } = useTheme();
  const scrollRef = useRef(null);

  const scrollF = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction * 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchBooks = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_CONFIG.baseUrl}?q=${searchQuery}&key=${API_CONFIG.apiKey}`
      );
      if (response.status === 200 && response.data.items) {
        setBooks(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
    setLoading(false);
  };

  const fetchFavoriteBooks = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_CONFIG.baseUrl}?q=favorite%20books%20${year}&key=${API_CONFIG.apiKey}`
      );
      if (response.status === 200 && response.data.items) {
        setFavoriteBooks(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching favorite books:', error);
      setFavoriteBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavoriteBooks(selectedYear);
  }, [selectedYear]);

  const BookCard = ({ book }) => (
    <Link to={`/book/${book.id}`}>
      <div className={`transform transition-all duration-300 hover:scale-105 p-1 md:p-2 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
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

  const quotes = [
    {
      text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
      author: "Martin Luther King Jr."
    },
    {
      text: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
      author: "Marilyn Monroe"
    },
    {
      text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
      author: "Dr. Seuss"
    },
    {
      text: "If you tell the truth, you don't have to remember anything.",
      author: "Mark Twain"
    },
    {
      text: "A friend is someone who knows all about you and still loves you.",
      author: "Elbert Hubbard"
    },
    {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    }
  ];

  const categories = [
    { display: 'Most Reading Horror', slug: 'most-reading-horror' },
    { display: 'Favorite Debut Novel', slug: 'favorite-debut-novel' },
    { display: 'Fantasy Audiobook', slug: 'fantasy-audiobook' },
    { display: '2023 Award Winning Young Adult Fantasy', slug: '2023-award-winning-young-adult-fantasy' },
    { display: 'Favorite Young Adult Fiction', slug: 'favorite-young-adult-fiction' },
    { display: 'About Self Nonfiction', slug: 'about-self-nonfiction' },
    { display: 'Favorite Memoir', slug: 'favorite-memoir' },
    { display: 'Readers Favorite History & Biography', slug: 'readers-favorite-history-biography' },
  ];

  const scroll = (direction) => {
    const scrollAmount = direction * (window.innerWidth >= 768 ? 350 : 280);
    scrollRef.current?.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative h-[60vh] w-full flex items-center justify-center ${isDarkMode
          ? 'bg-gradient-to-r from-black via-indigo-950 to-black'
          : 'bg-gradient-to-r from-lime-100 to-rose-300'
          }`}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto px-4"
        >
          <motion.h1
            className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Discover Your Next Book
          </motion.h1>

          <div className="relative flex flex-col md:flex-row items-center gap-4 justify-center">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: searchQuery ? "75%" : "100%" }}
              transition={{ duration: 0.3 }}
              className="w-full md:max-w-2xl"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or ISBN"
                className={`w-full px-6 py-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-white text-black' : 'text-black'
                  } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                }}
              />
            </motion.div>

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={fetchBooks}
                  className="w-full md:w-auto px-8 py-3 bg-black text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-4 mt-8 md:mt-16">
        <AnimatePresence>
          {books.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-8">Search Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="mt-16">
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold">Favorite Books</h2>
            <div className="flex items-center gap-6">
              {['2020', '2021', '2022', '2023', '2024'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-2 py-1 font-semibold rounded-md transform transition-all duration-500 hover:scale-105 ${selectedYear === year
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-200 text-white'
                      : 'bg-white hover:bg-gray-200 text-black'
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>


          <div className="relative">
            <div className="overflow-x-clip">
              <div className="flex gap-6 pb-6 animate-carousel">
                {[...favoriteBooks, ...favoriteBooks].map((book, index) => (
                  <div key={`${book.id}-${index}`} className="min-w-[200px]">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
              <button className="p-2 rounded-full bg-white shadow-lg">
                <ChevronLeft className="w-6 h-6" color="#000000" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
              <button className="p-2 rounded-full bg-white shadow-lg">
                <ChevronRight className="w-6 h-6" color="#000000" />
              </button>
            </div>
          </div>
          <style>{`
    @keyframes carousel {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-carousel {
      animation: carousel 30s linear infinite;
    }
    .animate-carousel:hover {
      animation-play-state: paused;
    }
  `}</style>
        </section>

        <section className="mt-8 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 max-w-7xl mx-auto">
            Inspiring Quotes
          </h2>

          <div className="relative group">
            <div className="overflow-x-clip" ref={scrollRef}>
              <div className="flex gap-4 md:gap-8 pb-2 animate-bounce-scroll">
                {quotes.map((quote, index) => (
                  <div
                    key={`quote-${index}`}
                    className={`min-w-[280px] md:min-w-[350px] p-1 md:p-3 rounded-lg shadow-lg 
                  transform transition-all duration-500 hover:scale-105
                  ${isDarkMode
                        ? 'bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm'
                        : 'bg-white/50 hover:bg-gray-50/50 backdrop-blur-sm'
                      }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="text-base md:text-xl mb-1 md:mb-2 text-blue-500">"</div>
                      <p className={`text-sm md:text-base italic mb-1 md:mb-2 line-clamp-4
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {quote.text}
                      </p>
                      <div className="mt-auto">
                        <p className={`font-semibold text-xm md:text-base
                      ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                        >
                          {quote.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute top-1/2 -left-2 md:-left-4 transform -translate-y-1/2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            focus:opacity-100 focus:outline-none"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              <div className={`p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 
            hover:scale-110 focus:scale-110
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" color='#000000' />
              </div>
            </button>

            <button
              className="absolute top-1/2 -right-2 md:-right-4 transform -translate-y-1/2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            focus:opacity-100 focus:outline-none"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              <div className={`p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 
            hover:scale-110 focus:scale-110
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            </button>
          </div>

          <style>{`
        @keyframes bounceScroll {
          0% {
            transform: translateX(0);
          }
          85% {
            transform: translateX(-45%);
          }
          90% {
            transform: translateX(-47%);
          }
          95% {
            transform: translateX(-48%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-bounce-scroll {
          animation: bounceScroll 45s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        .animate-bounce-scroll:hover {
          animation-play-state: paused;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 max-w-7xl mx-auto">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-left mb-4 md:mb-8 max-w-7xl mx-auto">
              Choice Awards: Readers' Favorite Books 2024
            </h2>
          </div>
          {categories.map(({ display, slug }) => (
            <div key={slug}>
              <Link to={`/categories/${slug}`}>
                <h3
                  className={`text-sm md:text-base font-semibold cursor-pointer transform transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-yellow-500'
                    }`}
                >
                  {display}
                </h3>
              </Link>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default Home;