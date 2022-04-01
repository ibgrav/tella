import { createContext, useContext } from "react";

interface ContextProps {
  height: number;
  width: number;
}

const ctx = createContext<ContextProps>({ height: 1080, width: 1920 });

export const useCtx = () => {
  return useContext(ctx);
};
