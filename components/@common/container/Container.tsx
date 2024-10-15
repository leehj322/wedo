import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <div className="px-4 tab:px-6 pc:px-0">{children}</div>
    </section>
  );
}
