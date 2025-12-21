import locationMerchant from '../../../assets/location-merchant.png';


const BeMerchant = () => {
    return (
        <div data-aos="fade-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] text-white rounded-4xl p-20 my-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={locationMerchant}
                    className="max-w-sm rounded-lg "
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-primary rounded-full text-black">Become a Merchant</button>
                    <button className="btn btn-primary rounded-full btn-outline ms-4 text-primary hover:text-black">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;