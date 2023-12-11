export default function Sidebar() {
  return (
    <div className="flex-none h-full w-4/12 bg-black rounded-tr-2xl px-10">
      <h2 className="text-amber-50 uppercase font-bold text-2xl mt-10">
        Your Projects
      </h2>
      <button className="my-10 px-4 py-2 text-amber-50/60 bg-amber-50 bg-opacity-25 rounded-lg capitalize">
        + Add project
      </button>
    </div>
  );
}
