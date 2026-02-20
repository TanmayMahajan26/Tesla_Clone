export default function VehicleCard({ card, onOrderClick }) {
    const {
        title,
        tag,
        description,
        subtitle,
        image,
        textColor,
        bgColor,
        bgSize,
        bgPosition,
        bgRepeat,
        fullWidth,
        sectionId,
        contentPosition,
        buttons
    } = card;

    const textClass = textColor === 'white' ? 'text-white' : 'text-black';
    const isFsd = contentPosition === 'centered-bottom';

    const cardStyle = {
        backgroundImage: `url('${image}')`,
        ...(bgColor && { backgroundColor: bgColor }),
        ...(bgSize && { backgroundSize: bgSize }),
        ...(bgPosition && { backgroundPosition: bgPosition }),
        ...(bgRepeat && { backgroundRepeat: bgRepeat }),
    };

    const cardClasses = [
        'card',
        fullWidth && 'full-width',
        isFsd && 'fsd-card',
        bgColor && 'bg-gray'
    ].filter(Boolean).join(' ');

    const contentClasses = isFsd ? 'card-content centered fsd-content' : 'card-content top-left';

    const getButtonClass = (style) => {
        const map = {
            'primary': 'btn btn-primary',
            'white': 'btn btn-white',
            'primary-small': 'btn btn-primary-small',
            'white-small': 'btn btn-white-small',
            'white-outline': 'btn btn-white-outline'
        };
        return map[style] || 'btn';
    };

    const handleButtonClick = (e, action) => {
        e.preventDefault();
        if (action === 'order') {
            onOrderClick();
        }
    };

    return (
        <div className={cardClasses} style={cardStyle} id={sectionId || undefined}>
            <div className={contentClasses}>
                {tag && <span className={`card-tag ${textClass}`}>{tag}</span>}
                <h2 className={`card-title ${textClass}`}>{title}</h2>
                {description && <p className={`card-desc ${textClass}`}>{description}</p>}
                {subtitle && <p className={`card-subtitle ${textClass}`}>{subtitle}</p>}
                <div className={`card-buttons ${isFsd ? '' : 'horizontal'}`}>
                    {buttons.map((btn, i) => (
                        <a
                            key={i}
                            href="#"
                            className={getButtonClass(btn.style)}
                            onClick={(e) => handleButtonClick(e, btn.action)}
                        >
                            {btn.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
