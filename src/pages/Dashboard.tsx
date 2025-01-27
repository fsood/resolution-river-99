import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data for the chart
const data = [
  { name: "Jan", tickets: 40 },
  { name: "Feb", tickets: 30 },
  { name: "Mar", tickets: 45 },
  { name: "Apr", tickets: 50 },
  { name: "May", tickets: 35 },
];

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Dashboard = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Tickets</h3>
                <p className="text-2xl font-bold">150</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Unassigned</h3>
                <p className="text-2xl font-bold">23</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Overdue</h3>
                <p className="text-2xl font-bold">7</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Open</h3>
                <p className="text-2xl font-bold">45</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">On Hold</h3>
                <p className="text-2xl font-bold">12</p>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card className="p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Ticket Trends</h2>
              <ChartContainer className="h-[300px]" config={{}}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tickets"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ChartContainer>
            </Card>

            {/* Todo List */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Todo List</h2>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                />
                <Button onClick={handleAddTodo}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="rounded"
                      />
                      <span
                        className={`${
                          todo.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;