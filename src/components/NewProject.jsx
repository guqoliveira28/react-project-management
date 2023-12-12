import { forwardRef, useImperativeHandle, useRef } from "react";

const inputClasses =
  "px-2 py-1 bg-stone-200 text-lg border-b-2 border-stone-300 outline-none";
const labelClasses = "font-bold uppercase text-stone-500 mt-5";

const NewProject = forwardRef(function NewProject({ goBack }, ref) {
  const formData = useRef();

  useImperativeHandle(ref, () => {
    return {
      saveNewProject() {
        return {
          title: formData.current.title.value,
          description: formData.current.description.value,
          date: formData.current.date.value,
          tasks: [],
        };
      },
    };
  });
  return (
    <div className="ml-5 mr-24 flex flex-col w-full mt-10">
      <div className="text-right">
        <button className="px-4 py-2" onClick={goBack}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-black rounded-lg text-amber-50"
          onClick={() => goBack(true)}
        >
          Save
        </button>
      </div>
      <form ref={formData} className="flex flex-col text-stone-600">
        <label htmlFor="title" className={labelClasses}>
          Title
        </label>
        <input id="title" type="text" className={inputClasses} />
        <label htmlFor="description" className={labelClasses}>
          Description
        </label>
        <textarea id="description" className={inputClasses}></textarea>
        <label htmlFor="date" className={labelClasses}>
          Due Date
        </label>
        <input id="date" type="date" className={inputClasses} />
      </form>
    </div>
  );
});

export default NewProject;
