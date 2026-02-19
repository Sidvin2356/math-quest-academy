import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import villageScene from "@/assets/village-scene.jpg";

const subjects = [
  { id: "math", name: "Mathematics", icon: "🔢", description: "Numbers, Fractions, Decimals & Equations", available: true, position: { top: "20%", left: "10%" } },
  { id: "science", name: "Science", icon: "🔬", description: "Coming Soon!", available: false, position: { top: "15%", right: "15%" } },
  { id: "english", name: "English", icon: "📖", description: "Coming Soon!", available: false, position: { bottom: "25%", left: "15%" } },
  { id: "history", name: "History", icon: "🏛️", description: "Coming Soon!", available: false, position: { bottom: "20%", right: "10%" } },
];

const StudentVillage = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/role-select")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back
          </button>
          <h1 className="font-display text-xl text-foreground">🏰 Knowledge Village</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-muted-foreground">XP: <span className="text-primary font-bold">{state.xp}</span></span>
          <span className="font-body text-sm text-muted-foreground">⚔️ Adventurer</span>
        </div>
      </div>

      {/* Village Scene */}
      <div className="relative w-full" style={{ minHeight: "80vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${villageScene})` }}
        >
          <div className="absolute inset-0 bg-background/20" />
        </div>

        {/* Hut Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 p-10 min-h-[80vh]">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => subject.available && navigate(`/hut/${subject.id}`)}
              disabled={!subject.available}
              className={`fantasy-card p-8 text-center w-56 transition-all ${
                subject.available
                  ? "hover-float cursor-pointer pulse-glow"
                  : "opacity-50 cursor-not-allowed grayscale"
              }`}
            >
              <span className="text-6xl block mb-4">{subject.icon}</span>
              <h3 className="font-display text-xl text-foreground mb-2">{subject.name}</h3>
              <p className="font-body text-sm text-muted-foreground">{subject.description}</p>
              {subject.available ? (
                <div className="mt-4 px-4 py-1 bg-primary/20 rounded-full text-primary font-body text-xs font-bold inline-block">
                  Enter Hut →
                </div>
              ) : (
                <div className="mt-4 px-4 py-1 bg-muted rounded-full text-muted-foreground font-body text-xs inline-block">
                  🔒 Locked
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentVillage;
