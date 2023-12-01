import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useStateEngine = create(
  subscribeWithSelector((set) => ({
    currentState: "Idle",
    prevState: "Idle",
    impulse: { x: 0, y: 0, z: 0 },
    // setLinVel: (vel) => {
    //   set((state) => {
    //     return { linVel: vel };
    //   });
    // },
    setImpulse: (imp) => {
      set((state) => {
        return { impulse: imp };
      });
    },

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
