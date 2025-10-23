export default function Button({ type, children, ...props }) {
  return (
    <button
      type={type}
      className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}