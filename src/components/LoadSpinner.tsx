"use client";

import { Spinner } from "@nextui-org/react";

const LoadSpinner = () => {
  return (
    <div className={`w-[80vw] h-[80vh] flex justify-center items-center`}>
      <Spinner className="" label="Loading..." color="warning" />
    </div>
  );
};

export default LoadSpinner;
