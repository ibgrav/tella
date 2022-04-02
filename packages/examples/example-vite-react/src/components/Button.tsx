import { ReactNode, useState } from "react";

interface ButtonProps {
  children?: ReactNode;
  initialCount?: number;
}

export function Button({ initialCount, children }: ButtonProps) {
  const [count, setCount] = useState(initialCount ?? 0);

  const increment = () => setCount((count) => count + 1);

  return (
    <button onClick={increment} className="text-red-500">
      <span>count {count}</span>
      {children}
    </button>
  );
}
