import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Download from "./pages/Download";
import SelectCountry from "./pages/SelectCountry";
import { useTranslation } from "react-i18next";

function App() {
  const {i18n} = useTranslation()
  const lang:string = navigator.language.split('-')[1].toLocaleLowerCase()
  useEffect(()=>{    
    i18n.changeLanguage(lang)
  },[ i18n,lang])
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={SignIn} />
          <Route path="/Download" Component={Download} />
          <Route path="/SelectCountry" Component={SelectCountry} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
