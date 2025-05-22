import React from 'react';
import Footer from '@/Component/component_home/Footer';
import { Import } from 'lucide-vue-next';
import AdminNav from '@/Component/component_admin/AdminNav';
import CommandeSection from '@/Component/component_commande/CommandeSection';

// Renommons la fonction principale en DashboardPage au lieu de Dashboard
export default function Commande() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AdminNav></AdminNav>
            <CommandeSection></CommandeSection>
            <Footer></Footer>
        </div>
    );
}