import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Première colonne - Service Client */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Service Client</h3>
            
            <div className="flex items-center mb-4">
              <FaPhone className="mr-2" />
              <p>Appelez-nous : 0621803875</p>
            </div>
            
            <p className="mb-4">De 10h00 à 18h00 du lundi au vendredi et le samedi de 10h00 à 13h00 hors jours fériés.</p>
            
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a href="mailto:contact@goldenspark.com" className="hover:text-gold transition-colors duration-300">
                Envoyez-nous un e-mail
              </a>
            </div>
          </div>
          
          {/* Deuxième colonne - Liens Utiles */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Liens Utiles</h3>
            
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="hover:text-gold transition-colors duration-300">FAQ</a>
              </li>
              <li>
                <a href="/guide-des-tailles" className="hover:text-gold transition-colors duration-300">Guide des tailles</a>
              </li>
              <li>
                <a href="/conditions-generales" className="hover:text-gold transition-colors duration-300">Conditions générales de ventes</a>
              </li>
              <li>
                <a href="/mentions-legales" className="hover:text-gold transition-colors duration-300">Mentions légales</a>
              </li>
            </ul>
          </div>
          
          {/* Troisième colonne - Réseaux Sociaux */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Suivez Golden Spark</h3>
            
            <div className="flex flex-col space-y-4">
              <a href="https://www.instagram.com/_golden.spark_/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gold transition-colors duration-300">
                <FaInstagram className="mr-3 text-2xl" />
                <span>Notre page Instagram</span>
              </a>
              
              <a href="https://facebook.com/goldenspark" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gold transition-colors duration-300">
                <FaFacebook className="mr-3 text-2xl" />
                <span>Notre page Facebook</span>
              </a>
              
              <a href="https://tiktok.com/@goldenspark" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gold transition-colors duration-300">
                <FaTiktok className="mr-3 text-2xl" />
                <span>Notre TikTok</span>
              </a>
              
              <a href="https://goldenspark.com" className="hover:text-gold transition-colors duration-300 mt-4">
                www.goldenspark.com
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Golden Spark Joaillerie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}