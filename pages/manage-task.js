import React from "react";
import Head from "next/head";
const initialState = [
  {
    id: 1,
    title: "Buy Food",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Fix Laptop",
    isCompleted: false,
  },
];
export default function ManageTaskPage() {
  const [loading, setLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [tasks, setTasks] = React.useState(initialState);
  const [task, setTask] = React.useState("");
  const [taskId, setTaskId] = React.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      const newTasks = [
        ...tasks,
        { id: tasks.length + 1, title: task, isCompleted: false },
      ];
      setTasks(newTasks);
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    setTimeout(() => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      setIsDeleting(false);
    }, 500);
  };

  const handleComplete = async (id) => {
    setTimeout(() => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );
      setTasks(newTasks);
    }, 100);
  };
  return (
    <>
      <Head>
        <title>Manage Task</title>
      </Head>

      <div className="flex flex-col space-y-10 w-96">
        <div>
          <h1 className="text-4xl font-black mb-6">Manage Task</h1>
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <fieldset>
              <input
                type="text"
                id="task"
                className="w-full rounded border p-2 outline-none focus:border-gray-400"
                placeholder="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </fieldset>
            <button
              type="submit"
              className={
                loading
                  ? "opacity-50 cursor-not-allowed bg-indigo-600 text-white shadow-md rounded w-full block mt-4 p-3"
                  : "mt-4 p-3 bg-indigo-600 text-white rounded w-full block shadow-md"
              }
            >
              Add New Task
            </button>
          </form>
        </div>

        <div className="flex flex-col space-y-3 text-sm" id="task-list">
          {tasks.map((task) => (
            <div
              className="flex items-center justify-between border p-2 rounded font-bold border-gray-600"
              key={task.id}
              id={task.id}
            >
              <p
                onClick={() => {
                  handleComplete(task.id);
                }}
                className={
                  task.isCompleted
                    ? "completed cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {task.title}
              </p>
              <button
                className={`bg-red-500 p-2 text-xs text-white rounded ${
                  isDeleting && task.id === taskId
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  setTaskId(task.id);
                  handleDelete(task.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
