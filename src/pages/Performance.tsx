import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { mathLevels } from "@/data/gameData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const Performance = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  const barData = mathLevels.map(l => ({
    name: l.name,
    score: state.quizScores[l.id] || 0,
  }));

  const radarData = mathLevels.map(l => ({
    subject: l.name,
    score: state.quizScores[l.id] || 0,
    fullMark: 100,
  }));

  const totalCompleted = state.completedLevels.length;
  const avgScore = totalCompleted > 0
    ? Math.round(Object.values(state.quizScores).reduce((a, b) => a + b, 0) / totalCompleted)
    : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">🗄️ Potion Cabinet</h1>
            <p className="font-body text-muted-foreground mt-1">Your performance and progress report</p>
          </div>
          <button onClick={() => navigate("/hut/math")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back to Hut
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className="fantasy-card p-5 text-center">
            <p className="font-body text-sm text-muted-foreground">Total XP</p>
            <p className="font-display text-3xl text-primary">{state.xp}</p>
          </div>
          <div className="fantasy-card p-5 text-center">
            <p className="font-body text-sm text-muted-foreground">Levels Done</p>
            <p className="font-display text-3xl text-foreground">{totalCompleted}/4</p>
          </div>
          <div className="fantasy-card p-5 text-center">
            <p className="font-body text-sm text-muted-foreground">Avg Score</p>
            <p className="font-display text-3xl text-secondary">{avgScore}%</p>
          </div>
          <div className="fantasy-card p-5 text-center">
            <p className="font-body text-sm text-muted-foreground">Current Level</p>
            <p className="font-display text-3xl text-foreground">{state.currentLevel}</p>
          </div>
        </div>

        {totalCompleted === 0 ? (
          <div className="fantasy-card p-10 text-center">
            <span className="text-6xl block mb-4">🗺️</span>
            <h2 className="font-display text-2xl text-foreground mb-2">No Quests Completed Yet</h2>
            <p className="font-body text-muted-foreground mb-6">
              Head to the Enchanted Clock to take your first quiz and start tracking your progress!
            </p>
            <button
              onClick={() => navigate("/quiz-select")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-body font-bold hover:bg-primary/90 transition-colors"
            >
              Start a Quest
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="fantasy-card p-6">
              <h3 className="font-display text-xl text-foreground mb-4">📊 Scores by Level</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,25%,80%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(36,80%,50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="fantasy-card p-6">
              <h3 className="font-display text-xl text-foreground mb-4">🕸️ Skill Web</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(30,25%,80%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: "Nunito" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar dataKey="score" stroke="hsl(36,80%,50%)" fill="hsl(36,80%,50%)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Level Progress Map */}
        <div className="mt-8">
          <h3 className="font-display text-xl text-foreground mb-4">🗺️ Quest Progress</h3>
          <div className="space-y-3">
            {mathLevels.map(level => {
              const completed = state.completedLevels.includes(level.id);
              const score = state.quizScores[level.id];
              return (
                <div key={level.id} className={`fantasy-card p-4 flex items-center gap-4 ${completed ? "ring-1 ring-primary/30" : ""}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${
                    completed ? "bg-primary border-primary" : "bg-muted border-border"
                  }`}>
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-foreground">Level {level.id}: {level.name}</p>
                    <div className="xp-bar mt-1">
                      <div className="xp-bar-fill" style={{ width: `${score || 0}%` }} />
                    </div>
                  </div>
                  <span className="font-body font-bold text-sm text-primary">{score !== undefined ? `${score}%` : "—"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
