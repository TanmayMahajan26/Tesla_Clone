

export default function StickyBar({ onScheduleClick, onQuestionClick }) {
    return (
        <div className="sticky-bar">
            <button className="sticky-btn left" onClick={onQuestionClick}>
                <span className="icon">?</span>
                <span className="text">Ask a Question</span>
            </button>
            <button className="sticky-btn right" onClick={onScheduleClick}>
                <span className="icon">📅</span>
                <span className="text">Schedule a Drive Today</span>
            </button>
        </div>
    );
}
