import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

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
        <EmployeeSidebar />
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
                <h3 className="text-sm font-medium text-muted-foreground">Unresolved</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Overdue</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Due today</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Open</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">On Hold</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Todo List */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">To-do</h2>
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
                {todos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    You have no tasks to do!
                  </div>
                ) : (
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
                )}
              </Card>

              {/* Customer Satisfaction */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Customer satisfaction</h2>
                <p className="text-sm text-muted-foreground mb-4">My tickets this month</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Responses received</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Positive</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Neutral</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Negative</span>
                    <span>0%</span>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;