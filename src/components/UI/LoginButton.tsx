import React from "react";
import { FiLoader } from "react-icons/fi";

type SecondaryButtonProps = {
  name: string;
  loading?: boolean;
};

const LoginButton: React.FC<SecondaryButtonProps> = ({ name, loading = false }) => {
  return (
    <button
      disabled={loading}
      className={`border w-full bg-[#4C6F35] text-white py-2 px-10 border-[#4C6F35] hover:bg-[#A77523] hover:text-white hover:border-[#A77523] ease-in duration-200 flex justify-center items-center gap-2 ${
        loading ? "opacity-75 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <FiLoader className="animate-spin h-5 w-5 text-white" />
      )}
      {loading ? "Processing..." : name}
    </button>
  );
};

export default LoginButton;
