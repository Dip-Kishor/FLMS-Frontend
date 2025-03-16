import React from "react";

type SecondaryButtonProps = {
  name: string;
};

const LoginButton: React.FC<SecondaryButtonProps> = ({ name }) => {
  return (
    <button className="border w-full bg-[#4C6F35] text-[#fff] py-2 px-10 border-[#4C6F35] hover:bg-[#A77523] hover:text-white hover:border-[#A77523] ease-in duration-200">
      {name}
    </button>
  );
};

export default LoginButton;
