"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  name: string;
}

interface TaskMenu {
  taskMenu: Task[];
}

export default function TasksMenu({ taskMenu }: TaskMenu) {
  const { teamid, tasklistid } = useParams();

  return (
    <ul className="mb-6 flex gap-2 py-[5px]">
      {taskMenu.map((list) => (
        <li
          className={`rounded-full px-2.5 py-1 ${tasklistid === String(list.id) ? "bg-brand-active" : "bg-dropDown-default"}`}
          key={list.id}
        >
          <Link
            href={`/${teamid}/tasks/${list.id}`}
            className={`block min-w-[60px] text-center text-lg ${tasklistid === String(list.id) ? "font-bold text-default-light" : "font-medium text-placeHolder"}`}
          >
            {list.name}
          </Link>
        </li>
      ))}
      <li />
    </ul>
  );
}
