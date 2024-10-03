import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { AdminScreen, AuthAdmin, HomeAdmin } from "./screens/admin";
import { LandingPage, ClientPage } from "./screens/client"
import { AdminsInformations, OrdersInformations, PaymentsInformations, ReportsInformations, ServicesInformations, SettingsInformations, TicketsInformations, UsersInformations} from "./components/admin";
import {AddMoney, CommonQuestions, ConditionsService, Home, Orders, PrincipalPage, ProfitMoney, Services, Settings, Support } from "./components/client";
import AppWeb from "./screens/AppWeb";
import SignUp from "./screens/client/signUp";
import NewOrder from "./components/client/newOrder/newOrder";

function App() {
  return (
    <div id='fullScreen' data-theme={"myTheme"}>
      <Router>
        <Routes>
          <Route path="/" element={<AppWeb />}>
            <Route path="/" element={<LandingPage />} >
              <Route path="/" element={<Home />} />
              <Route path="/conditionService" element={<ConditionsService />} />
              <Route path="/commonQuestions" element={<CommonQuestions />} />
            </Route>
            <Route path="/signUp" element={<SignUp />}/>
            <Route path="/client" element={<ClientPage />}>
                <Route path="/client" element={<PrincipalPage />}/>
                <Route path="/client/newOrder" element={<NewOrder />}/>
                <Route path="/client/orders" element={<Orders />}/>
                <Route path="/client/addMoney" element={<AddMoney />}/>
                <Route path="/client/support" element={<Support />}/>
                <Route path="/client/services" element={<Services />}/>
                <Route path="/client/profitMoney" element={<ProfitMoney />}/>
                <Route path="/client/settings" element={<Settings />}/>
            </Route>
            <Route path="/admin" element={<AdminScreen />}>
              <Route path="/admin/" element={<HomeAdmin />}>
                <Route path="/admin/" element={<AdminsInformations />} />
                <Route path="/admin/users" element={<UsersInformations />} />
                <Route path="/admin/orders" element={<OrdersInformations />}/>
                <Route path="/admin/services" element={<ServicesInformations />}/>
                <Route path="/admin/payments" element={<PaymentsInformations />}/>
                <Route path="/admin/tickets" element={<TicketsInformations />}/>
                <Route path="/admin/reports" element={<ReportsInformations />}/>
                <Route path="/admin/settings" element={<SettingsInformations />}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
