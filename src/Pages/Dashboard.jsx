import React from 'react';
import Dashboard from '@/Component/component_admin/Dashboard';
import Footer from '@/Component/component_home/Footer';
import { Import } from 'lucide-vue-next';
import AdminNav from '@/Component/component_admin/AdminNav';

// Renommons la fonction principale en DashboardPage au lieu de Dashboard
export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AdminNav></AdminNav>
            <Dashboard></Dashboard>
            <Footer></Footer>
        </div>
    );
}