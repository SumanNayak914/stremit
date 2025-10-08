// import React, { useState } from 'react';
// import { Search, ShoppingCart, User, ChevronDown, Crown, ChevronRight, X, Plus, Minus, LogOut, Menu } from 'lucide-react';

// const Header = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeSubMenu, setActiveSubMenu] = useState(null);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
//   const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState(null);

//   const menuItems = {
//     home: {
//       title: 'Home',
//       items: [
//         'OTT Home',
//         'Main Home',
//         'Movies',
//         'TV Shows',
//         'Videos',
//         'Merchandise Store'
//       ]
//     },
//     features: {
//       title: 'Features',
//       items: [
//         'Download Movie',
//         'Restricted Content',
//         'Related Merchandise',
//         'Gens',
//         'Tag',
//         'Cats'
//       ]
//     },
//     pages: {
//       title: 'Pages',
//       items: [
//         'About Us',
//         'Contact Us',
//         'FAQ',
//         'Pricing Plane',
//         'Privacy Police',
//         'Term And Use',
//         'Coming Soon',
//         'Error 404'
//       ]
//     },
//     blog: {
//       title: 'Blog',
//       items: [
//         'Listing',
//         {
//           text: 'Blog Grid',
//           submenu: [
//             'One Column Blog',
//             'Two Column Blog',
//             'Three Column Blog',
//             'Four Column Blog'
//           ]
//         },
//         {
//           text: 'Blog Sidebar',
//           submenu: [
//             'Blog Left Sidebar',
//             'Blog Right Sidebar'
//           ]
//         }
//       ]
//     },
//     shop: {
//       title: 'Shop',
//       items: [
//         'Shop',
//         'My Account',
//         'Cart',
//         'Wish List',
//         'Checkout',
//         'Order Tracking'
//       ]
//     }
//   };

//   const cartItems = [
//     { id: 1, name: 'Premium Subscription', price: 499, quantity: 1, image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop' },
//     { id: 2, name: 'Movie Pass', price: 299, quantity: 2, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=100&h=100&fit=crop' }
//   ];

//   const [cart, setCart] = useState(cartItems);

//   const updateQuantity = (id, change) => {
//     setCart(cart.map(item => 
//       item.id === id 
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     ));
//   };

//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <div className="min-h-screen bg-black">
//       <header className="bg-black text-white fixed top-0 left-0 right-0 z-50 border-b border-gray-900">
//         <div className="flex items-center justify-between px-4 md:px-8 py-4">
//           {/* Logo */}
//           <div className="flex items-center gap-2 md:gap-4">
//             <div className="flex items-center gap-2">
//               <div className="bg-red-600 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded">
//                 <span className="text-xl md:text-2xl font-bold">S</span>
//               </div>
//               <span className="text-lg md:text-2xl font-bold tracking-wider">STREAMIT</span>
//             </div>
            
//             <button className="hidden md:flex bg-gradient-to-r from-yellow-600 to-yellow-700 px-5 py-2.5 rounded items-center gap-2 text-sm font-medium hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-lg">
//               <Crown size={16} />
//               Subscribe
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-10">
//             {Object.entries(menuItems).map(([key, menu]) => (
//               <div
//                 key={key}
//                 className="relative group"
//                 onMouseEnter={() => {
//                   setActiveDropdown(key);
//                   setActiveSubMenu(null);
//                 }}
//                 onMouseLeave={() => {
//                   setActiveDropdown(null);
//                   setActiveSubMenu(null);
//                 }}
//               >
//                 <button 
//                   className={`flex items-center gap-1.5 font-medium transition-colors text-base ${
//                     key === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'
//                   }`}
//                 >
//                   {menu.title}
//                   <ChevronDown size={18} className="transition-transform group-hover:rotate-180 duration-300" />
//                 </button>

//                 {/* Main Dropdown */}
//                 {activeDropdown === key && (
//                   <div 
//                     className="absolute top-full left-0 pt-4"
//                     onMouseEnter={() => setActiveDropdown(key)}
//                   >
//                     <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-w-[260px] rounded-lg shadow-2xl border border-gray-800 py-4">
//                       <div className="px-2">
//                         {menu.items.map((item, index) => {
//                           const isObject = typeof item === 'object';
//                           const text = isObject ? item.text : item;
//                           const hasSubmenu = isObject && item.submenu;
                        
