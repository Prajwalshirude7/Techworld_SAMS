import { forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      type = "text",
      placeholder,
      value,
      onChange,
      disabled = false,
      required = false,
      className = "",
    },
    ref
  ) => {
    return (
      <div className="w-full">

        {label && (
          <label className="block mb-2 text-sm font-medium text-slate-300">
            {label}
            {required && (
              <span className="text-red-400 ml-1">*</span>
            )}
          </label>
        )}

        <div
          className={`
            flex items-center
            rounded-xl
            border
            border-slate-700
            bg-[#102235]
            px-4
            py-3
            transition-all
            duration-300
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/30
            ${disabled ? "opacity-60" : ""}
            ${className}
          `}
        >
          {Icon && (
            <Icon
              size={20}
              className="mr-3 text-slate-400"
            />
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="
              w-full
              bg-transparent
              outline-none
              text-white
              placeholder:text-slate-500
            "
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;