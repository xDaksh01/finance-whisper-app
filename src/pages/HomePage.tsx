
import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, ArrowDownRight, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExpenseCard, { Expense } from "@/components/ExpenseCard";
import SavingsGoalCard, { SavingsGoal } from "@/components/SavingsGoalCard";

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

const mockMonthlyBudget = 2500;
const mockMonthlySpent = 1230;

const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  
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
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-slate-900">{greeting}</h1>
        <p className="text-slate-600 mt-1">
          Here's your financial summary for this {timeOfDay}
        </p>
      </div>
      
      {/* Budget Overview */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-sm font-medium text-slate-600">Monthly Budget</h2>
                <p className="text-2xl font-bold text-slate-900">{formattedBudgetLeft} left</p>
              </div>
              <div className="bg-finance-primary/10 p-2 rounded-full">
                <TrendingUp size={20} className="text-finance-primary" />
              </div>
            </div>
            
            <Progress value={budgetProgress} className="h-2 bg-slate-200" />
            
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-slate-600">Spent</span>
              <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Financial Insights */}
      <div className="px-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <Card className="min-w-[160px] bg-finance-primary/5 border-finance-primary/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-600">This Week</p>
                  <p className="text-lg font-bold text-slate-900">$354</p>
                </div>
                <div className="bg-green-100 p-1 rounded-full">
                  <ArrowDownRight size={16} className="text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">12% less than last week</p>
            </CardContent>
          </Card>
          
          <Card className="min-w-[160px] bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-600">AI Insights</p>
                  <p className="text-lg font-bold text-slate-900">3 tips</p>
                </div>
                <div className="bg-amber-100 p-1 rounded-full">
                  <ArrowUpRight size={16} className="text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-1">Tap to view spending insights</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Expenses */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Recent Expenses</h2>
          <Button variant="outline" size="sm" className="text-xs">View All</Button>
        </div>
        
        <div className="space-y-3">
          {recentExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
          
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6 border-dashed">
            <Plus size={16} />
            <span>Add New Expense</span>
          </Button>
        </div>
      </div>
      
      {/* Savings Goals */}
      <div className="px-4">
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
    </div>
  );
};

export default HomePage;
