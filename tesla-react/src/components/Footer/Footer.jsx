export default function Footer({ links }) {
    return (
        <footer className="site-footer">
            <ul className="footer-links">
                {links.map((link, i) => (
                    <li key={i}>
                        <a href="#" onClick={(e) => e.preventDefault()}>{link}</a>
                    </li>
                ))}
            </ul>
        </footer>
    );
}
