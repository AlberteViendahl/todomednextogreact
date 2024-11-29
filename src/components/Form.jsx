"use client";
import { useState } from "react";
import ListItem from "./ListItem";

const Form = () => {
  // State til opgaver - starter med et tomt array
  const [tasks, setTasks] = useState([]);

  // Funktion til at tilføje en ny opgave
  function addTask(event) {
    event.preventDefault(); // Forhindrer siden i at reloade ved submit

    // Henter data fra formularen
    const formData = new FormData(event.target);
    const taskText = formData.get("task"); // Henter opgave-teksten fra inputfeltet

    // Opretter en ny opgave som objekt med unik ID
    const newTask = {
      id: crypto.randomUUID(), // Genererer unikt ID til hver opgave
      text: taskText,
      completed: false, // Ny opgave er ikke fuldført som udgangspunkt
    };

    // Tilføjer den nye opgave til tasks arrayet uden at ændre det gamle array direkte
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Rydder formularen efter opgaven er tilføjet
    event.target.reset();
  }

  // Funktion til at skifte status på en opgave (to-do <--> done)
  const toggleTaskCompletion = (taskId) => {
    // Mapper igennem tasks og skifter 'completed' for opgaven med det valgte ID
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Funktion til at slette en opgave
  const deleteTask = (taskId) => {
    // Filtrerer opgaverne og fjerner den, der matcher det valgte ID
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Filtrerer opgaverne, så kun de ufærdige vises i ToDo-listen
  const toDoTasks = tasks.filter((task) => !task.completed);

  // Filtrerer opgaverne, så kun de færdige vises i Done-listen
  const doneTasks = tasks.filter((task) => task.completed);

  return (
    <section>
      {/* Formular til at tilføje nye opgaver */}
      <form onSubmit={addTask} className="mt-20">
        <input
          className="bg-slate-200 rounded-15 pl-5 pr-5 mr-10"
          type="text"
          name="task" // Inputfelt til opgaveteksten
          placeholder="Add a new to do"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-15">
          Add
        </button>
      </form>

      {/* ToDo Sektion - ufærdige opgaver */}
      <h1 className="font-bold">Todo</h1>
      <ListItem
        tasks={toDoTasks} // Viser kun opgaver, der ikke er fuldførte
        onTaskClick={toggleTaskCompletion} // Funktionskald til at skifte status
        deleteTask={deleteTask} // Passer delete-funktionen videre
        section="ToDo"
      />

      {/* Done Sektion - færdige opgaver */}
      <h1 className="font-bold">Done</h1>
      <ListItem
        tasks={doneTasks} // Viser kun opgaver, der er fuldførte
        onTaskClick={toggleTaskCompletion} // Funktionskald til at skifte status
        deleteTask={deleteTask} // Passer delete-funktionen videre
        section="Done"
      />
    </section>
  );
};

export default Form;
