import React from 'react';
import Section_Contact from '@/Component/component_Contact/Section_Contact';
import Navbar from '@/Component/component_home/Navbar';
import Footer from '@/Component/component_home/Footer';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            <main className="container mx-auto py-12 flex-grow">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact</h1>
                <Section_Contact />             
            </main>
            
            <Footer />
        </div>
    );
}