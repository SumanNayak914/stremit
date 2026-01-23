import React from 'react';

const Input = ({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  rows,
  ...props
}) => {
  const inputClasses = `
    w-full px-4 py-3 border border-gray-200 rounded-xl
    focus:ring-2 focus:ring-purple-500 focus:border-purple-500
    outline-none transition-all
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
  `;

  return (
    <div className={className}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {Icon && <Icon size={16} className="text-purple-500" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 4}
          className={`${inputClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
