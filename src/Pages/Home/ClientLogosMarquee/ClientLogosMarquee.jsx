import Marquee from "react-fast-marquee";
import client1 from "../../../assets/brands/amazon.png";
import client2 from "../../../assets/brands/amazon_vector.png";
import client3 from "../../../assets/brands/casio.png";
import client4 from "../../../assets/brands/moonstar.png";
import client5 from "../../../assets/brands/randstad.png";
import client6 from "../../../assets/brands/star.png";
import client7 from "../../../assets/brands/start_people.png";


const logos = [client1, client2, client3, client4, client5, client6, client7];

const ClientLogosMarquee = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto">

                {/* Section heading */}
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-2xl font-bold text-base-content">
                        We've helped thousands of sales teams
                    </h2>
                    {/* <p className="text-sm md:text-base text-base-content/70">
                        Companies relying on our delivery and logistics services.
                    </p> */}
                </div>

                {/* Marquee slider */}
                <Marquee className="gap-24"
                    gradient={false}   // disable gradient
                    speed={40}         // adjust speed
                    pauseOnHover={true}
                >
                    <div className="flex items-center gap-24">
                        {logos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt={`Client ${index + 1}`}
                                className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition"
                            />
                        ))}
                    </div>
                </Marquee>

            </div>
        </section>
    );
};

export default ClientLogosMarquee;
