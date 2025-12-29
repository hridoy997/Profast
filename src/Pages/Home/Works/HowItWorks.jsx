import {
    FaMapMarkedAlt,
    FaTruck,
    FaWarehouse,
    FaBriefcase,
} from "react-icons/fa";

const steps = [
    {
        title: "Booking Pick & Drop",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
        icon: FaMapMarkedAlt,
    },
    {
        title: "Cash On Delivery",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
        icon: FaTruck,
    },
    {
        title: "Delivery Hub",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
        icon: FaWarehouse,
    },
    {
        title: "Booking SME & Corporate",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
        icon: FaBriefcase,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-14">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="w-12 h-12 rounded-lg bg-lime-100 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-lime-600" />
                                </div>

                                <h3 className="font-semibold text-base mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-sm text-base-content/70">
                                    {step.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
