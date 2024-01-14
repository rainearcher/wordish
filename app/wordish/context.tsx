import { createContext } from "react";

export const WobbleContext = createContext(false);
export const SetWobbleContext = createContext((wobble: boolean) => {});