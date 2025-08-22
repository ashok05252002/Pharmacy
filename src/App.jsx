import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

import LoginPage from './components/LoginPage';
import CustomerAuthPage from './pages/CustomerAuthPage'; // New Customer Auth Page

// Customer Facing Layout & Pages
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import UploadPrescriptionPage from './pages/UploadPrescriptionPage';
import LoyaltyPage from './pages/LoyaltyPage';
import DeliveryAddressPage from './pages/checkout/DeliveryAddressPage';
import PaymentSelectionPage from './pages/checkout/PaymentSelectionPage';
import OrderConfirmationPage from './pages/checkout/OrderConfirmationPage';
import LiveOrderTrackingPage from './pages/LiveOrderTrackingPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SupportTicketsPage from './pages/SupportTicketsPage';
import MyPrescriptionsListPage from './pages/profile/MyPrescriptionsListPage';
import CampaignsPage from './pages/profile/CampaignsPage';
import ManageAddressesPage from './pages/profile/ManageAddressesPage';
import EditProfilePage from './pages/profile/EditProfilePage';

// Admin & Staff Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; 

// Admin Specific Pages
import ClusterManagementPage from './pages/admin/ClusterManagementPage';
import AdminPrescriptionApprovalPage from './pages/admin/AdminPrescriptionApprovalPage';
import AdminProductManagementPage from './pages/admin/AdminProductManagementPage';
import AdminOrderRoutingPage from './pages/admin/AdminOrderRoutingPage';
import AdminCampaignManagementPage from './pages/admin/CampaignManagementPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import ContentManagementPage from './pages/admin/ContentManagementPage';

// Store Owner Specific Pages
import StoreProfileManagementPage from './pages/store_owner/StoreProfileManagementPage';
import StoreOrderManagementPage from './pages/store_owner/StoreOrderManagementPage';
import StoreInventoryManagementPage from './pages/store_owner/StoreInventoryManagementPage';
import StoreDeliveryStaffPage from './pages/store_owner/StoreDeliveryStaffPage';
import StoreSupportTicketsPage from './pages/store_owner/StoreSupportTicketsPage';
import StoreReportsPage from './pages/store_owner/StoreReportsPage';

// Delivery Staff Specific Pages
import DeliveryDashboardPage from './pages/delivery_staff/DeliveryDashboardPage';
import DeliveryOrderDetailPage from './pages/delivery_staff/DeliveryOrderDetailPage';
import DeliveryHistoryPage from './pages/delivery_staff/DeliveryHistoryPage';
import DeliveryEarningsPage from './pages/delivery_staff/DeliveryEarningsPage';
import DeliveryChatPage from './pages/delivery_staff/DeliveryChatPage';


// Pharmacist Specific Pages
import PharmacistDashboardPage from './pages/pharmacist/PharmacistDashboardPage';


// Placeholder for authentication check
const isAuthenticated = () => true; 

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Wrapper to pass role to AdminLayout for Outlet context
const AdminLayoutWrapper = ({ children, role }) => (
  <AdminLayout userRole={role}>
    {children}
  </AdminLayout>
);


function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<div className="min-h-screen flex items-center justify-center bg-medical-light/30 p-4"><LoginPage /></div>} />
          <Route path="/customer-auth" element={<div className="min-h-screen flex items-center justify-center bg-medical-light/30 p-4"><CustomerAuthPage /></div>} />
          
          {/* Customer Facing Routes */}
          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="products/:categorySlug" element={<ProductListPage />} />
                    <Route path="product/:productId" element={<ProductDetailPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="profile/edit" element={<EditProfilePage />} />
                    <Route path="profile/my-prescriptions" element={<MyPrescriptionsListPage />} />
                    <Route path="profile/campaigns" element={<CampaignsPage />} />
                    <Route path="profile/manage-addresses" element={<ManageAddressesPage />} />
                    <Route path="profile/settings" element={<ProfilePage />} /> {/* Or a dedicated settings page */}
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="order-detail/:orderId" element={<OrderDetailPage />} />
                    <Route path="live-order-tracking/:orderId" element={<LiveOrderTrackingPage />} />
                    <Route path="upload-prescription" element={<UploadPrescriptionPage />} />
                    <Route path="loyalty" element={<LoyaltyPage />} />
                    <Route path="support-tickets" element={<SupportTicketsPage />} />
                    <Route path="checkout/address" element={<DeliveryAddressPage />} />
                    <Route path="checkout/payment" element={<PaymentSelectionPage />} />
                    <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} /> 
                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route path="admin/*" element={<AdminLayoutWrapper role="admin"><Outlet /></AdminLayoutWrapper>}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="cluster-management" element={<ClusterManagementPage />} />
            <Route path="prescriptions" element={<AdminPrescriptionApprovalPage />} />
            <Route path="products" element={<AdminProductManagementPage />} />
            <Route path="orders" element={<AdminOrderRoutingPage />} />
            <Route path="campaigns" element={<AdminCampaignManagementPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="cms" element={<ContentManagementPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Store Owner Routes */}
          <Route path="store-owner/*" element={<AdminLayoutWrapper role="store_owner"><Outlet /></AdminLayoutWrapper>}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="profile" element={<StoreProfileManagementPage />} />
            <Route path="orders" element={<StoreOrderManagementPage />} />
            <Route path="inventory" element={<StoreInventoryManagementPage />} />
            <Route path="delivery-staff" element={<StoreDeliveryStaffPage />} />
            <Route path="support-tickets" element={<StoreSupportTicketsPage />} />
            <Route path="reports" element={<StoreReportsPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Delivery Staff Routes */}
          <Route path="delivery/*" element={<AdminLayoutWrapper role="delivery_staff"><Outlet/></AdminLayoutWrapper>}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<DeliveryDashboardPage />} /> 
              <Route path="order-detail/:orderId" element={<DeliveryOrderDetailPage />} />
              <Route path="history" element={<DeliveryHistoryPage />} />
              <Route path="earnings" element={<DeliveryEarningsPage />} />
              <Route path="chat" element={<DeliveryChatPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Pharmacist Routes */}
          <Route path="pharmacist/*" element={<AdminLayoutWrapper role="pharmacist"><Outlet/></AdminLayoutWrapper>}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<PharmacistDashboardPage />} />
              {/* Placeholder for pharmacist specific pages */}
              {/* <Route path="review-prescriptions" element={<div>Review Prescriptions Page</div>} /> */}
              {/* <Route path="logs" element={<div>Pharmacist Logs Page</div>} /> */}
              <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
