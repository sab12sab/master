import React from 'react';

export default function Section_Contact() {
    return (
        <>
            {/* Utilisation de presque toute la largeur disponible */}
            <section className="w-full flex flex-col items-center text-center mb-16">
                <div className="w-11/12 max-w-7xl p-10">
                    <div className="flex justify-center">
                        <img
                            src="photos\contact.png"
                            alt="Contact Golden Spark"
                            className="w-64 h-auto rounded-lg mb-8"
                        />
                    </div>
                    
                    
                    
                    {/* Formulaire très large qui occupe presque toute la largeur disponible */}
                    <form className="w-full mx-auto text-left">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nom
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name" 
                                type="text" 
                                placeholder="Votre nom"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email" 
                                type="email" 
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                                Sujet
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="subject" 
                                type="text" 
                                placeholder="Sujet de votre message"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" 
                                id="message" 
                                placeholder="Votre message"
                                required
                            />
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <button 
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                                type="submit"
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}