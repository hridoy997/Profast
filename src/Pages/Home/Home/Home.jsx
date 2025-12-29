import Banner from '../Banner/Banner';
import BeMerchant from '../BeMerchant/BeMerchant';
import Benefits from '../Benefits/Benefits';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import FAQ from '../FAQ/FAQ';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import HowItWorks from '../Works/HowItWorks';


const Home = () => {
    return (
        <div>

            <Banner />
            <HowItWorks />
            <Services />
            <ClientLogosMarquee />
            <Benefits />
            <BeMerchant />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;