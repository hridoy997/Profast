const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
    return (
        <div className="card rounded-2xl border bg-base-100 shadow-md h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#CAEB66]" >
            <div className="card-body items-center">

                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 hover:bg-primary/20">
                    <Icon className="text-3xl text-primary" />
                </div>

                {/* Title */}
                <h3 className="card-title text-base md:text-lg text-base-content mb-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-base-content/70">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
