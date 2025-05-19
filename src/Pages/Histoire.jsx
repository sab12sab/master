import React from 'react';
import Section_Histoire from '@/Component/component_histoire/Section_Histoire';
import Navbar from '@/Component/component_home/Navbar';
import Footer from '@/Component/component_home/Footer';

export default function Histoire() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-1 after:bg-yellow-500">
                    Notre Histoire
                </h1>
                <Section_Histoire />
            </div>
            <Footer />
        </>
    );
}