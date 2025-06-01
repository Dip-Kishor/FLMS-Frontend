// components/Spinner.jsx

const Spinner = ({ text = "Loading..." }) => {
  return (
    <button
  type="button"
  disabled
  className="bg-[#4C6F35] text-white px-4 py-2 rounded flex items-center gap-2"
>
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6V2z"
    />
  </svg>
  {text}
</button>

  );
};

export default Spinner;
