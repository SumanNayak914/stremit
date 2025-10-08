import React from 'react';
import { Mail, Phone, ListChecks, Users, X, Facebook, Instagram, ChevronUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16">
      <div className=" mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Links and Contact Section (Converted to Flexbox) */}
        <div className="flex flex-wrap pb-16 justify-between">
          
          {/* 1. Logo and Contact Info (Approx. 20% width on large screens) */}
          <div className="w-full md:w-1/4 lg:w-[25%] mb-10 lg:mb-0">
            <div className="flex items-center mb-6">
              <span className="text-4xl font-extrabold text-red-600 mr-2">S</span>
              <span className="text-2xl font-bold uppercase tracking-wider text-white">STREAMIT</span>
            </div>
            
            <p className="text-gray-400 text-sm flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email us: customer@streamit.com
            </p>
            
            <p className="text-gray-400 text-sm mb-1">Helpline number</p>
            <p className="text-white text-lg font-bold">
              <Phone className="w-5 h-5 inline-block mr-1 text-red-600" />
              +(480) 555-0103
            </p>
          </div>

          {/* 2. Movies To Watch (Approx. 15% width) */}
          <div className="w-1/2 md:w-1/4 lg:w-[15%] mb-10 lg:mb-0">
            <h4 className="text-lg font-bold mb-4 text-white">Movies To Watch</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-600 transition duration-200">Top Trending</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Recommended</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Popular</a></li>
            </ul>
          </div>

          {/* 3. Quick Links (Approx. 15% width) */}
          <div className="w-1/2 md:w-1/4 lg:w-[15%] mb-10 lg:mb-0">
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-600 transition duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Pricing Plan</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* 4. About Company (Approx. 15% width) */}
          <div className="w-1/2 md:w-1/4 lg:w-[15%] mb-10 lg:mb-0">
            <h4 className="text-lg font-bold mb-4 text-white">About Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-600 transition duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Shop</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Terms and Use</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 5. Subscribe Newsletter (Takes remaining width, approx. 35% on large screens) */}
          <div className="w-full md:w-3/4 lg:w-[30%]">
            <h4 className="text-lg font-bold mb-4 text-white">Subscribe Newsletter</h4>
            
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="py-3 px-4 bg-black border border-white/40  text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
              <button 
                type="submit" 
                className="bg-red-600 text-white font-semibold py-3 px-6 hover:bg-red-700 transition duration-200"
              >
                SUBSCRIBE
              </button>
            </form>

            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-3">Follow Us:</span>
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-full transition duration-200" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-full transition duration-200" aria-label="X (Twitter)">
                  <X className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-full transition duration-200" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section (Already uses Flexbox) */}
        <div className="border-t border-gray-800 pt-5 pb-8 flex flex-col md:flex-row justify-between items-center text-xs">
          
          <div className="order-2 md:order-1 text-gray-400 text-center md:text-left mt-4 md:mt-0 max-w-2xl">
            <p>
              &copy; {new Date().getFullYear()} <span className="text-red-600 font-bold">STREAMIT</span> All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited.
            </p>
          </div>
          
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end">
            <p className="text-white mb-2 font-semibold">Download Streamit App</p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Download on Google Play">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10"/>
              </a>
              <a href="#" aria-label="Download on App Store">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10"/>
              </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition duration-200 ml-4" aria-label="Go to top">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up text-white"><path d="m18 15-6-6-6 6"/></svg>
                </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;