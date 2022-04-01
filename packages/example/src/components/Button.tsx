import { useState } from "react";

interface ButtonProps {
  initialCount?: number;
}

export function Button({ initialCount }: ButtonProps) {
  const [count, setCount] = useState(initialCount ?? 0);

  const increment = () => setCount((count) => count + 1);

  return <button onClick={increment}>count {count}</button>;
}
