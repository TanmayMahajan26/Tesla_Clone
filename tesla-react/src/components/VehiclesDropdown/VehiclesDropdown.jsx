import { vehiclesDropdownData } from '../../data/vehiclesDropdownData';

export default function VehiclesDropdown({ isOpen, onClose }) {
    return (
        <div className={`vehicles-dropdown ${isOpen ? 'visible' : ''}`}>
            <div className="dropdown-content">
                {vehiclesDropdownData.map((vehicle) => (
                    <div className="vehicle-item" key={vehicle.name}>
                        <img src={vehicle.image} alt={vehicle.name} />
                        <h3>{vehicle.name}</h3>
                        <div className="links">
                            <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Learn</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Order</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
