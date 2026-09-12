import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

import { LandingPage } from './components/pages/LandingPage';
import { FindTailorsPage } from './components/pages/FindTailorsPage';
import { TailorProfilePage } from './components/pages/TailorProfilePage';
import { CustomServiceRequestPage } from './components/pages/CustomServiceRequestPage';
import { MeasurementsPage } from './components/pages/MeasurementsPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { CustomerDashboard } from './components/pages/CustomerDashboard';
import { TailorDashboard } from './components/pages/TailorDashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { MessagingPage } from './components/pages/MessagingPage';
import { AppointmentsPage } from './components/pages/AppointmentsPage';
import { PaymentPage } from './components/pages/PaymentPage';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { AuthPages } from './components/pages/AuthPages';
import { SmartMatchPage } from './components/pages/SmartMatchPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'find-tailors':
        return <FindTailorsPage />;
      case 'tailor-profile':
        return <TailorProfilePage />;
      case 'request-service':
        return <CustomServiceRequestPage />;
      case 'measurements':
        return <MeasurementsPage />;
      case 'track-order':
        return <OrderTrackingPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'tailor-dashboard':
        return <TailorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'messages':
        return <MessagingPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'payment':
        return <PaymentPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'auth':
        return <AuthPages />;
      case 'smart-match':
        return <SmartMatchPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E2229] font-sans antialiased selection:bg-[#9E2A2B]/15 selection:text-[#9E2A2B]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
