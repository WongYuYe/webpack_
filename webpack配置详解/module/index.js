// import add from "./src/add";

// add(1, 2);

import("./src/add")
  .then(({ default: add }) => {
    console.log(add(1, 2));
  })
  .catch(() => {});