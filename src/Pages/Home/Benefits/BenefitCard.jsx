const BenefitCard = ({ image, title, description }) => {
    return (
        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border flex items-center gap-6 hover:shadow-md transition duration-300">

            {/* Left: Image */}
            <div className="w-36 flex-shrink-0">
                <img src={image} alt={title} className="w-full object-contain" />
            </div>

            {/* Dotted vertical line */}
            <div className="border-l-2 border-dotted border-gray-300 h-24"></div>

            {/* Right: Title + Description */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-base-content mb-2">
                    {title}
                </h3>

                <p className="text-base text-base-content/70 leading-relaxed">
                    {description}
                </p>
            </div>

        </div>
    );
};

export default BenefitCard;
