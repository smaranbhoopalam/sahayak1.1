import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  bordered = true,
  header,
  footer,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl shadow-soft transition-all duration-200 overflow-hidden',
          bordered && 'border border-slate-100',
          hoverable && 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between font-semibold text-slate-800">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};
