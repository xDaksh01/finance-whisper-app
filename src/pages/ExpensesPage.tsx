
import { useState } from "react";
import { Filter, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExpenseCard, { Expense, ExpenseCategory } from "@/components/ExpenseCard";

// Mock data
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
  },
  {
    id: "4",
    amount: 79.99,
    category: "shopping",
    description: "New headphones",
    date: "2025-04-01"
  },
  {
    id: "5",
    amount: 10.99,
    category: "food",
    description: "Coffee shop",
    date: "2025-03-31"
  },
  {
    id: "6",
    amount: 200.00,
    category: "utilities",
    description: "Electricity bill",
    date: "2025-03-30"
  },
  {
    id: "7",
    amount: 150.00,
    category: "health",
    description: "Gym membership",
    date: "2025-03-29"
  }
];

const categories: Array<{ value: ExpenseCategory, label: string }> = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" }
];

const ExpensesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | "all">("all");
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  
  const filteredExpenses = selectedCategory === "all"
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);
  
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount, 
    0
  );
  
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(totalAmount);

  return (
    <div className="pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Expenses</h1>
        <p className="text-slate-600 mt-1">Track and manage your spending</p>
      </div>
      
      {/* Summary Card */}
      <div className="px-4 mb-4">
        <Card className="bg-gradient-to-r from-finance-primary to-finance-info p-4">
          <div className="text-white">
            <h2 className="text-sm font-medium text-white/80">Total Expenses</h2>
            <p className="text-2xl font-bold">{formattedTotal}</p>
            <p className="text-sm mt-1 text-white/80">
              {filteredExpenses.length} transaction{filteredExpenses.length !== 1 ? 's' : ''}
            </p>
          </div>
        </Card>
      </div>
      
      {/* Filter Controls */}
      <div className="px-4 mb-4 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Filter size={14} />
          <span>Filter</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Calendar size={14} />
          <span>Date Range</span>
        </Button>
      </div>
      
      {/* Category Pills */}
      <div className="px-4 mb-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full ${
              selectedCategory === "all" 
                ? "bg-finance-primary text-white" 
                : "bg-slate-100 text-slate-600"
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full ${
                selectedCategory === category.value 
                  ? "bg-finance-primary text-white" 
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Expense List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">Transactions</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
          >
            <Plus size={14} />
            <span>Add New</span>
          </Button>
        </div>
        
        {filteredExpenses.length > 0 ? (
          <div className="space-y-3">
            {filteredExpenses.map(expense => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No expenses found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
