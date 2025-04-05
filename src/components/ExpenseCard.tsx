
import { cn } from "@/lib/utils";

export type ExpenseCategory = 
  | "food" 
  | "shopping" 
  | "transport" 
  | "entertainment" 
  | "utilities" 
  | "health" 
  | "education" 
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

const categoryColors: Record<ExpenseCategory, string> = {
  food: "bg-amber-100 text-amber-800",
  shopping: "bg-blue-100 text-blue-800",
  transport: "bg-green-100 text-green-800",
  entertainment: "bg-purple-100 text-purple-800",
  utilities: "bg-slate-100 text-slate-800",
  health: "bg-red-100 text-red-800",
  education: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800"
};

const categoryNames: Record<ExpenseCategory, string> = {
  food: "Food & Dining",
  shopping: "Shopping",
  transport: "Transportation",
  entertainment: "Entertainment",
  utilities: "Utilities",
  health: "Health",
  education: "Education",
  other: "Other"
};

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
  
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(expense.amount);

  return (
    <div className="expense-card animate-slide-in-bottom">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "expense-category-pill",
            categoryColors[expense.category]
          )}>
            {categoryNames[expense.category]}
          </div>
          <p className="text-sm font-medium text-slate-600">{formattedDate}</p>
        </div>
        <p className="text-lg font-semibold text-slate-900">{formattedAmount}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">{expense.description}</p>
    </div>
  );
};

export default ExpenseCard;
