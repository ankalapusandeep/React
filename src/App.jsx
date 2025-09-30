import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Veg from "./Veg.jsx";
import Nonveg from "./Nonveg.jsx";
import NotFound from "./NotFound.jsx";
import "./App.css";
import { useSelector } from "react-redux";
import Cart from "./Cart.jsx";
import { ToastContainer } from "react-toastify";
import Orders from "./Orders.jsx";
import PaymentPage from "./PaymentPage.jsx";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const totalQuantity = useSelector((state) =>
    state.Cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalQuantity > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        {/* ✅ Navbar */} 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand fw-bold text-warning">
                  Hayam.. 
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">

                
                
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                    🏠 Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/aboutus"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                    AboutUs 
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink
                    to="/contactus"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                     ContactUs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/veg"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                    🥗 Veg 
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink
                    to="/nonveg"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                    🍗 Non-veg 
                  </NavLink>
                </li>
                

                {/* ✅ Cart with info icon tooltip + bounce */}
<li className="nav-item">
  <NavLink
    to="/cart"
    className={({ isActive }) =>
      `nav-link cart-link ${isActive ? "text-warning fw-bold" : ""}`
    }
                  >
                    🛒 Cart ({totalQuantity})
                    {totalQuantity > 0 && (
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id="cart-tooltip">View items in your cart</Tooltip>}
  >
    <span className={`info-icon ms-1 ${animate ? "bounce" : ""}`}>
      ℹ️
    </span>
  </OverlayTrigger>
)}

                  </NavLink>
                </li>

               

                <li className="nav-item">
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                    📦 Orders
                  </NavLink>

                    

                </li>

                 <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                    }
                  >
                   🔑 Login
                  </NavLink>
                </li>

                    <li className="nav-item">
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "text-warning fw-bold" : ""}`
                        }
                      >
                        📝 SignUp
                      </NavLink>
                    </li>

              </ul>
            </div>
          </div>
        </nav>

        {/* Page Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/veg" element={<Veg />} />
            <Route path="/nonveg" element={<Nonveg />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/*" element={<NotFound />} />
            
          </Routes>

                   
  

      </BrowserRouter>
    </>
  );
}

export default App;
