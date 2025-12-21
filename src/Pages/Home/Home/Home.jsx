import Banner from '../Banner/Banner';
import BeMerchant from '../BeMerchant/BeMerchant';
import Benefits from '../Benefits/Benefits';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Services from '../Services/Services';


const Home = () => {
    return (
        <div>

            <Banner />
            <Services />
            <ClientLogosMarquee />
            <Benefits />
            <BeMerchant />

        </div>
    );
};

export default Home;