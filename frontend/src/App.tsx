import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/modules/home/page/Home.tsx";
import Connection from "@/modules/home/page/Connection.tsx";
import Config from "@modules/home/page/Config.tsx";
import ConnectionStatus from "@modules/shared/component/ConnectionStatus.tsx";
import Navbar from "@modules/shared/component/Navbar.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-area">
          <ConnectionStatus />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