//                           return (
//                             <div
//                               key={index}
//                               className="relative"
//                               onMouseEnter={() => hasSubmenu && setActiveSubMenu(text)}
//                               onMouseLeave={() => !hasSubmenu && setActiveSubMenu(null)}
//                             >
//                               <a
//                                 href="#"
//                                 className="group/item flex items-center justify-between px-5 py-3 text-sm text-gray-300 hover:text-red-500 hover:translate-x-2 transition-all duration-300 rounded-md hover:bg-gray-900/50"
//                               >
//                                 <span>{text}</span>
//                                 {hasSubmenu && (
//                                   <ChevronRight size={16} className="text-gray-500 group-hover/item:text-red-500" />
//                                 )}
//                               </a>

//                               {/* Submenu */}
//                               {hasSubmenu && activeSubMenu === text && (
//                                 <div 
//                                   className="absolute left-full top-0 pl-2"
//                                   onMouseEnter={() => setActiveSubMenu(text)}
//                                 >
//                                   <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-w-[240px] rounded-lg shadow-2xl border border-gray-800 py-4">
//                                     <div className="px-2">
//                                       {item.submenu.map((subItem, subIndex) => (
//                                         <a
//                                           key={subIndex}
//                                           href="#"
//                                           className="block px-5 py-3 text-sm text-gray-300 hover:text-red-500 hover:translate-x-2 transition-all duration-300 rounded-md hover:bg-gray-900/50"
//                                         >
//                                           {subItem}
//                                         </a>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Right Icons */}
//           <div className="flex items-center gap-3 md:gap-5">
//             {/* Search - Desktop Only */}
//             <div className="hidden md:block relative">
//               {!showSearch ? (
//                 <button 
//                   onClick={() => setShowSearch(true)}
//                   className="hover:text-red-500 transition-colors duration-300"
//                 >
//                   <Search size={22} strokeWidth={2} />
//                 </button>
//               ) : (
//                 <div className="flex items-center gap-2 animate-in slide-in-from-right duration-500">
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-64 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
//                     autoFocus
//                   />
//                   <button 
//                     onClick={() => {
//                       setShowSearch(false);
//                       setSearchQuery('');
//                     }}
//                     className="hover:text-red-500 transition-colors duration-300"
//                   >
//                     <X size={22} strokeWidth={2} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Cart */}
//             <button 
//               onClick={() => setShowCart(!showCart)}
//               className="relative hover:text-red-500 transition-colors duration-300"
//             >
//               <ShoppingCart size={22} strokeWidth={2} />
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
//                 {cart.length}
//               </span>
//             </button>

//             {/* Profile - Desktop Only */}
//             <div 
//               className="hidden md:block relative"
//               onMouseEnter={() => setShowProfileMenu(true)}
//               onMouseLeave={() => setShowProfileMenu(false)}
//             >
//               <button className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105">
//                 <img 
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
//                   alt="User"
//                   className="w-full h-full object-cover"
//                 />
//               </button>

//               {/* Profile Dropdown */}
//               {showProfileMenu && (
//                 <div className="absolute top-full right-0 pt-4">
//                   <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black w-[280px] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
//                     {/* Profile Header */}
//                     <div className="p-5 border-b border-gray-800">
//                       <div className="flex items-center gap-3">
//                         <img 
//                           src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
//                           alt="Marvin McKinney"
//                           className="w-14 h-14 rounded-lg object-cover"
//                         />
//                         <div>
//                           <h3 className="text-white font-semibold text-lg">Marvin McKinney</h3>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                       <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                         <User size={18} />
//                         <span>Profile</span>
//                       </a>
//                       <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                         <Plus size={18} />
//                         <span>Watch List</span>
//                       </a>
//                       <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
//                         </svg>
//                         <span>Playlist</span>
//                       </a>
//                       <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                         </svg>
//                         <span>Notification</span>
//                       </a>
//                     </div>

