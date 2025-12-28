import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import ProfastLogo from '../Pages/Shared/ProFastLogo/ProfastLogo.jsx';

const AuthLayout = () => {
    return (
        <div className="px-12 py-4 bg-base-200">
            <ProfastLogo />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src={authImg}
                        className="max-w-4xl rounded-lg shadow"
                    />
                </div >
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;