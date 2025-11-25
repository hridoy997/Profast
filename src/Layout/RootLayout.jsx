import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='Home'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;