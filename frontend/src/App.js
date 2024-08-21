import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { AuthAdmin, HomeAdmin } from "./screens/admin";

function App() {
  return (
    <div id='fullScreen' data-theme={window.localStorage.getItem("theme")}>
      <Router>
        <Routes>
          <Route path="/admin/auth">
            <Route path="/admin/auth" element={<AuthAdmin />}/>
          </Route>
          <Route path="/admin">
            <Route path="/admin" element={<HomeAdmin />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
