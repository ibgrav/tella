import { useCtx } from "../../useCtx";

import "./main.css";

export function Main() {
  const { height, width } = useCtx();

  return (
    <main>
      <div className="main__container main__shadow">
        <header className="main__shadow">header!</header>
        <div className="iframe__container">
          <iframe width={`${width}px`} height={`${height}px`} src="/frame.html"></iframe>
        </div>
      </div>
    </main>
  );
}
