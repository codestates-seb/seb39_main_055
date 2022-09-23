import { Context, useContext } from "react";

export default function useAppContext<T>(ctx: Context<T>) {
  const context = useContext(ctx);

  if (!context || !ctx) {
    throw new Error("useAppContext must be within Context Provider");
  }

  return context!;
}
