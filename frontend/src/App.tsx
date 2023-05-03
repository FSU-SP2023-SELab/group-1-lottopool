import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HomePage from "./routes/home-page";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import ProfilePage from "./routes/profile-page";
import DashboardPage from "./routes/dashboard-page";
import AboutUsPage from "./routes/about-us-page";
import HowPage from "./routes/how-page/";
import { AdminPage, AdminTicketsPage } from "./routes/admin-page";
import TicketsPage from "./routes/tickets-page";

const App: Component = () => {
  return (
    <div class="min-h-screen">
      <Navbar />
      <Routes>
        <Route path={"/"} component={HomePage} />
        <Route path={"/dashboard"} component={DashboardPage} />
        <Route path={"/about"} component={AboutUsPage} />
        <Route path={"/how"} component={HowPage} />
        <Route path={"/profile"} component={ProfilePage} />
        <Route path={"/admin"} component={AdminPage} />
        <Route path={"/admin/tickets/:id"} component={AdminTicketsPage} />
        <Route path={"/tickets"} component={TicketsPage} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
