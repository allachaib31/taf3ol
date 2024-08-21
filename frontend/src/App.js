import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { AdminScreen, AuthAdmin, HomeAdmin } from "./screens/admin";
import { AdminInformations } from "./components/admin";

function App() {
  return (
    <div id='fullScreen' data-theme={"myTheme"}>
      <Router>
        <Routes>
          <Route exact path="/" element={<AdminScreen />}>
            <Route path="/admin/auth">
              <Route path="/admin/auth" element={<AuthAdmin />} />
            </Route>
            <Route path="/admin">
              <Route path="/admin" element={<HomeAdmin />}>
                <Route path="/admin/" element={<AdminInformations />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
