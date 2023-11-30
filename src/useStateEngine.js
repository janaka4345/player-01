import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useStateEngine = create(
  subscribeWithSelector((set) => ({
    currentState: "Idle",
    prevState: "Idle",

    setState: (animation) => {
      set((state) => {
        if (state.currentState === animation) {
          return {};
        }
        if (!state.toggleRun) {
          return { prevState: state.currentState, currentState: animation };
        }
        if (state.toggleRun && state.currentState === "Walk") {
          return { prevState: state.currentState, currentState: "Run" };
        }
        return {};
      });
    },
  })),
);
export default useStateEngine;