//                     {/* Logout */}
//                     <div className="border-t border-gray-800">
//                       <a href="#" className="flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-gray-900/50 transition-all">
//                         <LogOut size={18} />
//                         <span className="font-medium">Logout</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setShowMobileMenu(true)}
//               className="lg:hidden hover:text-red-500 transition-colors duration-300 p-2"
//             >
//               <Menu size={24} strokeWidth={2} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Sidebar */}
//       {showMobileMenu && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black/80 z-40"
//             onClick={() => {
//               setShowMobileMenu(false);
//               setMobileActiveMenu(null);
//               setMobileActiveSubMenu(null);
//             }}
//           />
//           <div className="fixed left-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-gray-900 to-black z-50 shadow-2xl border-r border-gray-800 animate-in slide-in-from-left duration-500 overflow-y-auto">
//             <div className="flex flex-col h-full">
//               {/* Mobile Menu Header */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-800">
//                 <div className="flex items-center gap-2">
//                   <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">
//                     <span className="text-xl font-bold">S</span>
//                   </div>
//                   <span className="text-xl font-bold tracking-wider">STREAMIT</span>
//                 </div>
//                 <button 
//                   onClick={() => {
//                     setShowMobileMenu(false);
//                     setMobileActiveMenu(null);
//                     setMobileActiveSubMenu(null);
//                   }}
//                   className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//                 >
//                   <X size={24} className="text-gray-400 hover:text-white" />
//                 </button>
//               </div>

//               {/* Subscribe Button */}
//               <div className="p-4 border-b border-gray-800">
//                 <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 px-5 py-3 rounded flex items-center justify-center gap-2 text-sm font-medium hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-lg">
//                   <Crown size={18} />
//                   Subscribe Now
//                 </button>
//               </div>

//               {/* Search Bar */}
//               <div className="p-4 border-b border-gray-800">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search movies, shows..."
//                     className="w-full bg-gray-900 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
//                   />
//                   <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 </div>
//               </div>

//               {/* Profile Section */}
//               <div className="p-4 border-b border-gray-800">
//                 <div className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg">
//                   <img 
//                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
//                     alt="Marvin McKinney"
//                     className="w-12 h-12 rounded-lg object-cover"
//                   />
//                   <div>
//                     <h3 className="text-white font-semibold">Marvin McKinney</h3>
//                     <p className="text-gray-400 text-sm">Premium Member</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Menu Items */}
//               <div className="flex-1 overflow-y-auto py-2">
//                 {Object.entries(menuItems).map(([key, menu]) => (
//                   <div key={key} className="border-b border-gray-800/50">
//                     <button
//                       onClick={() => setMobileActiveMenu(mobileActiveMenu === key ? null : key)}
//                       className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-gray-900/50 transition-all"
//                     >
//                       <span className="font-medium text-base">{menu.title}</span>
//                       <ChevronDown 
//                         size={20} 
//                         className={`transition-transform duration-300 ${
//                           mobileActiveMenu === key ? 'rotate-180' : ''
//                         }`}
//                       />
//                     </button>

//                     {/* Submenu Items */}
//                     {mobileActiveMenu === key && (
//                       <div className="bg-gray-900/30 py-2">
//                         {menu.items.map((item, index) => {
//                           const isObject = typeof item === 'object';
//                           const text = isObject ? item.text : item;
//                           const hasSubmenu = isObject && item.submenu;

//                           return (
//                             <div key={index}>
//                               <button
//                                 onClick={() => {
//                                   if (hasSubmenu) {
//                                     setMobileActiveSubMenu(mobileActiveSubMenu === text ? null : text);
//                                   }
//                                 }}
//                                 className="w-full flex items-center justify-between px-8 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all"
//                               >
//                                 <span className="text-sm">{text}</span>
//                                 {hasSubmenu && (
//                                   <ChevronRight 
//                                     size={16}
//                                     className={`transition-transform duration-300 ${
//                                       mobileActiveSubMenu === text ? 'rotate-90' : ''
//                                     }`}
//                                   />
//                                 )}
//                               </button>

