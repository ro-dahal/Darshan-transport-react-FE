import { createContext } from "react";
import type { GlobalStatusContextValue } from "./types";

export const GlobalStatusContext = createContext<
  GlobalStatusContextValue | undefined
>(undefined);
