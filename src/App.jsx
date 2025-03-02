import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import TestPage from "./Pages/Test/testpage";
import UserAccount from "./Pages/UserAccount";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/Fakebook/" element={<Home />} />
      <Route path="/Fakebook/SignIn" element={<SignIn />} />
      <Route path="/Fakebook/Users/:id" element={<UserAccount />} />
      <Route path="/Fakebook/About" element={<SignIn />} />
      <Route path="/Fakebook/test" element={<TestPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
