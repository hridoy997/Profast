import Banner from '../Banner/Banner';
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
            

        </div>
    );
};

export default Home;