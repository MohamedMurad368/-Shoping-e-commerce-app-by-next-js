'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import image1 from '../../../public/61MYDrpYriL._AC_SL1500_.jpg'
import image2 from '../../../public/71qqMqtGnrL._AC_SL1500_.jpg'
import image3 from '../../../public/71r1LDErYwS._AC_SL1500_.jpg'

const CarouselPage = () => {
  const images = [image1, image2, image3]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-full h-4/5 relative">
      <div className="w-full h-full mx-auto relative">
        <div className="carousel-container w-full h-full relative flex overflow-hidden rounded-xl shadow-xl">
          {/* Carousel Item */}
          <div className="carousel-item flex-shrink-0 w-full h-full relative">
            <div className="w-full h-full flex justify-center items-center p-4">
              {/* Image with adjusted size and fit */}
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                width={400}  // Adjust width to make image smaller
                height={300} // Adjust height to maintain aspect ratio
                className="rounded-xl" 
                style={{ objectFit: 'contain' }} 
              />
            </div>

            {/* Title and Button (Positioned at the bottom) */}
            <div className="absolute bottom-10 left-0 right-0 p-6 bg-white bg-opacity-20 rounded-b-xl text-center">
              <h2 className="text-3xl font-semibold mb-4 text-dark drop-shadow-lg">
                Title {currentIndex + 1}
              </h2>
              <button className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all ease-in-out duration-300">
                Go to Page
              </button>
            </div>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-4 bg-black bg-opacity-50 rounded-full hover:bg-black"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-4 bg-black bg-opacity-50 rounded-full hover:bg-black"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 bg-black rounded-full cursor-pointer transition-all ease-in-out duration-300 ${
                currentIndex === index ? 'bg-opacity-75' : 'bg-opacity-50'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarouselPage
