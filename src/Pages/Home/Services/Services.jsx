import ServiceCard from "./ServiceCard";
import {
    FiZap,
    FiMapPin,
    FiPackage,
    FiDollarSign,
    FiBriefcase,
    FiRefreshCw,
} from "react-icons/fi";

const servicesData = [
    {
        id: 1,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: FiZap,
    },
    {
        id: 2,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: FiMapPin,
    },
    {
        id: 3,
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: FiPackage,
    },
    {
        id: 4,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: FiDollarSign,
    },
    {
        id: 5,
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: FiBriefcase,
    },
    {
        id: 6,
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: FiRefreshCw,
    },
];


const Services = () => {
    return (
        <section id="services" className="py-16">
            <div className="max-w-7xl mx-auto bg-[#013A3A] rounded-3xl text-base-100 px-6 md:px-10 py-12 shadow-lg">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        Our Services
                    </h2>
                    <p className="text-sm md:text-base text-base-100/80">
                        Enjoy fast, reliable parcel delivery with real-time tracking and
                        zero hassle. From personal packages to business shipments — we
                        deliver on time, every time.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;