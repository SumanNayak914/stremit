// import React, { useState, useEffect, useRef } from 'react';
// import image1 from "../assets/img1.jpg"
// import image2 from "../assets/img2.jpg"
// import image3 from "../assets/img3.jpg"
// import image4 from "../assets/img4.jpg"

// const HeroCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animationType, setAnimationType] = useState('');
//   const timeoutRef = useRef(null);
//   const autoNextRef = useRef(null);

//   const slides = [
//     {
//       image: 'src/assets/img1.jpg',
//       author: 'LUNDEV',
//       title: 'DESIGN SLIDER',
//       topic: 'ANIMAL',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
//     },
//     {
//       image: 'src/assets/img2.jpg',
//       author: 'LUNDEV',
//       title: 'DESIGN SLIDER',
//       topic: 'ANIMAL',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
//     },
//     {
//       image: 'src/assets/img3.jpg',
//       author: 'LUNDEV',
//       title: 'DESIGN SLIDER',
//       topic: 'ANIMAL',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
//     },
//     {
//       image: 'src/assets/img4.jpg',
//       author: 'LUNDEV',
//       title: 'DESIGN SLIDER',
//       topic: 'ANIMAL',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
//     }
//   ];

//   const showSlider = (type) => {
//     setAnimationType(type);
    
//     if (type === 'next') {
//       setActiveIndex((prev) => (prev + 1) % slides.length);
//     } else {
//       setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
//     }

//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setAnimationType('');
//     }, 3000);

//     clearTimeout(autoNextRef.current);
//     autoNextRef.current = setTimeout(() => {
//       showSlider('next');
//     }, 7000);
//   };

//   useEffect(() => {
//     autoNextRef.current = setTimeout(() => {
//       showSlider('next');
//     }, 7000);

//     return () => {
//       clearTimeout(timeoutRef.current);
//       clearTimeout(autoNextRef.current);
//     };
//   }, []);

//   const getOrderedSlides = () => {
//     const ordered = [];
//     for (let i = 0; i < slides.length; i++) {
//       ordered.push(slides[(activeIndex + i) % slides.length]);
//     }
//     return ordered;
//   };

//   return (
//     <div className=" bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
//         @keyframes showContent {
//           to {
//             transform: translateY(0px);
//             filter: blur(0px);
//             opacity: 1;
//           }
//         }
        
//         @keyframes showImage {
//           to {
//             bottom: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             border-radius: 0;
//           }
//         }
        
//         @keyframes showThumbnail {
//           from {
//             width: 0;
//             opacity: 0;
//           }
//         }
        
//         @keyframes effectNext {
//           from {
//             transform: translateX(150px);
//           }
//         }
        
//         @keyframes runningTime {
//           from { width: 100% }
//           to { width: 0 }
//         }
        
//         @keyframes outFrame {
//           to {
//             width: 150px;
//             height: 220px;
//             bottom: 50px;
//             left: 50%;
//             border-radius: 20px;
//           }
//         }
        
//         @keyframes contentOut {
//           to {
//             transform: translateY(-150px);
//             filter: blur(20px);
//             opacity: 0;
//           }
//         }
        
//         .carousel-item-first .content-author,
//         .carousel-item-first .content-title,
//         .carousel-item-first .content-topic,
//         .carousel-item-first .content-des,
//         .carousel-item-first .content-buttons {
//           transform: translateY(50px);
//           filter: blur(20px);
//           opacity: 0;
//           animation: showContent 0.5s 1s linear 1 forwards;
//         }
        
//         .carousel-item-first .content-title {
//           animation-delay: 1.2s !important;
//         }
        
//         .carousel-item-first .content-topic {
//           animation-delay: 1.4s !important;
//         }
        
//         .carousel-item-first .content-des {
//           animation-delay: 1.6s !important;
//         }
        
//         .carousel-item-first .content-buttons {
//           animation-delay: 1.8s !important;
//         }
        
//         .carousel-next .carousel-item-first img {
//           width: 150px;
//           height: 220px;
//           position: absolute;
//           bottom: 50px;
//           left: 50%;
//           border-radius: 30px;
//           animation: showImage 0.5s linear 1 forwards;
//         }
        
//         .carousel-next .thumbnail-last {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel-next .thumbnail-container {
//           animation: effectNext 0.5s linear 1 forwards;
//         }
        
//         .carousel-next .time-bar,
//         .carousel-prev .time-bar {
//           animation: runningTime 3s linear 1 forwards;
//         }
        
