"use client";
import { RxCross1 } from "react-icons/rx";

const ListItem = ({ tasks, onTaskClick, deleteTask }) => {
  return (
    <ul className="mt-10">
      {tasks.map((task) => (
        <li
          key={task.id} // Unikt ID til hver opgave
          className="bg-gray-100 p-2 rounded-15 mb-2 cursor-pointer flex justify-between"
          onClick={() => onTaskClick(task.id)} // Skifter status når der klikkes
        >
          {/* Viser opgave-teksten */}
          {task.text}

          {/* Slet ikon */}
          <div
            onClick={(e) => {
              e.stopPropagation(); // Forhindrer onTaskClick i at blive trigget
              deleteTask(task.id); // Sletter opgaven, når der klikkes på ikonet
            }}
            className="flex justify-end"
          >
            <RxCross1 />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
