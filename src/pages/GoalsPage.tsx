
import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SavingsGoalCard, { SavingsGoal } from "@/components/SavingsGoalCard";

// Mock data
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
  },
  {
    id: "3",
    name: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 2500,
    deadline: "2025-12-31",
    category: "savings"
  },
  {
    id: "4",
    name: "Wedding",
    targetAmount: 10000,
    currentAmount: 3000,
    deadline: "2026-05-15",
    category: "event"
  }
];

const GoalsPage = () => {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(mockSavingsGoals);
  
  // Calculate stats
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const averageCompletion = savingsGoals.length > 0 
    ? Math.round(
        (savingsGoals.reduce(
          (sum, goal) => sum + (goal.currentAmount / goal.targetAmount), 
          0
        ) / savingsGoals.length) * 100
      )
    : 0;
  
  const formattedTotalSaved = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(totalSaved);

  return (
    <div className="pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Savings Goals</h1>
        <p className="text-slate-600 mt-1">Track your progress towards financial targets</p>
      </div>
      
      {/* Summary Cards */}
      <div className="px-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <Card className="min-w-[160px] bg-finance-primary/5 border-finance-primary/20">
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-slate-600">Total Saved</p>
                <p className="text-lg font-bold text-slate-900">{formattedTotalSaved}</p>
              </div>
              <div className="mt-1 flex items-center text-xs text-finance-primary">
                <Target size={12} className="mr-1" />
                <span>Across all goals</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="min-w-[160px] bg-finance-secondary/5 border-finance-secondary/20">
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-slate-600">Avg. Progress</p>
                <p className="text-lg font-bold text-slate-900">{averageCompletion}%</p>
              </div>
              <div className="mt-1 flex items-center text-xs text-finance-secondary">
                <Target size={12} className="mr-1" />
                <span>Completion rate</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Goals List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Your Goals</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
          >
            <Plus size={14} />
            <span>Add Goal</span>
          </Button>
        </div>
        
        {savingsGoals.length > 0 ? (
          <div className="space-y-4">
            {savingsGoals.map(goal => (
              <SavingsGoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No savings goals found. Create your first goal!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
