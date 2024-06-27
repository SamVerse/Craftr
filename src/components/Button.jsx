import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    paddingX = "px-4",
    paddingY = "py-2",
    ...props
}) {
    return (
        <button className={`md:py-2 md:px-4 ${paddingX} ${paddingY} rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}

// This is a common way to design a button in productions where u dont want to design a btn everytime.. );