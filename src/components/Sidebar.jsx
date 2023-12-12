export default function Sidebar({
  projects,
  newProject,
  active,
  selectProject,
}) {
  return (
    <div className="flex-none h-full w-4/12 bg-black rounded-tr-2xl px-10">
      <h2 className="text-amber-50 uppercase font-bold text-2xl mt-10">
        Your Projects
      </h2>
      <button
        className="my-10 px-4 py-2 text-stone-400 bg-amber-50 bg-opacity-25 rounded-lg capitalize hover:text-stone-300 hover:bg-opacity-30"
        onClick={newProject}
      >
        + Add project
      </button>
      <div>
        {projects.map((project) => {
          let activeClasses = "bg-amber-50 bg-opacity-0";
          if (project.id === active) {
            activeClasses = "text-stone-300 bg-opacity-10";
          }
          return (
            <div key={project.id} className="text-stone-400 text-lg">
              <button
                onClick={() => selectProject(project.id)}
                className={
                  "px-2 py-1 mb-2 w-full text-left rounded-md bg-amber-50 hover:bg-opacity-10 hover:text-stone-300 " +
                  activeClasses
                }
              >
                {project.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
