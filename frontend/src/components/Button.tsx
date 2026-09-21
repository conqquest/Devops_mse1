import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, isLoading = false, icon: Icon, asChild, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-heading font-semibold transition-all duration-200 rounded-lg';
    
    const variants = {
      primary: 'bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] shadow-[0_4px_14px_0_rgba(232,101,43,0.39)] hover:shadow-[0_6px_20px_rgba(232,101,43,0.23)] hover:-translate-y-0.5',
      secondary: 'bg-[var(--color-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-charcoal-light)] shadow-md hover:-translate-y-0.5',
      outline: 'border-2 border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)]',
      ghost: 'text-[var(--color-charcoal)] hover:bg-black/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variants[variant!]} ${sizes[size!]} ${fullWidth ? 'w-full' : ''} ${disabled || isLoading ? 'opacity-60 cursor-not-allowed transform-none shadow-none' : ''} ${className}`;
    
    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && Icon && <Icon className="w-5 h-5 mr-2" />}
        {asChild ? (children as React.ReactElement<any>).props.children : children}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: `${combinedClassName} ${child.props.className || ''}`,
        ...props,
        ref: ref as any
      }, content);
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';
