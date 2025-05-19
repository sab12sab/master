import React from 'react';
import Admin8Projet from '@/Component/component_admin/Admin8Projet';

import Footer from '@/Component/component_home/Footer';
import { Import } from 'lucide-vue-next';
import AdminNav from '@/Component/component_admin/AdminNav';

export default function Admin() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AdminNav></AdminNav>
            <Admin8Projet></Admin8Projet>
            <Footer></Footer>
        </div>
    );
}