import React from "react";

type SecondaryButtonProps = {
  name: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ name }) => {
  return (
    <button className="border bg-[#4C6F35] text-[#fff] py-2 px-8 border-[#4C6F35] hover:bg-[#A77523] hover:text-white hover:border-[#A77523] ease-in duration-200">
      {name}
    </button>
  );
};

export default SecondaryButton;
