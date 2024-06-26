import Location from "./components/Location";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Device from "./components/Device";
import AddtheLocation from "./form/AddtheLocation";
import LocationList from "./list/LocationList";
import AddtheDevice from "./form/AddtheDevice";
import DeviceList from "./list/DeviceList";


function App() {
  return (
    <BrowserRouter>
      <div  className="flex flex-col w-full h-screen bg-gradient-to-r from-violet-900 to-fuchsia-950 brightness-100">
        <Header/>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
          <Route path="/location" element={<Location/>}/>
          <Route path="/Device" element={<Device/>}/>
          <Route path="/AddtheLocation" element={<AddtheLocation/>}/>
          <Route path="/LocationList" element={<LocationList/>}/>
          <Route path="/AddtheDevice" element={<AddtheDevice/>}/>
          <Route path="/DeviceList" element={<DeviceList/>}/>
        </Routes>
        <Footer/>
      </div> 
    </BrowserRouter>
  );
}

export default App;
