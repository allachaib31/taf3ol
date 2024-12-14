import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './App.css';
import './index.css';
import { AdminScreen, AuthAdmin, HomeAdmin, ResetPassword } from "./screens/admin";
import { LandingPage, ClientPage } from "./screens/client"
import {  Account, AddItemToStock, AddProducts, AddProductsApi, AdminsInformations, Advertisement, AllRechargeCards, Api, Article, AvailableInStock, CategoriesServices, ClientDetails, Currencies, DamagedItemInStock, General, GenerateRechargeCards, GroupMoney, Notifications, OrderInformation, OrdersInformations, PaymentsInformations, PopUpMessages, Products, ProductSort, RecordSoldItemStock, Registration, ReportsInformations, RequiresReviewItemStock, SettingsInformations, Stock, StockInfo, TicketsInformations, TransferMoney, TypeServices, UsersInformations } from "./components/admin";
import { AddMoney, CommonQuestions, ConditionsService, Home, Orders, PrincipalPage, Profile, ProfitMoney, Services, Settings, Support, UpdatePassword } from "./components/client";
import AppWeb from "./screens/AppWeb";
import SignUp from "./screens/client/signUp";
import NewOrder from "./components/client/newOrder/newOrder";
import OpenTickets from "./components/client/support/openTickets";
import ManageStore from "./components/client/profitMoney/manageStore";
import Gifts from "./components/client/profitMoney/gifts";
function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "ATP0uzxeGHiTOZLfklXU8qo_LuHVi1zF0oFFaHIChJSCnvaIjPX19zjH_1PMYGCwC1QdbBJ2QUsudjdl" }}>
      <div id='fullScreen' data-theme={"myTheme"} className="custom-scrollbar">
        <Router>
          <Routes>
            <Route path="/" element={<AppWeb />}>
              <Route path="/" element={<LandingPage />} >
                <Route path="/" element={<Home />} />
                <Route path="/conditionService" element={<ConditionsService />} />
                <Route path="/commonQuestions" element={<CommonQuestions />} />
              </Route>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/client" element={<ClientPage />}>
                <Route path="/client" element={<PrincipalPage />} />
                <Route path="/client/newOrder" element={<NewOrder />} />
                <Route path="/client/orders" element={<Orders />} />
                <Route path="/client/addMoney" element={<AddMoney />} />
                <Route path="/client/support" element={<Support />} />
                <Route path="/client/openTickets" element={<OpenTickets />} />
                <Route path="/client/services" element={<Services />} />
                <Route path="/client/profitMoney/affiliateMarketing" element={<ProfitMoney />} />
                <Route path="/client/profitMoney/manageStore" element={<ManageStore />} />
                <Route path="/client/profitMoney/gifts" element={<Gifts />} />
                <Route path="/client/settings" element={<Settings />}>
                  <Route path="/client/settings" element={<Profile />} />
                  <Route path="/client/settings/updatePassword" element={<UpdatePassword />} />
                </Route>
              </Route>
              <Route path="/admin" element={<AdminScreen />}>
                <Route path="/admin/" element={<HomeAdmin />}>
                  <Route path="/admin/" element={<AdminsInformations />} />
                  <Route path="/admin/home" element={<ReportsInformations />}/>
                  <Route path="/admin/users" element={<UsersInformations />} />
                  <Route path="/admin/clientDetails" element={<ClientDetails />}/>
                  <Route path="/admin/transferMoney" element={<TransferMoney />}/>
                  <Route path="/admin/groupMoney" element={<GroupMoney />}/>
                  <Route path="/admin/orders" element={<OrdersInformations />} />
                  <Route path="/admin/order/get" element={<OrderInformation />}/>
                  <Route path="/admin/stocks" element={<Stock />} />
                  <Route path="/admin/stocksInfo" element={<StockInfo />}>
                    <Route path="/admin/stocksInfo" element={<AddItemToStock />}/>
                    <Route path="/admin/stocksInfo/recordSold" element={<RecordSoldItemStock />}/>
                    <Route path="/admin/stocksInfo/available" element={<AvailableInStock />}/>
                    <Route path="/admin/stocksInfo/damaged" element={<DamagedItemInStock />}/>
                    <Route path="/admin/stocksInfo/requiresReview" element={<RequiresReviewItemStock />}/>
                  </Route>
                  <Route path="/admin/article" element={<Article />}/>
                  {/*<Route path="/admin/services" element={<ServicesInformations />} />*/}
                  <Route path="/admin/typeServices" element={<TypeServices />}/>
                  <Route path="/admin/categoriesServices" element={<CategoriesServices />}/>
                  <Route path="/admin/addProductsApi" element={<AddProductsApi />}/>
                  <Route path="/admin/addProducts" element={<AddProducts />}/>
                  <Route path="/admin/productSort" element={<ProductSort />}/>
                  <Route path="/admin/products" element={<Products />}/>
                  <Route path="/admin/payments" element={<PaymentsInformations />} />
                  <Route path="/admin/generateRechargeCards" element={<GenerateRechargeCards />}/>
                  <Route path="/admin/allRechargeCards" element={<AllRechargeCards />}/>
                  <Route path="/admin/currencies" element={<Currencies />}/>
                  <Route path="/admin/tickets" element={<TicketsInformations />} />
                  <Route path="/admin/general" element={<General />}/>
                  <Route path="/admin/advertisement" element={<Advertisement />}/>
                  <Route path="/admin/registration" element={<Registration />}/>
                  <Route path="/admin/notifications" element={<Notifications />}/>
                  <Route path="/admin/popUpMessages" element={<PopUpMessages />}/>
                  <Route path="/admin/account" element={<Account />}/>
                  <Route path="/admin/api" element={<Api />}/>
                </Route>
              </Route>
              <Route path="/admin/auth" element={<AuthAdmin />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
