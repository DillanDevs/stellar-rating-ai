import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import Overview from "./pages/Overview";
import Explore from "./pages/Explore";
import Predict from "./pages/Predict";
import Models from "./pages/Models";
import Monitor from "./pages/Monitor";
import FinOps from "./pages/FinOps";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full bg-gradient-subtle">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/models" element={<Models />} />
                <Route path="/monitor" element={<Monitor />} />
                <Route path="/finops" element={<FinOps />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
