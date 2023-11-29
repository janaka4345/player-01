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
        if (state.currentState === animation) {
          return {};
        }
        if (!state.toggleRun) {
          return { prevState: state.currentState, currentState: animation };
        }
        return { prevState: state.currentState, currentState: "Run" };
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
