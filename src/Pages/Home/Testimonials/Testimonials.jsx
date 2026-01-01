import { useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopIllustration from '../../../assets/customer-top.png';

const testimonials = [
    {
        name: "Awlad Hossin",
        role: "Senior Product Designer",
        text:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Rasel Ahamed",
        role: "CTO",
        text:
            "Fast pickup and smooth delivery. The tracking updates were reliable and the rider was professional. Highly recommended for regular shipments.",
    },
    {
        name: "Nasir Uddin",
        role: "CEO",
        text:
            "Great service quality and on-time delivery. Customer support was quick and helpful. This is a solid solution for business deliveries.",
    },
    {
        name: "Mehedi Hasan",
        role: "SME Owner",
        text:
            "Cash on delivery was handled perfectly. Settlements were fast and the overall process felt very organized for my business needs.",
    },
];

const TestimonialCard = ({ item, active }) => {
    return (
        <div
            className={[
                "mx-auto rounded-2xl bg-base-100 shadow-md",
                "p-6 md:p-8 text-left",
                active ? "opacity-100 scale-100" : "opacity-25 scale-95",
                "transition-all duration-300",
                "max-w-xl",
            ].join(" ")}
        >
            <div className="text-4xl leading-none text-primary/30 font-bold">“</div>

            <p className="mt-3 text-sm md:text-base text-base-content/70 leading-relaxed">
                {item.text}
            </p>

            <div className="mt-5 border-t border-dashed border-base-300 pt-4 flex items-center gap-3">
                <div className="avatar">

                    <div className="w-10 rounded-full bg-primary/40" />
                </div>

                <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-base-content/60">{item.role}</p>
                </div>
            </div>
        </div>
    );
};

export default function Testimonials() {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-16">
            <div className="mx-auto px-4">

                <div className="flex justify-center mb-4">
                    <img
                        src={TopIllustration}
                        alt="Customer illustration"
                        className="h-14 md:h-16 object-contain"
                    />
                </div>

                <h2 className="text-center text-2xl md:text-3xl font-bold">
                    What our customers are sayings
                </h2>

                <p className="text-center text-sm md:text-base text-base-content/60 max-w-2xl mx-auto mt-3">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <div className="mt-10 relative">
                    {/* Carousel */}
                    <Carousel
                        ref={carouselRef}
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={true}
                        showArrows={false} // we'll use custom arrows like screenshot
                        centerMode={true}
                        centerSlidePercentage={70}
                        infiniteLoop={true}
                        autoPlay={true}
                        emulateTouch={true}
                        swipeable={true}
                        onChange={(i) => setActiveIndex(i)}
                        selectedItem={activeIndex}
                    >
                        {testimonials.map((t, i) => (
                            <div key={i} className="py-6">
                                <TestimonialCard item={t} active={i === activeIndex} />
                            </div>
                        ))}
                    </Carousel>

                    {/* Bottom controls (arrows + dots like screenshot) */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            type="button"
                            className="btn btn-circle btn-outline"
                            onClick={() => carouselRef.current?.decrement?.()}
                            aria-label="Previous"
                        >
                            ❮
                        </button>

                        {/* dots are already shown by carousel; this area matches screenshot spacing */}
                        <div className="hidden md:block w-2" />

                        <button
                            type="button"
                            className="btn btn-circle bg-primary/80 hover:bg-primary text-black border-none"
                            onClick={() => carouselRef.current?.increment?.()}
                            aria-label="Next"
                        >
                            ❯
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
