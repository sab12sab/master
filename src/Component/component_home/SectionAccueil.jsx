import { useState, useEffect } from 'react';

export default function SectionAccueil() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Tableau des images du carrousel
    const images = [
        "photos/golden_spark/acc/Jewellery Photography For Abbott Lyon.jpg",
        "photos/golden_spark/acc/téléchargement (5).jpg",
        "/golden_spark/chunky_bracelet/1.jpg",
        "/golden_spark/boite/1.jpg",    ];
    
    // Fonction pour passer à la diapositive suivante
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 5000); // Change d'image toutes les 5 secondes
        
        return () => clearInterval(interval);
    }, [images.length]);
    
    return (
        <section className="relative h-screen w-full overflow-hidden ">
            {/* Carrousel de 4 photos */}
            {images.map((images, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={images}
                        alt={`Golden Spark Joaillerie ${index + 1}`}
                        className="w-full h-full object-cover"
                        
                    />
                </div>
            ))}
            
            {/* Indicateurs de diapositive */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                        }`}
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                ))}
            </div>
            
            {/* Overlay avec texte */}
<div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold text-center mb-6">
        Golden Spark
    </h1>
    <p className="text-xl sm:text-2xl text-white text-center mb-8 max-w-3xl">
        Découvrez notre collection unique de bijoux artisanaux
    </p>
    <button 
        onClick={() => {
            // Redirection vers la page produit
            window.location.href = "/produit";
            // Alternative avec React Router:
            // navigate("/produit");
        }}
        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
        Découvrir
    </button>
</div>
        </section>
    );
}