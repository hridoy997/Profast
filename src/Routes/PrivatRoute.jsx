import { Navigate } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import UseAuth from '../Hooks/UseAuth';

const PrivatRoute = ({children}) => {

    const {user, loading} = UseAuth();

    if(loading){
        return <LoadingSpinner />;
    }

    if(!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivatRoute;