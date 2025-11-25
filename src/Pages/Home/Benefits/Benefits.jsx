import BenefitCard from "./BenefitCard";

import tracking from "../../../assets/live-tracking.png";
import safe from "../../../assets/safe-delivery.png";
import support from "../../../assets/safe-delivery.png";

const Benefits = () => {


    const benefits = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: tracking,
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: safe,
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: support,
        },
    ];


    return (
        <section className="max-w-6xl mx-auto">
            {/* Dotted horizontal line */}
            <div className="border-t-2 border-dotted border-gray-300 w-full my-4 md:my-0"></div>

            <div className="py-16">
                {/* <div className="max-w-7xl mx-auto px-4 space-y-6"> */}
                <div className="mx-auto space-y-6">

                    {/* Page Section Heading (optional) */}
                    {/* <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                        Key Benefits
                    </h2>
                    <p className="text-base text-base-content/70 mt-2">
                        Features designed to make your delivery experience seamless.
                    </p>
                </div> */}

                    {/* Benefit Cards */}
                    <div className="space-y-6">
                        {benefits.map((item) => (
                            <BenefitCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {/* Dotted horizontal line */}
            <div className="border-t-2 border-dotted border-gray-300 w-full my-4 md:my-0"></div>
        </section>
    );
};

export default Benefits;