//                               {/* Sub-submenu */}
//                               {hasSubmenu && mobileActiveSubMenu === text && (
//                                 <div className="bg-gray-950/50 py-1">
//                                   {item.submenu.map((subItem, subIndex) => (
//                                     <a
//                                       key={subIndex}
//                                       href="#"
//                                       className="block px-12 py-2.5 text-sm text-gray-400 hover:text-red-500 hover:bg-gray-900/50 transition-all"
//                                     >
//                                       {subItem}
//                                     </a>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Quick Links */}
//               <div className="border-t border-gray-800 py-2">
//                 <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                   <User size={18} />
//                   <span>Profile</span>
//                 </a>
//                 <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                   <Plus size={18} />
//                   <span>Watch List</span>
//                 </a>
//                 <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                   </svg>
//                   <span>Notifications</span>
//                 </a>
//               </div>

//               {/* Logout */}
//               <div className="border-t border-gray-800">
//                 <a href="#" className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-gray-900/50 transition-all">
//                   <LogOut size={18} />
//                   <span className="font-medium">Logout</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Cart Sidebar */}
//       {showCart && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black/80 z-40"
//             onClick={() => setShowCart(false)}
//           />
//           <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-black z-50 shadow-2xl border-l border-gray-800 animate-in slide-in-from-right duration-500">
//             <div className="flex flex-col h-full">
//               {/* Cart Header */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-800">
//                 <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
//                 <button 
//                   onClick={() => setShowCart(false)}
//                   className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//                 >
//                   <X size={24} className="text-gray-400 hover:text-white" />
//                 </button>
//               </div>

