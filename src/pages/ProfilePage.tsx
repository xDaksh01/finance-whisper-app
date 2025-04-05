
import { 
  Bell, Shield, Wallet, ChevronRight, CreditCard, 
  HelpCircle, LogOut, Settings, Target
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const MenuLink = ({ 
  icon, 
  label, 
  endContent = <ChevronRight size={16} className="text-slate-400" />,
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string,
  endContent?: React.ReactNode,
  onClick?: () => void 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
  >
    <div className="flex items-center">
      <div className="mr-3 text-slate-500">{icon}</div>
      <span className="font-medium text-slate-800">{label}</span>
    </div>
    {endContent}
  </button>
);

const ProfilePage = () => {
  return (
    <div className="pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-1">Manage your account and settings</p>
      </div>
      
      {/* User Profile Card */}
      <div className="px-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="ml-4">
                <h2 className="font-bold text-slate-900">John Doe</h2>
                <p className="text-sm text-slate-500">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Notification Preferences */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-medium text-slate-600 mb-2">NOTIFICATION PREFERENCES</h2>
        
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <Bell size={16} className="text-slate-500 mr-3" />
                <span className="font-medium text-slate-800">Push Notifications</span>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <Target size={16} className="text-slate-500 mr-3" />
                <span className="font-medium text-slate-800">Savings Goal Alerts</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <CreditCard size={16} className="text-slate-500 mr-3" />
                <span className="font-medium text-slate-800">Spending Alerts</span>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Settings Menu */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-medium text-slate-600 mb-2">SETTINGS</h2>
        
        <Card>
          <CardContent className="p-2">
            <MenuLink 
              icon={<Wallet size={16} />} 
              label="Financial Accounts" 
            />
            
            <Separator />
            
            <MenuLink 
              icon={<Shield size={16} />} 
              label="Privacy & Security" 
            />
            
            <Separator />
            
            <MenuLink 
              icon={<Settings size={16} />} 
              label="App Settings" 
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Support */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-medium text-slate-600 mb-2">SUPPORT</h2>
        
        <Card>
          <CardContent className="p-2">
            <MenuLink 
              icon={<HelpCircle size={16} />} 
              label="Help & Support" 
            />
            
            <Separator />
            
            <MenuLink 
              icon={<LogOut size={16} />} 
              label="Sign Out" 
              endContent={<span className="text-sm text-slate-400">v1.0.0</span>}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
