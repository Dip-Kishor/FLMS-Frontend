import React from "react";

type PrimaryButtonProps = {
  name: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name }) => {
  return (
    <button className="border text-[#4C6F35] py-3 px-10 border-[#A77523] hover:bg-[#4C6F35] hover:text-white hover:border-[#4C6F35] ease-in duration-200">
      {name}
    </button>
  );
};

export default PrimaryButton;