//         .carousel-prev .carousel-item-second img {
//           animation: outFrame 0.5s linear 1 forwards;
//           position: absolute;
//           bottom: 0;
//           left: 0;
//         }
        
//         .carousel-prev .thumbnail-first {
//           overflow: hidden;
//           opacity: 0;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel-prev .carousel-item-second .content-author,
//         .carousel-prev .carousel-item-second .content-title,
//         .carousel-prev .carousel-item-second .content-topic,
//         .carousel-prev .carousel-item-second .content-des,
//         .carousel-prev .carousel-item-second .content-buttons {
//           animation: contentOut 1.5s linear 1 forwards !important;
//         }
//       `}</style>

     

//       {/* Carousel */}
//       <div className={`relative overflow-hidden carousel-${animationType}`} style={{ height: 'calc(100vh)', marginTop: '-50px', width: '100vw' }}>
//         {/* List Items */}
//         <div className="relative w-full h-full">
//           {getOrderedSlides().map((slide, index) => (
//             <div
//               key={`${activeIndex}-${index}`}
//               className={`absolute inset-0 w-full h-full ${index === 0 ? 'carousel-item-first z-10' : index === 1 ? 'carousel-item-second z-20' : ''}`}
//             >
//               <img src={slide.image} alt="" className="w-full h-full object-cover" />
//               <div className="absolute" style={{ top: '20%', width: '1140px', maxWidth: '80%', left: '20%', transform: 'translateX(-20%)', paddingRight: '30%', boxSizing: 'border-box', color: '#fff', textShadow: '0 5px 10px rgba(0,0,0,0.27)' }}>
//                 <div className="content-author font-bold" style={{ letterSpacing: '10px', fontSize: '12px' }}>{slide.author}</div>
//                 <div className="content-title font-bold" style={{ fontSize: '5em', lineHeight: '1.3em' }}>{slide.title}</div>
//                 <div className="content-topic font-bold" style={{ fontSize: '5em', lineHeight: '1.3em', color: '#f1683a' }}>{slide.topic}</div>
//                 <div className="content-des text-xs mt-2">{slide.description}</div>
//                 <div className="content-buttons grid gap-1 mt-5" style={{ gridTemplateColumns: 'repeat(2, 130px)', gridTemplateRows: '40px' }}>
//                   <button className="border-0 bg-black font-medium" style={{ letterSpacing: '3px', fontFamily: 'Poppins' }}>SEE MORE</button>
//                   <button className="border border-white bg-transparent text-white font-medium" style={{ letterSpacing: '3px', fontFamily: 'Poppins' }}>SUBSCRIBE</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Thumbnails */}
//         <div className="thumbnail-container absolute flex gap-5 z-50" style={{ bottom: '50px', left: '50%', width: 'max-content' }}>
//           {getOrderedSlides().map((slide, index) => (
//             <div
//               key={`thumb-${activeIndex}-${index}`}
//               className={`flex-shrink-0 relative ${index === 0 ? 'thumbnail-first' : ''} ${index === slides.length - 1 ? 'thumbnail-last' : ''}`}
//               style={{ width: '150px', height: '220px' }}
//             >
//               <img src={slide.image} alt="" className="w-full h-full object-cover rounded-3xl" />
//               <div className="absolute text-white" style={{ bottom: '10px', left: '10px', right: '10px' }}>
//                 <div className="font-medium text-xs">Name Slider</div>
//                 <div className="font-light text-xs">Description</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Arrows */}
//         <div className="absolute flex items-center gap-2 z-50" style={{ top: '80%', right: '52%', width: '300px', maxWidth: '30%' }}>
//           <button
//             onClick={() => showSlider('prev')}
//             className="w-10 h-10 rounded-full border-0 text-white font-bold transition-all duration-500"
//             style={{ backgroundColor: 'rgba(238, 238, 238, 0.27)', fontFamily: 'monospace' }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#fff';
//               e.target.style.color = '#000';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'rgba(238, 238, 238, 0.27)';
//               e.target.style.color = '#fff';
//             }}
//           >
//             &lt;
//           </button>
//           <button
//             onClick={() => showSlider('next')}
//             className="w-10 h-10 rounded-full border-0 text-white font-bold transition-all duration-500"
//             style={{ backgroundColor: 'rgba(238, 238, 238, 0.27)', fontFamily: 'monospace' }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#fff';
//               e.target.style.color = '#000';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'rgba(238, 238, 238, 0.27)';
//               e.target.style.color = '#fff';
//             }}
//           >
//             &gt;
//           </button>
//         </div>

