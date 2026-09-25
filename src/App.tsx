import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import CleaningDemo from "./pages/demos/CleaningDemo";
import FashionDemo from "./pages/demos/FashionDemo";
import RealEstateDemo from "./pages/demos/RealEstateDemo";
import { Link } from "react-router-dom";

function NotFound() {
  return <main className="not-found"><span>404</span><h1>That page isn’t here.</h1><p>The demo may have moved, or the address may be incomplete.</p><Link className="button button-primary" to="/">Return home</Link></main>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/demos/cleaning" element={<CleaningDemo />} />
      <Route path="/demos/fashion" element={<FashionDemo />} />
      <Route path="/demos/real-estate" element={<RealEstateDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
