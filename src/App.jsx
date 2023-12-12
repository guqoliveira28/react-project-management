import { useRef, useState } from "react";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import Project from "./components/Project";

const projectsArray = [];

function App() {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projects, setProjects] = useState(projectsArray);
  const [selectedProject, setSelectedProject] = useState();
  const newProject = useRef();

  function handleNewProject() {
    setIsCreatingProject(true);
    setSelectedProject(undefined);
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

  function handleSelectProject(projectId) {
    const newSelectedProject = projects.find((p) => p.id === projectId);
    setSelectedProject(newSelectedProject);
    setIsCreatingProject(false);
  }

  function handleDeleteProject() {
    setProjects((prevProjects) => {
      return prevProjects.filter((p) => p.id != selectedProject.id);
    });
    setSelectedProject();
  }

  function handleAddTask(task) {
    if (selectedProject.tasks.length > 0) {
      selectedProject.tasks.push({
        id: selectedProject.tasks.slice(-1).pop().id + 1,
        text: task,
      });
    } else {
      selectedProject.tasks.push({ id: 0, text: task });
    }
    setProjects((prevProjects) => {
      prevProjects[prevProjects.findIndex((p) => p.id === selectedProject.id)] =
        selectedProject;
      return [...prevProjects];
    });
  }

  function handleDeleteTask(task) {
    setProjects((prevProjects) => {
      selectedProject.tasks = selectedProject.tasks.filter(
        (t) => t.id != task.id
      );
      prevProjects[prevProjects.findIndex((p) => p.id === selectedProject.id)] =
        selectedProject;
      setSelectedProject({
        ...selectedProject,
        tasks: [...selectedProject.tasks],
      });
      return [
        ...prevProjects.map((value) => {
          return { ...value, tasks: [...value.tasks] };
        }),
      ];
    });
  }

  return (
    <div className="h-full mt-10 flex">
      <Sidebar
        projects={projects}
        newProject={handleNewProject}
        selectProject={(id) => handleSelectProject(id)}
        active={selectedProject ? selectedProject.id : undefined}
      />
      {!isCreatingProject & !selectedProject ? (
        <Landing newProject={handleNewProject} />
      ) : undefined}
      {isCreatingProject && (
        <NewProject
          goBack={(save) => handleCloseNewProject(save)}
          ref={newProject}
        />
      )}
      {selectedProject && (
        <Project
          project={selectedProject}
          addTask={(task) => handleAddTask(task)}
          deleteProject={handleDeleteProject}
          clearTask={(task) => handleDeleteTask(task)}
        />
      )}
    </div>
  );
}

export default App;
