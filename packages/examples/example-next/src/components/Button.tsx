import { ReactNode, useState } from "react";
import styles from "src/styles/Button.module.css";

interface ButtonProps {
  children?: ReactNode;
  initialCount?: number;
}

export function Button({ initialCount, children }: ButtonProps) {
  const [count, setCount] = useState(initialCount ?? 0);

  const increment = () => setCount((count) => count + 1);

  return (
    <button onClick={increment} className={styles.example_button}>
      <span>count {count}</span>
      {children}
    </button>
  );
}
