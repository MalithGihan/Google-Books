import React from 'react';
import { useTheme } from '../ThemeContext';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const sections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Terms', 'Privacy']
    },
    {
      title: 'Advertise',
      links: ['Interest Based Ads', 'Ad Preferences', 'Authors']
    },
    {
      title: 'Help',
      links: ['Help Center', 'Work with Us', 'API', 'Authors & Ads Blog']
    }
  ];

  const socialIcons = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Twitter, label: 'Twitter' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Linkedin, label: 'LinkedIn' }
  ];

  const FooterSection = ({ title, links }) => (
    <div className="flex flex-col space-y-3">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              className= {`text-sm transform transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'text-white hover:text-yellow-500' : 'text-gray-700 hover:text-black'}`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer 
      className={`w-full mt-auto ${
        isDarkMode 
          ? 'bg-black text-gray-200' 
          : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <FooterSection 
              key={index} 
              title={section.title} 
              links={section.links} 
            />
          ))}
          
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-lg mb-4 text-yellow-500">Connect</h3>
            <div className="flex space-x-6">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isDarkMode ? 'text-white hover:text-yellow-500' : 'text-gray-700 hover:text-black'
                  }`}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? 'border-yellow-500' : 'border-gray-400'
        }`}>
          <p className={`text-sm text-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} Google Books Search App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;