import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon, 
  className = '',
  ...props 
}) => {
  const baseClasses = "w-full flex items-center justify-center font-medium rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variants = {
    primary: "bg-[#0c7ff2] hover:bg-blue-600 text-white font-semibold text-lg py-4 px-6 focus:ring-blue-400",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium text-md py-3 px-6 shadow-md focus:ring-slate-500"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="material-icons mr-3">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
