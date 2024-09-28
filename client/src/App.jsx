
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Monitoring from "./components/Monitoring";
import Produk from "./components/Produk";
import Fetch from "./components/FetchPoke";

function App() {
  return (
  <div > 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Monitoring/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
  
        <Route path="/produk" element={<Produk />}/>
        <Route path="/fetch" element={<Fetch />}/>
        {/* harus kata besar didepan*/}
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
