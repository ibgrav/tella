import { useState } from "preact/hooks";

export default function Button({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount || 0);

  const increment = () => setCount((c) => c + 1);

  return <button onClick={increment}>count {count}</button>;
}
