
import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, ArrowDownRight, Plus, Settings, Bell, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExpenseCard, { Expense } from "@/components/ExpenseCard";
import SavingsGoalCard, { SavingsGoal } from "@/components/SavingsGoalCard";
import BudgetSlider, { BudgetCategory } from "@/components/BudgetSlider";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data - in a real app, this would come from an API
const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.99,
    category: "food",
    description: "Grocery shopping",
    date: "2025-04-04"
  },
  {
    id: "2",
    amount: 12.50,
    category: "transport",
    description: "Uber ride",
    date: "2025-04-03"
  },
  {
    id: "3",
    amount: 29.99,
    category: "entertainment",
    description: "Movie tickets",
    date: "2025-04-02"
  }
];

const mockSavingsGoals: SavingsGoal[] = [
  {
    id: "1",
    name: "Vacation Fund",
    targetAmount: 2000,
    currentAmount: 950,
    deadline: "2025-07-15",
    category: "travel"
  },
  {
    id: "2",
    name: "New Laptop",
    targetAmount: 1200,
    currentAmount: 600,
    deadline: "2025-06-01",
    category: "electronics"
  }
];

const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "1",
    name: "Food",
    currentAmount: 500,
    budgetAmount: 2000,
    color: "bg-finance-primary"
  },
  {
    id: "2",
    name: "Transport",
    currentAmount: 300,
    budgetAmount: 1000,
    color: "bg-finance-info"
  },
  {
    id: "3",
    name: "Health",
    currentAmount: 200,
    budgetAmount: 1000,
    color: "bg-green-500"
  },
  {
    id: "4",
    name: "Education",
    currentAmount: 400,
    budgetAmount: 1000,
    color: "bg-amber-500"
  },
  {
    id: "5",
    name: "Entertainment",
    currentAmount: 300,
    budgetAmount: 1000,
    color: "bg-purple-500"
  },
  {
    id: "6",
    name: "Gaming",
    currentAmount: 150,
    budgetAmount: 500,
    color: "bg-finance-danger"
  }
];

const mockMonthlyBudget = 6000;
const mockMonthlySpent = 4000;

const HomePage = () => {
  const isMobile = useIsMobile();
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
      setTimeOfDay("morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
      setTimeOfDay("afternoon");
    } else {
      setGreeting("Good evening");
      setTimeOfDay("evening");
    }
    
    // In a real app, these would be API calls
    setRecentExpenses(mockExpenses);
    setSavingsGoals(mockSavingsGoals);
    setBudgetCategories(mockBudgetCategories);
  }, []);
  
  const budgetProgress = (mockMonthlySpent / mockMonthlyBudget) * 100;
  const formattedBudgetLeft = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(mockMonthlyBudget - mockMonthlySpent);

  return (
    <div className="pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{greeting}</h1>
          <p className="text-slate-600 mt-1">
            Your financial overview
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell size={20} className="text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings size={20} className="text-slate-600" />
          </Button>
        </div>
      </div>
      
      {/* Budget Overview */}
      <div className="px-4 mb-6">
        <Card className="border bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Monthly Budget</h2>
                <p className="text-2xl font-bold text-slate-900">{formattedBudgetLeft} left</p>
              </div>
              <div className="bg-finance-primary/10 p-2 rounded-full">
                <TrendingUp size={20} className="text-finance-primary" />
              </div>
            </div>
            
            <div className="relative h-2 bg-slate-200 rounded-full mb-2">
              <div 
                className="absolute left-0 top-0 h-full bg-finance-primary rounded-full"
                style={{ width: `${budgetProgress}%` }}
              />
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 h-4 w-4 bg-white border-2 border-finance-primary rounded-full"
                style={{ left: `${budgetProgress}%`, marginLeft: "-8px" }}
              />
            </div>
            
            <div className="flex justify-between mt-1 text-sm">
              <span className="text-slate-600">
                ${mockMonthlySpent.toLocaleString()} spent
              </span>
              <span className="font-medium">
                ${mockMonthlyBudget.toLocaleString()} budget
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget Categories */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Budget Categories</h2>
          <Button variant="outline" size="sm" className="text-xs">Track</Button>
        </div>
        
        <Card className="border bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-1">
              {budgetCategories.map(category => (
                <BudgetSlider key={category.id} category={category} />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Add Category</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Savings Goals */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Savings Goals</h2>
          <Button variant="outline" size="sm" className="text-xs">Add Goal</Button>
        </div>
        
        <div className="space-y-3">
          {savingsGoals.map(goal => (
            <SavingsGoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
      
      {/* App Support/Help */}
      <div className="px-4">
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-slate-900">Need help?</h3>
              <p className="text-sm text-slate-600">Get support with your budget</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle size={20} className="text-slate-600" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
