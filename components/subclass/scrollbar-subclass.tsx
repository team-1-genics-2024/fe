import React from "react";
import { CustomScrollbarProps } from "@/types/scroll-bar";

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`overflow-y-auto h-[90vh] scrollbar-thin scrollbar-thumb-[#3498DB] scrollbar-track-gray-200 ${className}`}
    >
      <style jsx>{`
        div::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.2);
        }
        div::-webkit-scrollbar {
          height: 0.75vh;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #3498db; /* Updated to #3498DB */
        }
        div::-webkit-scrollbar-thumb:hover {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #3498db; /* Updated to #3498DB */
        }
      `}</style>
      {children}
    </div>
  );
};

export default CustomScrollbar;
