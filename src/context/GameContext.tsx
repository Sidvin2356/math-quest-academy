import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
  role: "teacher" | "student" | null;
  studentName: string;
  currentLevel: number;
  completedLevels: number[];
  quizScores: Record<number, number>;
  xp: number;
}

interface GameContextType {
  state: GameState;
  setRole: (role: "teacher" | "student") => void;
  setStudentName: (name: string) => void;
  completeLevel: (level: number, score: number) => void;
  resetGame: () => void;
}

const defaultState: GameState = {
  role: null,
  studentName: "",
  currentLevel: 1,
  completedLevels: [],
  quizScores: {},
  xp: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(defaultState);

  const setRole = (role: "teacher" | "student") => setState(prev => ({ ...prev, role }));
  const setStudentName = (name: string) => setState(prev => ({ ...prev, studentName: name }));
  
  const completeLevel = (level: number, score: number) => {
    setState(prev => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, level])],
      quizScores: { ...prev.quizScores, [level]: Math.max(prev.quizScores[level] || 0, score) },
      currentLevel: Math.max(prev.currentLevel, level + 1),
      xp: prev.xp + score * 2,
    }));
  };

  const resetGame = () => setState(defaultState);

  return (
    <GameContext.Provider value={{ state, setRole, setStudentName, completeLevel, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
