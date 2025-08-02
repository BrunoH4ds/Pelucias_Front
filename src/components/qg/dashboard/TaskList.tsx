"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext"; // Usando o contexto

export const TaskList = () => {
  const { tasks, addTask, removeTask } = useTasks(); // Acessando as funções e as tarefas do contexto
  const [newTask, setNewTask] = useState("");

  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask); // Chama a função do contexto para adicionar a tarefa
      setNewTask(""); // Limpa o campo de entrada após adicionar
    }
  };

  return (
    <div className="mt-8 bg-zinc-800 border border-amber-400/50 p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-300 text-lg">Tarefas Pendentes</h3>

      {/* Formulário de Adição de Tarefa */}
      <div className="mt-4 flex items-center gap-4">
        <input
          type="text"
          className="w-full p-2 border-2 border-amber-400/50 rounded-md focus:outline-none ring-0 bg-zinc-700 text-white"
          placeholder="Adicionar nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 transition cursor-pointer"
          onClick={handleAddTask}
        >
          Adicionar
        </button>
      </div>

      {/* Lista de Tarefas */}
      <ul className="list-disc pl-6 mt-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center my-2">
              <span className="text-gray-200 font-bold text-lg">{task}</span>
              <button
                onClick={() => removeTask(task)} // Chama a função do contexto para remover a tarefa
                className="p-2 rounded-md bg-red-600 ml-4 hover:bg-red-700 cursor-pointer"
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-200">Não há tarefas pendentes.</li>
        )}
      </ul>
    </div>
  );
};
