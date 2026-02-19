import { useNavigate } from "react-router-dom";
import { mathResources, mathLevels } from "@/data/gameData";
import { useState } from "react";

const typeIcons: Record<string, string> = { lesson: "📜", video: "🎬", practice: "⚗️" };

const Resources = () => {
  const navigate = useNavigate();
  const [filterLevel, setFilterLevel] = useState<number | null>(null);

  const filtered = filterLevel ? mathResources.filter(r => r.level === filterLevel) : mathResources;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">📚 Ancient Scrolls</h1>
            <p className="font-body text-muted-foreground mt-1">Study materials and learning resources</p>
          </div>
          <button onClick={() => navigate("/hut/math")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back to Hut
          </button>
        </div>

        {/* Level Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilterLevel(null)}
            className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
              filterLevel === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Levels
          </button>
          {mathLevels.map(l => (
            <button
              key={l.id}
              onClick={() => setFilterLevel(l.id)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
                filterLevel === l.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {l.icon} {l.name}
            </button>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-4">
          {filtered.map((resource, i) => (
            <div key={i} className="fantasy-card p-5 flex items-start gap-4 hover-float">
              <span className="text-3xl">{typeIcons[resource.type]}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg text-foreground">{resource.title}</h3>
                  <span className="px-2 py-0.5 bg-primary/15 text-primary rounded text-xs font-body font-bold">
                    Lvl {resource.level}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{resource.description}</p>
              </div>
              <span className="text-xs font-body text-muted-foreground capitalize bg-muted px-3 py-1 rounded-full">
                {resource.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
