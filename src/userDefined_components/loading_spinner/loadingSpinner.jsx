import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div> */}
      <Loader2 className="h-12 w-12 animate-spin text-[#000000]" />
    </div>
  );
};

export default LoadingSpinner;
