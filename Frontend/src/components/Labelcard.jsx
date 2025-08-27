// // src/components/Card.jsx
// import React from "react";

// const Card = ({ title, value, icon, bgColor = "bg-white" }) => {
//   return (
//     <div
//       className={`
//         p-6 rounded-2xl shadow-lg flex items-center gap-5
//         transition-transform transform hover:scale-105
//         ${bgColor} 
//       `}
//     >
//       {icon && (
//         <div className="text-4xl p-4 rounded-full bg-white/20 flex items-center justify-center">
//           {icon}
//         </div>
//       )}
//       <div>
//         <h3 className="text-gray-500 uppercase tracking-wider text-sm">{title}</h3>
//         <p className="text-2xl font-extrabold text-gray-800 mt-1">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;
// src/components/Labelcard.jsx
import React from "react";

const Card = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${bgColor} min-h-[120px]`}
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-600 text-2xl">{icon}</div>
        {/* Wrap long titles */}
        <h2 className="text-sm font-semibold text-gray-700 leading-tight break-words">
          {title}
        </h2>
      </div>

      {/* Value section */}
      <p className="text-2xl font-bold text-gray-900 mt-3 truncate">
        {value}
      </p>
    </div>
  );
};

export default Card;

