import clsx from "clsx";
import "./Button.css";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 text-xs uppercase font-general bg-violet-50 text-black transition-all duration-300 hover:scale-105 active:scale-95",
        containerClass
      )}
    >
      {leftIcon}

      <span className="btn-text-wrapper">
        <span className="btn-text-top">{title}</span>
        <span className="btn-text-bottom">{title}</span>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;