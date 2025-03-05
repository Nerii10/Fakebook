import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import TestPage from "./Pages/Test/testpage";
import UserAccount from "./Pages/UserAccount";
import Home from "./Pages/Home";
import Help from "./Pages/Help";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Users/:id" element={<UserAccount />} />
      <Route path="/About" element={<SignIn />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
