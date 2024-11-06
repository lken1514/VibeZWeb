import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import AdminHeader from '../components/AdminHeader';
import AdminDisplayHome from '../components/AdminDisplayHome';
import Navbar from '../components/Navbar2';
import { Outlet } from 'react-router-dom';
const AdminDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row">
                <SidebarAdmin/>
                <div className="flex-1">
                    <AdminHeader/>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
