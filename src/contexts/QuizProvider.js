import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../reducer/Reducer";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
