import { useRef, useState } from "react";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";

const projectsArray = [];

function App() {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projects, setProjects] = useState(projectsArray);
  const newProject = useRef();

  function handleNewProject() {
    setIsCreatingProject(true);
  }
  function handleCloseNewProject(save = false) {
    if (save) {
      const recievingProject = newProject.current.saveNewProject();
      setProjects((prevProjects) => {
        if (prevProjects.length > 0) {
          recievingProject.id = prevProjects.slice(-1).pop().id + 1;
        } else {
          recievingProject.id = 0;
        }
        return [...prevProjects, recievingProject];
      });
    }
    setIsCreatingProject(false);
  }

  return (
    <div className="h-full mt-10 flex">
      <Sidebar projects={projects} newProject={handleNewProject} />
      {!isCreatingProject && <Landing newProject={handleNewProject} />}
      {isCreatingProject && (
        <NewProject
          goBack={(save) => handleCloseNewProject(save)}
          ref={newProject}
        />
      )}
    </div>
  );
}

export default App;
