import Logo from '../../../assets/logo.png';

const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={Logo} alt="Profast Logo" />
            <p className='text-3xl -ml-2 font-extrabold'>Profast</p>
        </div>
    );
};

export default ProfastLogo;