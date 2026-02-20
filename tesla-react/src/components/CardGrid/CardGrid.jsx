import VehicleCard from '../VehicleCard/VehicleCard';

export default function CardGrid({ cards, onOrderClick, onLearnClick }) {
    return (
        <section className="grid-layout">
            {cards.map((card) => (
                <VehicleCard
                    key={card.id}
                    card={card}
                    onOrderClick={() => onOrderClick(card.id)}
                    onLearnClick={() => onLearnClick(card.id)}
                />
            ))}
        </section>
    );
}
