import React from "react";

export default function Message({ message, messageType }) {
  return (
    <div className="bg-orange-400 max-w-lg mx-auto p-4 mb-2 rounded-lg">
      <p className="text-center text-white">{message}</p>
    </div>
  );
}
