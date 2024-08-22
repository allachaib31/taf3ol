import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { AdminScreen, AuthAdmin, HomeAdmin, LandingPageAdmin } from "./screens/admin";
import { AdminInformations, LandingPage } from "./components/admin";
import AppWeb from "./screens/AppWeb";

function App() {
  return (
    <div id='fullScreen' data-theme={"myTheme"}>
      <Router>
        <Routes>
          <Route path="/" element={<AppWeb />}>
            <Route path="/admin" element={<AdminScreen />}>
              <Route path="/admin/">
                <Route path="/admin/" element={<HomeAdmin />}>
                  <Route path="/admin/" element={<AdminInformations />} />
                </Route>
              </Route>
              <Route path="/admin/landingPage" element={<LandingPageAdmin />} >
                <Route path="/admin/landingPage" element={<LandingPage />}/>
              </Route>
              <Route path="/admin/auth">
                <Route path="/admin/auth" element={<AuthAdmin />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
