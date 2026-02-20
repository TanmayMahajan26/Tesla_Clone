export default function ThemeToggle({ theme, onToggle }) {
    return (
        <button
            className="theme-toggle-btn"
            onClick={onToggle}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
