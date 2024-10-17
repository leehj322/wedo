import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  background: "white" | "lightBeige";
}

export default function Container({ children, background }: ContainerProps) {
  const backgroundClass =
    background === "white" ? "bg-inverse" : "bg-primary-light";

  return (
    <div className={`min-h-[100vh] ${backgroundClass}`}>
      <section className="mx-auto w-full max-w-[1200px] pt-[60px]">
        <div className="px-4 tab:px-6 pc:px-0">{children}</div>
      </section>
    </div>
  );
}
