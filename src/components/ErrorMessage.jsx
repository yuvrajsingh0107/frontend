import React from "react";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null; // agar message nahi hai to kuch render mat karo

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-red-600 text-white rounded-lg shadow-lg p-4 flex justify-between items-center animate-fade-in">
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
