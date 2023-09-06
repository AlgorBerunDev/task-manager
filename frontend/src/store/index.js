import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";
import board from "./models/board";

const store = init({
  models: {
    board,
  },
  plugins: [selectPlugin()],
});

export const { select } = store;

export default store;
