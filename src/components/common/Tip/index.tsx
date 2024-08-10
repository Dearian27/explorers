import { twMerge } from "tailwind-merge";

const Tip = ({
  title,
  description,
  className,
  descriptionClassName,
  titleClassName,
}: {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col gap-1.5", className)}>
      <h2
        className={twMerge(
          "text-base font-bold text-[#252525]",
          titleClassName
        )}
      >
        {title}
      </h2>
      <span className={twMerge("text-sm text-[#72727C]", descriptionClassName)}>
        {description}
      </span>
    </div>
  );
};

export default Tip;
