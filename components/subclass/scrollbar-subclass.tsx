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
          width: 10px; /* Adjust the width to make it thinner */
          height: 10px; /* Adjust the height to make it thinner */
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #3498db;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: #3498db;
        }
      `}</style>
      {children}
    </div>
  );
};

export default CustomScrollbar;
