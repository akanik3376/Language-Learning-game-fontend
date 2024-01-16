
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Main = () => {
    return (
        <div className='container mx-auto px-4 md:px-0'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
