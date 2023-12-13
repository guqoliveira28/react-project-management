import { useRef, useState } from "react";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import Project from "./components/Project";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  const newProject = useRef();

  function handleNewProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleCloseNewProject(save = false) {
    if (save) {
      const recievingProject = newProject.current.saveNewProject();
      setProjectsState((prevProjectsState) => {
        if (prevProjectsState.projects.length > 0) {
          recievingProject.id =
            prevProjectsState.projects.slice(-1).pop().id + 1;
        } else {
          recievingProject.id = 0;
        }
        return {
          ...prevProjectsState,
          projects: [...prevProjectsState.projects, recievingProject],
          selectedProjectId: undefined,
        };
      });
    } else {
      setProjectsState((prevProjectsState) => {
        return {
          ...prevProjectsState,
          selectedProjectId: undefined,
        };
      });
    }
  }

  function handleSelectProject(projectId) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: projectId,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.filter(
          (p) => p.id != prevProjectsState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTask(task) {
    const selectedProject = projectsState.projects.find(
      (p) => p.id === projectsState.selectedProjectId
    );
    if (selectedProject.tasks.length > 0) {
      selectedProject.tasks.push({
        id: selectedProject.tasks.slice(-1).pop().id + 1,
        text: task,
      });
    } else {
      selectedProject.tasks.push({ id: 0, text: task });
    }
    setProjectsState((prevProjectsState) => {
      prevProjectsState.projects[
        prevProjectsState.projects.findIndex((p) => p.id === selectedProject.id)
      ] = selectedProject;
      return {
        ...prevProjectsState,
        projects: [...prevProjectsState.projects],
      };
    });
  }

  function handleDeleteTask(task) {
    setProjectsState((prevProjectsState) => {
      const selectedProject = projectsState.projects.find(
        (p) => p.id === projectsState.selectedProjectId
      );
      selectedProject.tasks = selectedProject.tasks.filter(
        (t) => t.id != task.id
      );
      prevProjectsState.projects[
        prevProjectsState.projects.findIndex((p) => p.id === selectedProject.id)
      ] = selectedProject;
      return {
        ...prevProjectsState,
        projects: [...prevProjectsState.projects],
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === undefined) {
    content = <Landing newProject={handleNewProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        goBack={(save) => handleCloseNewProject(save)}
        ref={newProject}
      />
    );
  } else {
    content = (
      <Project
        projectsState={projectsState}
        addTask={(task) => handleAddTask(task)}
        deleteProject={handleDeleteProject}
        clearTask={(task) => handleDeleteTask(task)}
      />
    );
  }

  return (
    <div className="h-full mt-10 flex">
      <Sidebar
        projects={projectsState.projects}
        newProject={handleNewProject}
        selectProject={handleSelectProject}
        active={projectsState.selectedProjectId ?? undefined}
      />
      {content}
    </div>
  );
}

export default App;
