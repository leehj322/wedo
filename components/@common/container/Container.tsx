import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  background: "white" | "lightBeige";
}

const backgroundColors = {
  white: "inverse",
  lightBeige: "primary-light",
};

export default function Container({ children, background }: ContainerProps) {
  const backgroundClass =
    backgroundColors[background] || backgroundColors.white;

  return (
    <div className={`min-h-[100vh] bg-${backgroundClass}`}>
      <section className="mx-auto w-full max-w-[1200px] pt-[60px]">
        <div className="px-4 tab:px-6 pc:px-0">{children}</div>
      </section>
    </div>
  );
}
