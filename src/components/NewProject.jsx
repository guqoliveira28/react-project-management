import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal from "./Modal";

const inputClasses =
  "px-2 py-1 bg-stone-200 text-lg border-b-2 border-stone-300 outline-none";
const labelClasses = "font-bold uppercase text-stone-500 mt-5";

const NewProject = forwardRef(function NewProject({ goBack }, ref) {
  const modal = useRef();
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

  function validateSave() {
    if (
      formData.current.title.value.trim() === "" ||
      formData.current.description.value.trim() === "" ||
      formData.current.date.value.trim() === ""
    ) {
      modal.current.open();
    } else {
      goBack(true);
    }
  }

  return (
    <>
      <Modal ref={modal} buttonLabel="Close">
        <h2 className="text-stone-600 capitalize text-2xl font-bold my-4">
          Invalid Input
        </h2>
        <p className="text-stone-400 text-lg">
          Please provide a valid value for every input field.
        </p>
      </Modal>
      <div className="ml-5 mr-24 flex flex-col w-full mt-10">
        <div className="text-right">
          <button className="px-4 py-2" onClick={goBack}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black rounded-lg text-amber-50"
            onClick={validateSave}
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
    </>
  );
});

export default NewProject;
