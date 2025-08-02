// context/TaskContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipo para a tarefa
interface TaskContextType {
  tasks: string[];
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
  loadTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<string[]>([]);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  // Função para carregar as tarefas do localStorage
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = (task: string) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Salva no localStorage
  };

  // Função para remover uma tarefa
  const removeTask = (task: string) => {
    const updatedTasks = tasks.filter(t => t !== task);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Atualiza o localStorage
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, loadTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
