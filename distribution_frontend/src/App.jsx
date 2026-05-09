import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import AdminDashboard from "./pages/AdminDashboard";

import ManagerDashboard from "./pages/ManagerDashboard";

import BeneficiaryDashboard
from "./pages/BeneficiaryDashboard";

import UserManagement
from "./pages/UserManagement";

import RationCardManagement
from "./pages/RationCardManagement";

import RationItemManagement
from "./pages/RationItemManagement";

import InventoryManagement
from "./pages/InventoryManagement";

import AllocationManagement
from "./pages/AllocationManagement";

import DistributionManagement
from "./pages/DistributionManagement";

import ProtectedRoute
from "./routes/ProtectedRoute";
import MyCard from "./pages/MyCard";

import MyAllocations
from "./pages/MyAllocations";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />
        <Route
  path="/my-card"
  element={
    <ProtectedRoute role="BENEFICIARY">

      <MyCard />

    </ProtectedRoute>
  }
/>

<Route
  path="/my-allocations"
  element={
    <ProtectedRoute role="BENEFICIARY">

      <MyAllocations />

    </ProtectedRoute>
  }
/>
        <Route
          path="/users"
          element={
            <ProtectedRoute role="ADMIN">

              <UserManagement />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ration-cards"
          element={
            <ProtectedRoute role="ADMIN">

              <RationCardManagement />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ration-items"
          element={
            <ProtectedRoute role="ADMIN">

              <RationItemManagement />

            </ProtectedRoute>
          }
        />

        <Route
          path="/allocations"
          element={
            <ProtectedRoute role="ADMIN">

              <AllocationManagement />

            </ProtectedRoute>
          }
        />

        {/* SHOP MANAGER ROUTES */}

        <Route
          path="/manager"
          element={
            <ProtectedRoute role="SHOP_MANAGER">

              <ManagerDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute role="SHOP_MANAGER">

              <InventoryManagement />

            </ProtectedRoute>
          }
        />

        <Route
          path="/distributions"
          element={
            <ProtectedRoute role="SHOP_MANAGER">

              <DistributionManagement />

            </ProtectedRoute>
          }
        />

        {/* BENEFICIARY ROUTES */}

        <Route
          path="/beneficiary"
          element={
            <ProtectedRoute role="BENEFICIARY">

              <BeneficiaryDashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;