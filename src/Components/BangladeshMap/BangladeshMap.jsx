import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// Fix leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

const position = [23.685, 90.3563];

// coustom icon 
const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// helper conponent to move map 
const FlyToDistrict = ({ coords }) => {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 12, {
            duration: 1.5
        });
    }
    return null;
}


const BangladeshMap = ({ districts = [] }) => {


    const [searchText, setSearchText] = useState("");
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = districts.find(d => d.district.toLowerCase().includes(searchText.toLowerCase()));
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div className="rounded-xl overflow-hidden">
            {/* Search Bar */}
            <div className="w-1/2">
                <form onSubmit={handleSearch} className="mb-4 flex flex-col sm:flex-row gap-3 p-2">
                    <input
                        type="text"
                        placeholder="Search district..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button
                        type="submit"
                        className="btn bg-lime-400 hover:bg-lime-500 text-black"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Map */}
            <div className="w-full h-96">
                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className="h-full w-full z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    <FlyToDistrict coords={activeCoords} />

                    {districts
                        .filter((d) => d.status === "active" && d.latitude && d.longitude)
                        .map((district, index) => (
                            <Marker
                                key={index}
                                position={[district.latitude, district.longitude]}
                                icon={customIcon}
                            >
                                <Popup autoOpen={district.district === activeDistrict}>
                                    <div className="font-semibold">{district.district}</div>
                                    <div className="text-sm opacity-80">Region: {district.region}</div>
                                    <div className="text-sm mt-1">
                                        <span className="font-semibold">Covered Areas:</span>{" "}
                                        {Array.isArray(district.covered_area)
                                            ? district.covered_area.join(", ")
                                            : "N/A"}
                                    </div>
                                    <div className="text-sm mt-1">
                                        <span className="font-semibold">Status:</span> {district.status}
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default BangladeshMap;