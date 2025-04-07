import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaTimes } from 'react-icons/fa';

const StudentGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbhttps://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 1'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 2'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 3'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 4'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 5'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 6'
        },
        {
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D',
        alt: 'Student Gallery Image 7'
        },
        {
        src: '/images/gallery/8.jpg',
        alt: 'Student Gallery Image 8'
        },
        {
        src: '/images/gallery/9.jpg',
        alt: 'Student Gallery Image 9'
        },
        {
        src: '/images/gallery/10.jpg',
        alt: 'Student Gallery Image 10'
        },
        {
        src: '/images/gallery/11.jpg',
        alt: 'Student Gallery Image 11'
        },
    ]

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="gallery"
            className="bg-white rounded-xl shadow-md p-6"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-amber-500 rounded-full"></span>
                Student Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative rounded-xl overflow-hidden"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => setSelectedImage(image)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity opacity-0 hover:opacity-100"
                        >
                            <FaCamera className="text-white text-3xl" />
                        </button>
                    </motion.div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white text-2xl"
                    >
                        <FaTimes />
                    </button>
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        className="max-w-full max-h-full"
                    />
                </div>
            )}
        </motion.section>
    );
}


export default StudentGallery;