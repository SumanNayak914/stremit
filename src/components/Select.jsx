import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  icon: Icon,
  value,
  onChange,
  options,
  required = false,
  className = '',
  bgColor = 'bg-white',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {Icon && <Icon size={16} className="text-purple-500" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full appearance-none px-4 py-3 pr-10
            ${bgColor} border border-gray-200 rounded-xl
            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            outline-none cursor-pointer transition-all
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
};

export default Select;
