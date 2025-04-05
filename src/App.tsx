
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExpensesPage from "./pages/ExpensesPage";
import GoalsPage from "./pages/GoalsPage";
import AccountsPage from "./pages/AccountsPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Authentication wrapper for the entire app
const AuthWrapper = () => {
  const { user, isLoading } = useAuth();
  
  // Route to render the bottom navigation
  const shouldShowNav = user && !isLoading && window.location.pathname !== "/auth";
  
  return (
    <>
      <Routes>
        <Route path="/auth" element={
          user ? <Navigate to="/" replace /> : <AuthPage />
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        
        <Route path="/expenses" element={
          <ProtectedRoute>
            <ExpensesPage />
          </ProtectedRoute>
        } />
        
        <Route path="/goals" element={
          <ProtectedRoute>
            <GoalsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/accounts" element={
          <ProtectedRoute>
            <AccountsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {shouldShowNav && <BottomNavigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AuthProvider>
            <AuthWrapper />
          </AuthProvider>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
