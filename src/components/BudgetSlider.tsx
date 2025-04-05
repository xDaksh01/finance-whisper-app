
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface BudgetCategory {
  id: string;
  name: string;
  currentAmount: number;
  budgetAmount: number;
  color?: string;
}

interface BudgetSliderProps {
  category: BudgetCategory;
}

const BudgetSlider = ({ category }: BudgetSliderProps) => {
  const isMobile = useIsMobile();
  
  const percentComplete = Math.min(
    Math.round((category.currentAmount / category.budgetAmount) * 100),
    100
  );
  
  const formattedCurrentAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(category.currentAmount);

  const formattedBudgetAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(category.budgetAmount);

  return (
    <div className="py-3 animate-fade-in">
      <div className="flex justify-between items-center mb-1">
        <h3 className={cn(
          "font-medium text-slate-900",
          isMobile ? "text-sm" : "text-base"
        )}>
          {category.name}
        </h3>
        <span className="text-sm font-medium text-slate-900">{formattedBudgetAmount}</span>
      </div>
      
      <div className="relative h-2 bg-slate-200 rounded-full mb-1">
        <div 
          className={cn(
            "absolute left-0 top-0 h-full rounded-full",
            category.color || "bg-finance-primary"
          )}
          style={{ width: `${percentComplete}%` }}
        />
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 bg-white border-2 border-slate-400 rounded-full"
          style={{ left: `${percentComplete}%`, marginLeft: "-6px" }}
        />
      </div>
      
      <div className="flex justify-start mt-1">
        <span className="text-xs text-slate-600">{formattedCurrentAmount} spent</span>
      </div>
    </div>
  );
};

export default BudgetSlider;
