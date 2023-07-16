import React from "react";

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: H1Props) {
  return (
    <h1
      {...props}
      className={`text-2xl font-semibold self-center ${className}`}
    >
      {children}
    </h1>
  );
}
