import { useRef, useState } from "react";

export default function Project({
  projectsState,
  addTask,
  deleteProject,
  clearTask,
}) {
  const project = projectsState.projects.find(
    (p) => p.id === projectsState.selectedProjectId
  );
  const date = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const tasks = project.tasks;
  const taskRef = useRef();
  const noTasks = tasks.length <= 0;

  function newTask() {
    addTask(taskRef.current.value);
    taskRef.current.value = "";
  }

  function handleClearTask(task) {
    clearTask(task);
  }

  return (
    <div className="w-full mt-10 ml-5 mr-20 text-stone-700 text-lg">
      <div className="flex flex-row items-stretch">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <button onClick={deleteProject} className="text-right ml-auto">
          Delete
        </button>
      </div>
      <p className="py-4 text-stone-400">{date}</p>
      <p className="pb-4 text-lg">{project.description}</p>
      <div className="h-1 w-full bg-stone-300"></div>
      <h2 className="text-2xl font-bold my-4">Tasks</h2>
      <div>
        <input
          ref={taskRef}
          type="text"
          className="w-80 px-2 py-1 bg-stone-200 text-lg border-b-2 border-stone-300 outline-none"
        />
        <button className="px-4 py-2" onClick={newTask}>
          Add Task
        </button>
      </div>
      <div className="pt-4">
        {noTasks ? <p>This project does not have any tasks yet.</p> : undefined}
        {!noTasks ? (
          <div className="bg-stone-100 px-4 py-8 flex flex-col gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex flex-row">
                <p>{task.text}</p>
                <button
                  onClick={() => handleClearTask(task)}
                  className="ml-auto"
                >
                  Clear
                </button>
              </div>
            ))}
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
