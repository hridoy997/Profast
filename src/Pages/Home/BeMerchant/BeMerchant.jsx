import locationMerchant from '../../../assets/location-merchant.png';


const BeMerchant = () => {
    return (
        <div data-aos="fade-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] text-white rounded-2xl md:rounded-3xl lg:rounded-4xl p-6 md:p-12 lg:p-20 my-10 md:my-15 lg:my-20">
            <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                <img
                    src={locationMerchant}
                    className="max-w-xs md:max-w-sm rounded-lg w-full"
                />
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-4 md:py-6 text-sm md:text-base">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn btn-primary rounded-full text-black">Become a Merchant</button>
                        <button className="btn btn-primary rounded-full btn-outline text-primary hover:text-black">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;