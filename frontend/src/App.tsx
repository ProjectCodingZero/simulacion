import { Route, Routes } from "react-router-dom";
import Home from "@/modules/home/page/Home.tsx";
import Homes from "@/modules/home/page/Homes.tsx";
import Config from "@modules/home/page/Config.tsx";
import Navbar from "@modules/shared/component/Navbar.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-area ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homes" element={<Homes />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
