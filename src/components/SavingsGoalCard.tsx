
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface SavingsGoalCardProps {
  goal: SavingsGoal;
}

const SavingsGoalCard = ({ goal }: SavingsGoalCardProps) => {
  const percentComplete = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100
  );
  
  const daysRemaining = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isNearDeadline = daysRemaining <= 7;
  const isCompleted = percentComplete >= 100;

  const formattedCurrentAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(goal.currentAmount);

  const formattedTargetAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(goal.targetAmount);

  return (
    <div className="savings-goal-card animate-slide-in-bottom">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-900">{goal.name}</h3>
        <div className={cn(
          "text-xs font-semibold px-2 py-1 rounded-full",
          isCompleted 
            ? "bg-green-100 text-green-800" 
            : isNearDeadline 
              ? "bg-amber-100 text-amber-800" 
              : "bg-blue-100 text-blue-800"
        )}>
          {isCompleted 
            ? "Completed!" 
            : isNearDeadline 
              ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left` 
              : `${daysRemaining} days left`}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600">Progress</span>
          <span className="font-medium">{percentComplete}%</span>
        </div>
        
        <Progress 
          value={percentComplete} 
          className="h-2 bg-slate-200" 
          indicatorClassName={cn(
            isCompleted 
              ? "bg-finance-secondary" 
              : isNearDeadline 
                ? "bg-finance-warning" 
                : "bg-finance-primary"
          )} 
        />
        
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="text-finance-primary font-medium">{formattedCurrentAmount}</span>
          <span className="text-slate-600">{formattedTargetAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCard;
