import { useContext } from "react";
import { GlobalStatusContext } from "./globalStatusInternal";

export const useGlobalStatus = () => {
  const ctx = useContext(GlobalStatusContext);
  if (!ctx)
    throw new Error("useGlobalStatus must be used within GlobalStatusProvider");
  return ctx;
};
