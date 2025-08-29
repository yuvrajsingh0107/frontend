import React from "react";

const Notification = ({ message }) => {
  if (!message) return null; // agar message nahi hai to kuch render mat karo

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-blue-600 text-white rounded-lg shadow-lg p-4 flex justify-between items-center animate-fade-in">
      <span>{message}</span>
    </div>
  );
};

export default Notification;
