import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import hutInterior from "@/assets/hut-interior.jpg";
import { mathLevels } from "@/data/gameData";

const MathHut = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/village")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back to Village
          </button>
          <h1 className="font-display text-xl text-foreground">🔢 Math Hut</h1>
        </div>
        <span className="font-body text-sm text-primary font-bold">XP: {state.xp}</span>
      </div>

      {/* Interior Scene */}
      <div className="relative w-full min-h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hutInterior})` }}
        >
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] p-6">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2 drop-shadow-lg">
            Welcome to the Math Hut
          </h2>
          <p className="font-body text-muted-foreground mb-10 text-center max-w-lg">
            Choose an object to interact with. Each one holds a different power!
          </p>

          {/* Interactive Objects */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl w-full">
            {/* Book - Resources */}
            <button
              onClick={() => navigate("/resources")}
              className="fantasy-card p-8 text-center interactive-object group"
            >
              <span className="text-6xl block mb-4 group-hover:animate-float">📚</span>
              <h3 className="font-display text-2xl text-foreground mb-2">Ancient Scrolls</h3>
              <p className="font-body text-sm text-muted-foreground">
                Open the books on the desk to discover learning resources and lessons.
              </p>
              <div className="mt-4 text-xs text-primary font-body font-bold">📖 Study & Learn</div>
            </button>

            {/* Clock - Quiz */}
            <button
              onClick={() => navigate("/quiz-select")}
              className="fantasy-card p-8 text-center interactive-object group"
            >
              <span className="text-6xl block mb-4 group-hover:animate-float">⏰</span>
              <h3 className="font-display text-2xl text-foreground mb-2">Enchanted Clock</h3>
              <p className="font-body text-sm text-muted-foreground">
                The wall clock activates a timed challenge. Test your knowledge under pressure!
              </p>
              <div className="mt-4 text-xs text-primary font-body font-bold">⚔️ Take a Quiz</div>
            </button>

            {/* Cupboard - Performance */}
            <button
              onClick={() => navigate("/performance")}
              className="fantasy-card p-8 text-center interactive-object group"
            >
              <span className="text-6xl block mb-4 group-hover:animate-float">🗄️</span>
              <h3 className="font-display text-2xl text-foreground mb-2">Potion Cabinet</h3>
              <p className="font-body text-sm text-muted-foreground">
                Check the cupboard to see your progress potions and performance charts.
              </p>
              <div className="mt-4 text-xs text-primary font-body font-bold">📊 View Progress</div>
            </button>
          </div>

          {/* Level Progress */}
          <div className="mt-12 w-full max-w-3xl">
            <h3 className="font-display text-xl text-foreground mb-4 text-center">🗺️ Knowledge Map</h3>
            <div className="flex items-center gap-2 justify-center flex-wrap">
              {mathLevels.map((level, i) => {
                const completed = state.completedLevels.includes(level.id);
                const current = state.currentLevel === level.id;
                return (
                  <div key={level.id} className="flex items-center gap-2">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                        completed
                          ? "bg-primary border-primary gold-glow"
                          : current
                          ? "bg-card border-primary pulse-glow"
                          : "bg-muted border-border opacity-50"
                      }`}
                    >
                      {level.icon}
                    </div>
                    {i < mathLevels.length - 1 && (
                      <div className={`w-8 h-1 rounded ${completed ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathHut;
