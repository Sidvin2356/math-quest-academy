import heroBanner from "@/assets/hero-banner.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="animate-float mb-6">
            <span className="text-6xl">✨</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 drop-shadow-lg">
            Quest<span className="text-primary">Academy</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Embark on an epic learning adventure! Explore magical huts, conquer knowledge quests, and level up your skills in a world where education meets adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/role-select")}
              className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-display tracking-wide"
              size="lg"
            >
              ⚔️ Begin Your Quest
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl text-center text-foreground mb-12">
            Your Adventure Awaits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏰", title: "Explore Villages", desc: "Navigate through enchanted villages where each hut holds a different subject to master." },
              { icon: "⚔️", title: "Conquer Quests", desc: "Take on timed quizzes and challenges to earn XP and climb the leaderboard." },
              { icon: "📊", title: "Track Progress", desc: "Watch your knowledge graph grow as you complete levels and master new topics." },
            ].map((feature, i) => (
              <div key={i} className="fantasy-card p-8 text-center hover-float">
                <span className="text-5xl block mb-4">{feature.icon}</span>
                <h3 className="font-display text-2xl text-foreground mb-3">{feature.title}</h3>
                <p className="font-body text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-body border-t border-border">
        <p>🏰 QuestAcademy — Where Learning Becomes an Adventure</p>
      </footer>
    </div>
  );
};

export default Index;