//         {/* Time Bar */}
//         <div className={`time-bar absolute z-50 h-1 ${animationType ? 'w-full' : 'w-0'}`} style={{ backgroundColor: '#f1683a', left: 0, top: 0 }}></div>
//       </div>
//     </div>
//   );
// };

// export default HeroCarousel;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = () => {
  const [slides, setSlides] = useState([
    {
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1920&h=1080&fit=crop',
      author: 'LUNDEV',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
    },
    {
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&h=1080&fit=crop',
      author: 'LUNDEV',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
    },
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      author: 'LUNDEV',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
    },
    {
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
      author: 'LUNDEV',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?'
    }
  ]);

  const [animationType, setAnimationType] = useState('');
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);

  const showSlider = (type) => {
    setAnimationType(type);
    
    if (type === 'next') {
      setSlides(prev => {
        const newSlides = [...prev];
        const first = newSlides.shift();
        newSlides.push(first);
        return newSlides;
      });
    } else {
      setSlides(prev => {
        const newSlides = [...prev];
        const last = newSlides.pop();
        newSlides.unshift(last);
        return newSlides;
      });
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimationType('');
    }, 3000);

    clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => {
      showSlider('next');
    }, 7000);
  };

  useEffect(() => {
    autoNextRef.current = setTimeout(() => {
      showSlider('next');
    }, 7000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(autoNextRef.current);
    };
  }, []);

  return (
    <div className="bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

      {/* Carousel */}
      <div className={`relative overflow-hidden`} style={{ height: '100vh', marginTop: '-50px', width: '100vw' }}>
        {/* List Items */}
        <div className="relative w-full h-screen">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full`}
              style={{ zIndex: index === 0 ? 1 : index === 1 && animationType === 'prev' ? 2 : 0 }}
            >
              {/* Image with animation */}
              {index === 0 && animationType === 'next' ? (
                <motion.img 
                  src={slide.image} 
                  alt="" 
                  className="object-cover"
                  style={{ position: 'absolute' }}
                  initial={{ 
                    width: '150px', 
                    height: '220px', 
                    bottom: '50px', 
                    left: '50%',
                    borderRadius: '30px'
                  }}
                  animate={{ 
                    width: '100%', 
                    height: '100%', 
                    bottom: '0', 
                    left: '0',
                    borderRadius: '0px'
                  }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                />
              ) : index === 1 && animationType === 'prev' ? (
                <motion.img 
                  src={slide.image} 
                  alt="" 
                  className="object-cover"
                  style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 100 }}
                  initial={{ 
                    width: '100%', 
                    height: '100%', 
                    bottom: '0', 
                    left: '0',
                    borderRadius: '0px'
                  }}
                  animate={{ 
                    width: '150px', 
                    height: '220px', 
                    bottom: '50px', 
                    left: '50%',
                    borderRadius: '20px'
                  }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                />
              ) : (
                <img 
                  src={slide.image} 
                  alt="" 
                  className="w-full h-full object-cover"
                  style={{ zIndex: animationType === 'prev' ? 100 : 'auto' }}
                />
              )}
              
              {/* Content - First item always shows animated content */}
              {index === 0 && (
                <div className="absolute" style={{ top: '20%', width: '1140px', left: '20%', transform: 'translateX(-20%)', paddingRight: '30%', boxSizing: 'border-box', color: '#fff', textShadow: '0 5px 10px rgba(0,0,0,0.27)' }}>
                  <motion.div 
                    className="font-bold" 
                    style={{ letterSpacing: '10px' }}
                    initial={{ y: 50, filter: 'blur(20px)', opacity: 0 }}
                    animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1, ease: 'linear' }}
                  >
                    {slide.author}
                  </motion.div>
                  <motion.div 
                    className="font-bold" 
                    style={{ fontSize: '5em', lineHeight: '1.3em' }}
                    initial={{ y: 50, filter: 'blur(20px)', opacity: 0 }}
                    animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2, ease: 'linear' }}
                  >
                    {slide.title}
                  </motion.div>
                  <motion.div 
                    className="font-bold" 
                    style={{ fontSize: '5em', lineHeight: '1.3em', color: '#f1683a' }}
                    initial={{ y: 50, filter: 'blur(20px)', opacity: 0 }}
                    animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4, ease: 'linear' }}
                  >
                    {slide.topic}
                  </motion.div>
                  <motion.div 
                    style={{ marginTop: '8px' }}
                    initial={{ y: 50, filter: 'blur(20px)', opacity: 0 }}
                    animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.6, ease: 'linear' }}
                  >
                    {slide.description}
                  </motion.div>
                  <motion.div 
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 130px)', gridTemplateRows: '40px', gap: '5px', marginTop: '20px' }}
                    initial={{ y: 50, filter: 'blur(20px)', opacity: 0 }}
                    animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8, ease: 'linear' }}
                  >
                    <button style={{ border: 'none', backgroundColor: '#eee', letterSpacing: '3px', fontFamily: 'Poppins', fontWeight: '500' }}>SEE MORE</button>
                    <button style={{ backgroundColor: 'transparent', border: '1px solid #fff', color: '#eee', letterSpacing: '3px', fontFamily: 'Poppins', fontWeight: '500' }}>SUBSCRIBE</button>
                  </motion.div>
                </div>
              )}

              {/* Content animation out for second item during prev */}
              {index === 1 && animationType === 'prev' && (
                <div className="absolute" style={{ top: '20%', width: '1140px', maxWidth: '80%', left: '50%', transform: 'translateX(-50%)', paddingRight: '30%', boxSizing: 'border-box', color: '#fff', textShadow: '0 5px 10px rgba(0,0,0,0.27)' }}>
                  <motion.div 
                    className="font-bold" 
                    style={{ letterSpacing: '10px' }}
                    animate={{ y: -150, filter: 'blur(20px)', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  >
                    {slide.author}
                  </motion.div>
                  <motion.div 
                    className="font-bold" 
                    style={{ fontSize: '5em', lineHeight: '1.3em' }}
                    animate={{ y: -150, filter: 'blur(20px)', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  >
                    {slide.title}
                  </motion.div>
                  <motion.div 
                    className="font-bold" 
                    style={{ fontSize: '5em', lineHeight: '1.3em', color: '#f1683a' }}
                    animate={{ y: -150, filter: 'blur(20px)', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  >
                    {slide.topic}
                  </motion.div>
                  <motion.div 
                    style={{ marginTop: '8px' }}
                    animate={{ y: -150, filter: 'blur(20px)', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  >
                    {slide.description}
                  </motion.div>
                  <motion.div 
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 130px)', gridTemplateRows: '40px', gap: '5px', marginTop: '20px' }}
                    animate={{ y: -150, filter: 'blur(20px)', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  >
                    <button style={{ border: 'none', backgroundColor: '#eee', letterSpacing: '3px', fontFamily: 'Poppins', fontWeight: '500' }}>SEE MORE</button>
                    <button style={{ backgroundColor: 'transparent', border: '1px solid #fff', color: '#eee', letterSpacing: '3px', fontFamily: 'Poppins', fontWeight: '500' }}>SUBSCRIBE</button>
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Thumbnails */}
        <motion.div 
          className="absolute flex z-50" 
          style={{ bottom: '50px', left: '50%', gap: '20px' }}
          initial={{ x: 0 }}
          animate={animationType === 'next' ? { x: [150, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'linear' }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 relative overflow-hidden"
              style={{ height: '220px' }}
              initial={
                (index === 0 && animationType === 'prev') || 
                (index === slides.length - 1 && animationType === 'next')
                  ? { width: 0, opacity: 0 }
                  : { width: 150, opacity: index === 0 && animationType === 'prev' ? 0 : 1 }
              }
              animate={{ width: 150, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'linear' }}
            >
              <img src={slide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
              <div style={{ color: '#fff', position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
                <div style={{ fontWeight: '500' }}>Name Slider</div>
                <div style={{ fontWeight: '300' }}>Description</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrows */}
        <div className="absolute flex z-50" style={{ top: '80%', right: '52%', width: '300px', maxWidth: '30%', gap: '10px', alignItems: 'center' }}>
          <motion.button
            onClick={() => showSlider('prev')}
            style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(238, 238, 238, 0.27)',
              border: 'none',
              color: '#fff',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              pointerEvents: animationType ? 'none' : 'auto'
            }}
            whileHover={{ backgroundColor: '#fff', color: '#000' }}
            transition={{ duration: 0.5 }}
          >
            &lt;
          </motion.button>
          <motion.button
            onClick={() => showSlider('next')}
            style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(238, 238, 238, 0.27)',
              border: 'none',
              color: '#fff',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              pointerEvents: animationType ? 'none' : 'auto'
            }}
            whileHover={{ backgroundColor: '#fff', color: '#000' }}
            transition={{ duration: 0.5 }}
          >
            &gt;
          </motion.button>
        </div>

        {/* Time Bar */}
        {animationType && (
          <motion.div 
            key={`${animationType}-${Date.now()}`}
            style={{ position: 'absolute', zIndex: 1000, height: '3px', backgroundColor: '#f1683a', left: 0, top: 0 }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;