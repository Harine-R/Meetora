import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Organise from "./pages/Organise";
import BookTicket from "./pages/BookTicket";
import Categories from "./pages/Categories";
import Explore from "./pages/Explore";
import Contact from "./pages/Contact";
import AiPicks from "./pages/AiPicks";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/organise" element={<Organise />} />
      <Route path="/book/:id" element={<BookTicket />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/aipicks" element={<AiPicks />} />
    </Routes>
  );
}

export default App;