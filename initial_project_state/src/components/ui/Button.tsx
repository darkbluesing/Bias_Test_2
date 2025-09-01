'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none transform-none';
    
    const variants = {
      primary: 'bg-gradient-to-r from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 text-gray-700 focus:ring-pink-300',
      secondary: 'bg-gradient-to-r from-blue-200 to-cyan-200 hover:from-blue-300 hover:to-cyan-300 text-gray-700 focus:ring-blue-300',
      outline: 'border border-pink-200 bg-white hover:bg-pink-50 text-gray-700 focus:ring-pink-300',
      ghost: 'text-gray-600 hover:text-gray-900 hover:bg-pink-50 focus:ring-pink-300',
      danger: 'bg-gradient-to-r from-red-200 to-pink-200 hover:from-red-300 hover:to-pink-300 text-gray-700 focus:ring-red-300'
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };