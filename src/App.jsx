import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("Expiration"));
    if (values) {
      const checkTime = Number(new Date().getTime()) - Number(values.date);
      if (checkTime > 3600000) {
        localStorage.removeItem("Products");
      }
      console.log(checkTime);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
