import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useStateEngine = create(
  subscribeWithSelector((set) => ({
    currentState: "Idle",
    prevState: "Idle",
    toggleRun: false,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    setState: (animation) => {
      set((state) => {
        console.log(state.toggleRun);
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
    setToggle: () => {
      set((state) => {
        return { toggleRun: !state.toggleRun };
      });
    },
  })),
);
export default useStateEngine;
