import { useLoaderData } from "react-router";
import BangladeshMap from "../../Components/BangladeshMap/BangladeshMap";

const Coverage = () => {

    const districts = useLoaderData();
    // console.log(districts);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Card Container */}
            <div className="bg-base-100 border border-gray-100 rounded-2xl shadow-lg p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                    We are available in 64 districts
                </h1>

                {/* Search */}
                {/* <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="input input-bordered w-full"
                    />
                    <button className="btn bg-lime-400 hover:bg-lime-500 text-black">
                        Search
                    </button>
                </div> */}

                {/* Subtitle */}
                <h2 className="mt-10 text-lg font-semibold">
                    We deliver almost all over Bangladesh
                </h2>

                {/* Map */}
                <div className="mt-4">
                    <BangladeshMap height={320} zoom={7} districts={districts} />
                </div>
            </div>
        </div>
    );
};

export default Coverage;