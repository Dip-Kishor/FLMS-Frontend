import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <img src="/DBPLogo.png" alt="logo" width="120px" />
    </Link>
  );
};

export default Logo;