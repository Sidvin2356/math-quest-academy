import { useNavigate } from "react-router-dom";
import { mockStudents } from "@/data/gameData";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["hsl(36,80%,50%)", "hsl(145,35%,28%)", "hsl(270,60%,55%)", "hsl(0,72%,51%)", "hsl(25,60%,40%)", "hsl(200,70%,50%)"];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const student = selectedStudent ? mockStudents.find(s => s.id === selectedStudent) : null;

  // Marks distribution data
  const distributionData = [
    { range: "90-100", count: mockStudents.filter(s => s.subjects[0].score >= 90).length },
    { range: "80-89", count: mockStudents.filter(s => s.subjects[0].score >= 80 && s.subjects[0].score < 90).length },
    { range: "70-79", count: mockStudents.filter(s => s.subjects[0].score >= 70 && s.subjects[0].score < 80).length },
    { range: "60-69", count: mockStudents.filter(s => s.subjects[0].score >= 60 && s.subjects[0].score < 70).length },
    { range: "Below 60", count: mockStudents.filter(s => s.subjects[0].score < 60).length },
  ];

  // Comparison data
  const comparisonData = mockStudents.map(s => ({
    name: s.name.split(" ")[0],
    score: s.subjects[0].score,
    level: s.level,
    xp: Math.round((s.xp / s.maxXp) * 100),
  }));

  // Performance trend (mock)
  const trendData = [
    { quiz: "Quiz 1", ...Object.fromEntries(mockStudents.map(s => [s.name.split(" ")[0], s.subjects[0].quizScores[0]])) },
    { quiz: "Quiz 2", ...Object.fromEntries(mockStudents.map(s => [s.name.split(" ")[0], s.subjects[0].quizScores[1]])) },
    { quiz: "Quiz 3", ...Object.fromEntries(mockStudents.map(s => [s.name.split(" ")[0], s.subjects[0].quizScores[2]])) },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">🧙‍♂️ Mentor's Chamber</h1>
            <p className="font-body text-muted-foreground mt-1">Grade 6 — Mathematics</p>
          </div>
          <button onClick={() => navigate("/role-select")} className="text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back
          </button>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {mockStudents.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStudent(s.id === selectedStudent ? null : s.id)}
              className={`fantasy-card p-4 text-center transition-all ${
                s.id === selectedStudent ? "ring-2 ring-primary gold-glow" : "hover-float"
              }`}
            >
              <span className="text-3xl block mb-2">{s.avatar}</span>
              <p className="font-display text-sm text-foreground truncate">{s.name.split(" ")[0]}</p>
              <p className="text-xs text-muted-foreground font-body">Lvl {s.level}</p>
              <div className="xp-bar mt-2">
                <div className="xp-bar-fill" style={{ width: `${(s.xp / s.maxXp) * 100}%` }} />
              </div>
              <p className="text-xs text-primary font-body font-bold mt-1">{s.subjects[0].score}%</p>
            </button>
          ))}
        </div>

        {/* Selected Student Detail */}
        {student && (
          <div className="fantasy-card p-6 mb-8">
            <h2 className="font-display text-2xl text-foreground mb-4">
              {student.avatar} {student.name}
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="wood-panel p-4 text-center">
                <p className="text-sm text-muted-foreground font-body">Level</p>
                <p className="text-3xl font-display text-foreground">{student.level}</p>
              </div>
              <div className="wood-panel p-4 text-center">
                <p className="text-sm text-muted-foreground font-body">XP</p>
                <p className="text-3xl font-display text-primary">{student.xp}/{student.maxXp}</p>
              </div>
              <div className="wood-panel p-4 text-center">
                <p className="text-sm text-muted-foreground font-body">Math Score</p>
                <p className="text-3xl font-display text-foreground">{student.subjects[0].score}%</p>
              </div>
              <div className="wood-panel p-4 text-center">
                <p className="text-sm text-muted-foreground font-body">Levels Done</p>
                <p className="text-3xl font-display text-secondary">{student.subjects[0].levelsCompleted}/4</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-body text-sm text-muted-foreground">Quiz History:</p>
              <div className="flex gap-2 mt-2">
                {student.subjects[0].quizScores.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary font-body text-sm font-bold">
                    Q{i + 1}: {s}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Marks Distribution */}
          <div className="fantasy-card p-6">
            <h3 className="font-display text-xl text-foreground mb-4">📊 Marks Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,25%,80%)" />
                <XAxis dataKey="range" tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(36,80%,50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Comparison */}
          <div className="fantasy-card p-6">
            <h3 className="font-display text-xl text-foreground mb-4">⚔️ Student Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,25%,80%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <YAxis tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="hsl(36,80%,50%)" name="Score %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="xp" fill="hsl(145,35%,28%)" name="XP %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Trend */}
          <div className="fantasy-card p-6">
            <h3 className="font-display text-xl text-foreground mb-4">📈 Quiz Performance Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,25%,80%)" />
                <XAxis dataKey="quiz" tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <YAxis tick={{ fontSize: 12, fontFamily: "Nunito" }} />
                <Tooltip />
                <Legend />
                {mockStudents.map((s, i) => (
                  <Line
                    key={s.id}
                    type="monotone"
                    dataKey={s.name.split(" ")[0]}
                    stroke={COLORS[i]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Score Pie Chart */}
          <div className="fantasy-card p-6">
            <h3 className="font-display text-xl text-foreground mb-4">🏆 Score Share</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockStudents.map(s => ({ name: s.name.split(" ")[0], value: s.subjects[0].score }))}
                  cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}
                  dataKey="value"
                >
                  {mockStudents.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
