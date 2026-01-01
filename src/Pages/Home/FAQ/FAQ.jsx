import { useState } from "react";

const faqs = [
    {
        q: "How does this posture corrector work?",
        a: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. It helps guide your body into better positioning and reduces strain over time.",
    },
    {
        q: "Is it suitable for all ages and body types?",
        a: "Yes, it is designed to fit most body types. If you have a medical condition or severe pain, consult a professional before use.",
    },
    {
        q: "Does it really help with back pain and posture improvement?",
        a: "It can support improved posture and reduce discomfort caused by poor posture. Results vary depending on consistent use and daily habits.",
    },
    {
        q: "Does it have smart features like vibration alerts?",
        a: "Some models include smart sensors and vibration alerts. Check the product specs to confirm available features.",
    },
    {
        q: "How will I be notified when the product is back in stock?",
        a: "You can subscribe with your email/phone. We’ll notify you as soon as the product is available again.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4">
                {/* Title */}
                <h2 className="text-center text-2xl md:text-3xl font-bold">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-center text-sm md:text-base text-base-content/60 max-w-2xl mx-auto mt-3">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                {/* Accordion */}
                <div className="mt-10 space-y-3">
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={idx}
                                className={`collapse collapse-arrow bg-base-100 border ${isOpen ? "border-primary/40" : "border-base-300"
                                    } rounded-xl`}
                            >
                                {/* Use radio to allow single open */}
                                <input
                                    type="radio"
                                    name="faq-accordion"
                                    checked={isOpen}
                                    onChange={() => setOpenIndex(idx)}
                                />
                                <div className="collapse-title font-semibold text-sm md:text-base">
                                    {item.q}
                                </div>
                                <div className="collapse-content text-sm text-base-content/70">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Button */}
                <div className="mt-10 flex justify-center">
                    <button className="btn bg-primary/80 hover:bg-primary text-black border-none">
                        See More FAQ&apos;s
                        <span className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white">
                            ↗
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
