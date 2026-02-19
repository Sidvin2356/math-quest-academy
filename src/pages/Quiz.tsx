import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { mathQuestions, mathLevels } from "@/data/gameData";
import { useState, useEffect, useCallback } from "react";

const Quiz = () => {
  const { levelId } = useParams();
  const level = parseInt(levelId || "1");
  const navigate = useNavigate();
  const { completeLevel } = useGame();

  const questions = mathQuestions.filter(q => q.level === level);
  const levelInfo = mathLevels.find(l => l.id === level);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const [finished, setFinished] = useState(false);

  const handleFinish = useCallback((finalScore: number) => {
    const percentage = Math.round((finalScore / questions.length) * 100);
    completeLevel(level, percentage);
    setFinished(true);
  }, [questions.length, level, completeLevel]);

  useEffect(() => {
    if (finished || showResult) return;
    if (timer <= 0) {
      // Time's up for this question, move on
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setTimer(30);
        setSelected(null);
      } else {
        handleFinish(score);
      }
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, finished, showResult, currentQ, questions.length, score, handleFinish]);

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === questions[currentQ].correctAnswer;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setShowResult(true);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
        setShowResult(false);
        setTimer(30);
      } else {
        handleFinish(newScore);
      }
    }, 1500);
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="fantasy-card p-10 text-center max-w-md w-full gold-glow">
          <span className="text-7xl block mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "💪"}</span>
          <h1 className="font-display text-4xl text-foreground mb-2">Quest Complete!</h1>
          <p className="font-body text-muted-foreground mb-4">{levelInfo?.name}</p>
          <p className="font-display text-6xl text-primary mb-2">{percentage}%</p>
          <p className="font-body text-muted-foreground mb-6">
            {score}/{questions.length} correct
          </p>
          <p className="font-body text-sm text-xp font-bold mb-6">+{percentage * 2} XP earned!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setTimer(30); setFinished(false); }}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-body font-bold hover:bg-secondary/90 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/quiz-select")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-body font-bold hover:bg-primary/90 transition-colors"
            >
              Back to Quests
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-foreground">{levelInfo?.icon} Level {level}: {levelInfo?.name}</h1>
            <p className="font-body text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl border-2 ${
            timer <= 10 ? "border-destructive text-destructive" : "border-primary text-primary"
          } ${timer <= 5 ? "pulse-glow" : ""}`}>
            {timer}
          </div>
        </div>

        {/* Progress */}
        <div className="xp-bar mb-8">
          <div className="xp-bar-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>

        {/* Question */}
        <div className="fantasy-card p-8 mb-6">
          <p className="font-body text-xl text-foreground text-center">{question.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option, i) => {
            let style = "fantasy-card p-5 text-center font-body text-lg transition-all cursor-pointer hover-float";
            if (showResult) {
              if (i === question.correctAnswer) style += " ring-2 ring-xp bg-xp/10";
              else if (i === selected) style += " ring-2 ring-destructive bg-destructive/10";
            } else if (selected === i) {
              style += " ring-2 ring-primary";
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={style}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
