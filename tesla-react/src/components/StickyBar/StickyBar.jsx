import { useState } from 'react';

export default function StickyBar() {
    const [activePopup, setActivePopup] = useState(null);

    const handleAskQuestion = () => {
        setActivePopup('ask');
    };

    const handleScheduleDrive = () => {
        setActivePopup('drive');
    };

    return (
        <>
            <div className="sticky-bar">
                <button className="sticky-btn" onClick={handleAskQuestion}>
                    <span className="icon-chat">💬</span> Ask a Question
                </button>
                <button className="sticky-btn" onClick={handleScheduleDrive}>
                    <span className="icon-drive">⎋</span> Schedule a Drive Today
                </button>
            </div>

            {/* Message Popups - conditional rendering */}
            {activePopup === 'ask' && (
                <div className="message-popup-overlay" onClick={() => setActivePopup(null)}>
                    <div className="message-popup" onClick={(e) => e.stopPropagation()}>
                        <h3>💬 Ask a Question</h3>
                        <p>Button clicked! A Tesla Advisor will be with you shortly.</p>
                        <button onClick={() => setActivePopup(null)}>OK</button>
                    </div>
                </div>
            )}

            {activePopup === 'drive' && (
                <div className="message-popup-overlay" onClick={() => setActivePopup(null)}>
                    <div className="message-popup" onClick={(e) => e.stopPropagation()}>
                        <h3>🚗 Schedule a Drive</h3>
                        <p>Button clicked! Redirecting to scheduling page...</p>
                        <button onClick={() => setActivePopup(null)}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}
