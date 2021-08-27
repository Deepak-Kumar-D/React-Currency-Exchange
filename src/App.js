import "./App.css";
import { CgMenuRight } from "react-icons/cg";
import { Switch, Route, Link } from "react-router-dom";
import All from "./components/All";
import CConverter from "./components/CConverter";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="main">
      <img className="bg-img" src="/images/bg.jpg" alt="Bg-img" />
      <header className="header">
        <Link to="/" onClick={() => setMenu(false)}>
          <div className="header-logo">
            <img className="img-icon" src="favicon.ico" alt="img-icon" />
            <h2>Currency Exchange</h2>
          </div>
        </Link>

        <div
          className={menu ? "btn-links open" : "btn-links close"}
          onClick={() => setMenu(false)}
        >
          <Link to="/all">
            <h5>All Currency Rates</h5>
          </Link>

          <Link to="/currencyconverter">
            <h5>Currency Converter</h5>
          </Link>
        </div>

        <CgMenuRight className="menu" onClick={() => setMenu(!menu)} />
      </header>

      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route path="/all">
          <All />
        </Route>

        <Route path="/currencyconverter">
          <CConverter />
        </Route>
      </Switch>

      {/* Footer of the page */}
      <section className="footer">
        <p>Copyright © Currency Exchange 2021</p>
      </section>
    </div>
  );
}

export default App;
