
import { Home, PieChart, Target, Wallet, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center w-full py-2 space-y-1 transition-colors",
      isActive ? "text-finance-primary" : "text-slate-500"
    )}
  >
    <div className="relative">
      {icon}
      {isActive && (
        <span className="absolute inset-0 bg-finance-primary/10 rounded-full scale-150 -z-10"></span>
      )}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/expenses", label: "Expenses", icon: <PieChart size={20} /> },
    { path: "/goals", label: "Goals", icon: <Target size={20} /> },
    { path: "/accounts", label: "Accounts", icon: <Wallet size={20} /> },
    { path: "/profile", label: "Profile", icon: <UserCircle size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-slate-200 shadow-sm animate-slide-in-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
      <div className="h-safe-area-bottom bg-white" />
    </div>
  );
};

export default BottomNavigation;
