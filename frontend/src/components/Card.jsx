// src/components/Card.jsx
import React from "react";

export default function Card({ title, text, icon, children }) {
  return (
    <div className="card reveal bg-white rounded-xl p-4 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-2 hover:-rotate-1 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-pink-100 shadow-md text-xl">
          {icon || "🤱"}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">{text}</p>
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
