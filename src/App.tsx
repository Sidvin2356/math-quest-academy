import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/context/GameContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentVillage from "./pages/StudentVillage";
import MathHut from "./pages/MathHut";
import QuizSelect from "./pages/QuizSelect";
import Quiz from "./pages/Quiz";
import Resources from "./pages/Resources";
import Performance from "./pages/Performance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/village" element={<StudentVillage />} />
            <Route path="/hut/:subjectId" element={<MathHut />} />
            <Route path="/quiz-select" element={<QuizSelect />} />
            <Route path="/quiz/:levelId" element={<Quiz />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
