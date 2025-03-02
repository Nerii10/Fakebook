import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import TestPage from "./Pages/Test/testpage";
import UserAccount from "./Pages/UserAccount";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Users/:id" element={<UserAccount />} />
        <Route path="/About" element={<SignIn />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
