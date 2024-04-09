import AddLocation from "./components/AddLocation";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";


function App() {
  return (
    <BrowserRouter>
    
        <Header/>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path="/location" element={<AddLocation/>}/>
        </Routes>
        <Footer/>
        
    </BrowserRouter>
  );
}

export default App;