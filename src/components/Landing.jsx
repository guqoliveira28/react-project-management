import projectImage from "../assets/no-projects.png";

export default function Landing() {
  return (
    <div className="flex flex-col text-center w-full mt-20">
      <img
        src={projectImage}
        alt="Image representing projects"
        className="h-20 object-contain"
      />
      <h2 className="text-stone-600 capitalize text-2xl font-bold my-5">
        No project selected
      </h2>
      <p className="text-stone-400 text-lg">
        Select a project or get started with a new one
      </p>
      <button className="mt-10 px-5 py-2 bg-stone-900 w-fit mx-auto rounded-lg text-stone-400">
        Create new project
      </button>
    </div>
  );
}
