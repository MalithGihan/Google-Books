import React,  { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './pages/About';
import Home from './Home'; 
import BookDetails from './Pages/BookDetails';
import CategoryPage from './pages/CategoryPage'; 
import { ThemeProvider } from './ThemeContext';

const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/book/:id" element={<BookDetails />} /> 
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