//               {/* Cart Items */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 {cart.length === 0 ? (
//                   <div className="text-center text-gray-400 py-12">
//                     <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
//                     <p>Your cart is empty</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {cart.map((item) => (
//                       <div key={item.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
//                         <div className="flex gap-4">
//                           <img 
//                             src={item.image} 
//                             alt={item.name}
//                             className="w-20 h-20 rounded-lg object-cover"
//                           />
//                           <div className="flex-1">
//                             <h3 className="text-white font-medium mb-2">{item.name}</h3>
//                             <p className="text-red-500 font-semibold">₹{item.price}</p>
//                             <div className="flex items-center gap-3 mt-3">
//                               <button 
//                                 onClick={() => updateQuantity(item.id, -1)}
//                                 className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded transition-colors"
//                               >
//                                 <Minus size={16} />
//                               </button>
//                               <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
//                               <button 
//                                 onClick={() => updateQuantity(item.id, 1)}
//                                 className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded transition-colors"
//                               >
//                                 <Plus size={16} />
//                               </button>
//                               <button 
//                                 onClick={() => removeItem(item.id)}
//                                 className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
//                               >
//                                 <X size={20} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Cart Footer */}
//               {cart.length > 0 && (
//                 <div className="border-t border-gray-800 p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-gray-400">Subtotal:</span>
//                     <span className="text-2xl font-bold text-white">₹{totalAmount}</span>
//                   </div>
//                   <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors">
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )}

     
//     </div>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Crown, ChevronRight, X, Plus, Minus, LogOut, Menu, Settings } from 'lucide-react';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState(null);
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  const menuItems = {
    home: {
      title: 'Home',
      items: [
        'OTT Home',
        'Main Home',
        'Movies',
        'TV Shows',
        'Videos',
        'Merchandise Store'
      ]
    },
    features: {
      title: 'Features',
      items: [
        'Download Movie',
        'Restricted Content',
        'Related Merchandise',
        'Gens',
        'Tag',
        'Cats'
      ]
    },
    pages: {
      title: 'Pages',
      items: [
        'About Us',
        'Contact Us',
        'FAQ',
        'Pricing Plane',
        'Privacy Police',
        'Term And Use',
        'Coming Soon',
        'Error 404'
      ]
    },
    blog: {
      title: 'Blog',
      items: [
        'Listing',
        {
          text: 'Blog Grid',
          submenu: [
            'One Column Blog',
            'Two Column Blog',
            'Three Column Blog',
            'Four Column Blog'
          ]
        },
        {
          text: 'Blog Sidebar',
          submenu: [
            'Blog Left Sidebar',
            'Blog Right Sidebar'
          ]
        }
      ]
    },
    shop: {
      title: 'Shop',
      items: [
        'Shop',
        'My Account',
        'Cart',
        'Wish List',
        'Checkout',
        'Order Tracking'
      ]
    }
  };

  const cartItems = [
    { id: 1, name: 'Premium Subscription', price: 499, quantity: 1, image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop' },
    { id: 2, name: 'Movie Pass', price: 299, quantity: 2, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=100&h=100&fit=crop' }
  ];

  const [cart, setCart] = useState(cartItems);

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className=" bg-black">
      <style>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .slide-in-left {
          animation: slideInFromLeft 0.4s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInFromRight 0.4s ease-out forwards;
        }
      `}</style>
      
      <header className="bg-black text-white fixed top-0 left-0 right-0 z-50 border-b border-gray-900">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-wider text-red-600">STREAMIT</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => {
                  setActiveDropdown(key);
                  setActiveSubMenu(null);
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveSubMenu(null);
                }}
              >
                <button 
                  className={`flex items-center gap-1.5 font-medium transition-colors text-sm ${
                    key === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'
                  }`}
                >
                  {menu.title}
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180 duration-300" />
                </button>

                {/* Main Dropdown */}
                {activeDropdown === key && (
                  <div 
                    className="absolute top-full left-0 pt-4"
                    onMouseEnter={() => setActiveDropdown(key)}
                  >
                    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-w-[260px] rounded-lg shadow-2xl border border-gray-800 py-4">
                      <div className="px-2">
                        {menu.items.map((item, index) => {
                          const isObject = typeof item === 'object';
                          const text = isObject ? item.text : item;
                          const hasSubmenu = isObject && item.submenu;
                        
                          return (
                            <div
                              key={index}
                              className="relative"
                              onMouseEnter={() => hasSubmenu && setActiveSubMenu(text)}
                              onMouseLeave={() => !hasSubmenu && setActiveSubMenu(null)}
                            >
                              <a
                                href="#"
                                className="group/item flex items-center justify-between px-5 py-3 text-sm text-gray-300 hover:text-red-500 hover:translate-x-2 transition-all duration-300 rounded-md hover:bg-gray-900/50"
                              >
                                <span>{text}</span>
                                {hasSubmenu && (
                                  <ChevronRight size={16} className="text-gray-500 group-hover/item:text-red-500" />
                                )}
                              </a>

                              {/* Submenu */}
                              {hasSubmenu && activeSubMenu === text && (
                                <div 
                                  className="absolute left-full top-0 pl-2"
                                  onMouseEnter={() => setActiveSubMenu(text)}
                                >
                                  <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-w-[240px] rounded-lg shadow-2xl border border-gray-800 py-4">
                                    <div className="px-2">
                                      {item.submenu.map((subItem, subIndex) => (
                                        <a
                                          key={subIndex}
                                          href="#"
                                          className="block px-5 py-3 text-sm text-gray-300 hover:text-red-500 hover:translate-x-2 transition-all duration-300 rounded-md hover:bg-gray-900/50"
                                        >
                                          {subItem}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Crown Icon - Desktop Only */}
            <button className="hidden md:block hover:text-yellow-500 transition-colors duration-300 bg-yellow-600/20 p-2.5 rounded-lg">
              <Crown size={20} strokeWidth={2} className="text-yellow-500" />
            </button>

            {/* Cart */}
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative hover:text-red-500 transition-colors duration-300"
            >
              <ShoppingCart size={22} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                {cart.length}
              </span>
            </button>

            {/* Profile - Works on both Desktop and Mobile */}
            <div className="relative">
              <button 
                onClick={() => setShowMobileProfile(!showMobileProfile)}
                onMouseEnter={() => window.innerWidth >= 768 && setShowProfileMenu(true)}
                onMouseLeave={() => window.innerWidth >= 768 && setShowProfileMenu(false)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Profile Dropdown - Desktop (Hover) */}
              {showProfileMenu && window.innerWidth >= 768 && (
                <div 
                  className="absolute top-full right-0 pt-4"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black w-[280px] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
                    <div className="p-5 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                          alt="Marvin McKinney"
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-white font-semibold text-lg">Marvin McKinney</h3>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                        <User size={18} />
                        <span>Profile</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                        <Plus size={18} />
                        <span>Watch List</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <span>Playlist</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span>Notification</span>
                      </a>
                    </div>

                    <div className="border-t border-gray-800">
                      <a href="#" className="flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-gray-900/50 transition-all">
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Dropdown - Mobile (Click) */}
              {showMobileProfile && (
                <>
                  <div 
                    className="md:hidden fixed inset-0 bg-black/80 z-40"
                    onClick={() => setShowMobileProfile(false)}
                  />
                  <div className="md:hidden absolute top-full right-0 pt-4 z-50">
                    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black w-[280px] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
                      <div className="p-5 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                            alt="Marvin McKinney"
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-white font-semibold text-lg">Marvin McKinney</h3>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                          <User size={18} />
                          <span>Profile</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                          <Plus size={18} />
                          <span>Watch List</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                          <span>Playlist</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          <span>Notification</span>
                        </a>
                      </div>

                      <div className="border-t border-gray-800">
                        <a href="#" className="flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-gray-900/50 transition-all">
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden hover:text-red-500 transition-colors duration-300"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
            onClick={() => {
              setShowMobileMenu(false);
              setMobileActiveMenu(null);
              setMobileActiveSubMenu(null);
            }}
          />
          <div 
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-gray-900 to-black z-50 shadow-2xl border-r border-gray-800 overflow-y-auto slide-in-left"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">
                    <span className="text-xl font-bold">S</span>
                  </div>
                  <span className="text-xl font-bold tracking-wider text-red-600">STREAMIT</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Settings size={22} className="text-gray-400 hover:text-white" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowMobileMenu(false);
                      setMobileActiveMenu(null);
                      setMobileActiveSubMenu(null);
                    }}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-2">
                {Object.entries(menuItems).map(([key, menu]) => (
                  <div key={key} className="border-b border-gray-800/50">
                    <button
                      onClick={() => setMobileActiveMenu(mobileActiveMenu === key ? null : key)}
                      className={`w-full flex items-center justify-between px-6 py-4 hover:bg-gray-900/50 transition-all ${
                        key === 'home' ? 'text-red-500' : key === 'features' ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <span className="font-medium text-base">{menu.title}</span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${
                          mobileActiveMenu === key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Submenu Items */}
                    {mobileActiveMenu === key && (
                      <div className="bg-gray-900/30 py-2">
                        {menu.items.map((item, index) => {
                          const isObject = typeof item === 'object';
                          const text = isObject ? item.text : item;
                          const hasSubmenu = isObject && item.submenu;

                          return (
                            <div key={index}>
                              <button
                                onClick={() => {
                                  if (hasSubmenu) {
                                    setMobileActiveSubMenu(mobileActiveSubMenu === text ? null : text);
                                  }
                                }}
                                className={`w-full flex items-center justify-between px-8 py-3 hover:bg-gray-900/50 transition-all ${
                                  (key === 'home' && (text === 'OTT Home' || text === 'TV Shows')) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                                }`}
                              >
                                <span className="text-sm">{text}</span>
                                {hasSubmenu && (
                                  <ChevronRight 
                                    size={16}
                                    className={`transition-transform duration-300 ${
                                      mobileActiveSubMenu === text ? 'rotate-90' : ''
                                    }`}
                                  />
                                )}
                              </button>

                              {/* Sub-submenu */}
                              {hasSubmenu && mobileActiveSubMenu === text && (
                                <div className="bg-gray-950/50 py-1">
                                  {item.submenu.map((subItem, subIndex) => (
                                    <a
                                      key={subIndex}
                                      href="#"
                                      className="block px-12 py-2.5 text-sm text-gray-400 hover:text-red-500 hover:bg-gray-900/50 transition-all"
                                    >
                                      {subItem}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
            onClick={() => setShowCart(false)}
          />
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-black z-50 shadow-2xl border-l border-gray-800 slide-in-right"
          >
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-2">{item.name}</h3>
                            <p className="text-red-500 font-semibold">₹{item.price}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-2xl font-bold text-white">₹{totalAmount}</span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;