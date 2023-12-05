import __dirname from "./dirname.js";

console.log(__dirname + "/docs/*.yaml")

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "The Great Henge",
      description: "API of The Great Henge Store",
    },
  },
  apis: [__dirname + "/docs/*.yaml"],
};

export default options;
