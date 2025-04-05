
import { CreditCard, Plus, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock data
const mockAccounts = [
  {
    id: "1",
    name: "Main Checking",
    institution: "Universal Bank",
    balance: 3850.25,
    lastFour: "4321",
    type: "checking"
  },
  {
    id: "2",
    name: "Savings Account",
    institution: "Universal Bank",
    balance: 12500.00,
    lastFour: "8765",
    type: "savings"
  }
];

const mockCards = [
  {
    id: "1",
    name: "Rewards Card",
    institution: "Capital One",
    balance: -450.75,
    lastFour: "9876",
    type: "credit",
    color: "bg-gradient-to-r from-slate-800 to-slate-600"
  },
  {
    id: "2",
    name: "Travel Card",
    institution: "Visa",
    balance: -1250.50,
    lastFour: "5432",
    type: "credit",
    color: "bg-gradient-to-r from-finance-primary to-finance-info"
  }
];

const AccountsPage = () => {
  const formattedCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Accounts</h1>
        <p className="text-slate-600 mt-1">Manage your connected accounts</p>
      </div>
      
      {/* Add Account Button */}
      <div className="px-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6 border-dashed"
        >
          <Plus size={16} />
          <span>Connect Bank Account</span>
        </Button>
        
        <div className="flex items-center justify-center mt-2">
          <Lock size={12} className="text-slate-400 mr-1" />
          <p className="text-xs text-slate-400">
            Bank-level security with 256-bit encryption
          </p>
        </div>
      </div>
      
      {/* Bank Accounts */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Bank Accounts</h2>
        </div>
        
        {mockAccounts.map(account => (
          <Card key={account.id} className="mb-3">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{account.name}</p>
                  <p className="text-xs text-slate-500">{account.institution} ••••{account.lastFour}</p>
                </div>
                <p className="font-bold text-slate-900">{formattedCurrency(account.balance)}</p>
              </div>
              
              <div className="flex justify-end mt-3">
                <Button variant="ghost" size="sm" className="text-xs flex items-center">
                  <span>View Details</span>
                  <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Credit Cards */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Credit Cards</h2>
        </div>
        
        <div className="space-y-4">
          {mockCards.map(card => (
            <div key={card.id} className={`relative rounded-xl p-4 text-white ${card.color}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-xs">{card.institution}</p>
                  <p className="font-medium">{card.name}</p>
                </div>
                <CreditCard size={24} className="text-white/80" />
              </div>
              
              <div className="mt-6">
                <p className="text-white/80 text-xs">Balance</p>
                <p className="font-bold text-lg">{formattedCurrency(Math.abs(card.balance))}</p>
              </div>
              
              <div className="mt-2 flex justify-between items-end">
                <p className="text-white/80 text-xs">••••{card.lastFour}</p>
                <Button variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10 text-xs px-2 py-1">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
