import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { mathLevels } from "@/data/gameData";

const QuizSelect = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">⏰ Choose Your Quest</h1>
            <p className="font-body text-muted-foreground mt-1">Select a level to begin the timed challenge</p>
          </div>
          <button onClick={() => navigate("/hut/math")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back to Hut
          </button>
        </div>

        <div className="space-y-4">
          {mathLevels.map((level) => {
            const completed = state.completedLevels.includes(level.id);
            const unlocked = level.id <= state.currentLevel;
            const score = state.quizScores[level.id];

            return (
              <button
                key={level.id}
                onClick={() => unlocked && navigate(`/quiz/${level.id}`)}
                disabled={!unlocked}
                className={`w-full fantasy-card p-6 flex items-center gap-6 text-left transition-all ${
                  unlocked ? "hover-float cursor-pointer" : "opacity-40 cursor-not-allowed"
                } ${completed ? "ring-2 ring-primary/50" : ""}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 shrink-0 ${
                  completed ? "bg-primary border-primary" : unlocked ? "bg-card border-primary pulse-glow" : "bg-muted border-border"
                }`}>
                  {unlocked ? level.icon : "🔒"}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-foreground">
                    Level {level.id}: {level.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{level.description}</p>
                  {score !== undefined && (
                    <p className="font-body text-sm text-primary font-bold mt-1">Best Score: {score}%</p>
                  )}
                </div>
                {completed && <span className="text-3xl">✅</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizSelect;
