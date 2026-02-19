import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setRole } = useGame();

  const handleRole = (role: "teacher" | "student") => {
    setRole(role);
    navigate(role === "teacher" ? "/teacher" : "/village");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
          Choose Your Path
        </h1>
        <p className="font-body text-muted-foreground text-lg mb-12">
          Are you a wise mentor or a brave adventurer?
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Teacher Card */}
          <button
            onClick={() => handleRole("teacher")}
            className="fantasy-card p-10 hover-float cursor-pointer group text-left"
          >
            <div className="text-7xl mb-6 group-hover:animate-float">🧙‍♂️</div>
            <h2 className="font-display text-3xl text-foreground mb-3">The Mentor</h2>
            <p className="font-body text-muted-foreground">
              Guide your students through their quests. View analytics, track progress, and compare performances across your classroom.
            </p>
            <div className="mt-6 inline-block px-6 py-2 rounded-full bg-secondary text-secondary-foreground font-body font-semibold text-sm">
              Enter as Teacher →
            </div>
          </button>

          {/* Student Card */}
          <button
            onClick={() => handleRole("student")}
            className="fantasy-card p-10 hover-float cursor-pointer group text-left"
          >
            <div className="text-7xl mb-6 group-hover:animate-float">⚔️</div>
            <h2 className="font-display text-3xl text-foreground mb-3">The Adventurer</h2>
            <p className="font-body text-muted-foreground">
              Explore the knowledge village, enter magical huts, take on quests, and level up your skills through epic challenges!
            </p>
            <div className="mt-6 inline-block px-6 py-2 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm">
              Enter as Student →
            </div>
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-10 text-muted-foreground hover:text-foreground font-body transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
