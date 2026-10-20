import { Link } from "react-router-dom";
const NotFound = () => (
  <main className="store-shell empty-results" style={{ minHeight: "100vh" }}>
    <span className="eyebrow">404 / CONNECTION LOST</span>
    <h1>This page is off the grid.</h1>
    <p>Let’s get you back to a better connection.</p>
    <Link to="/" className="store-button dark-button">
      Back to Phonehaus
    </Link>
  </main>
);
export default NotFound;
