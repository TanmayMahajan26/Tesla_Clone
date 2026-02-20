import VehicleCard from '../VehicleCard/VehicleCard';

export default function CardGrid({ cards, onOrderClick }) {
    return (
        <div className="grid-layout" id="vehicles-grid">
            {cards.map((card) => (
                <VehicleCard key={card.id} card={card} onOrderClick={onOrderClick} />
            ))}
        </div>
    );
}
