import config from "../../config/config.js";

import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost${config.port}/api`);

describe("Testing The Great Henge API resources", () => {
  describe("Testing User and Product data flow", () => {
    let uid = null;
    let pid = null;
    it("Testing User Register", async () => {
      let data = {
        name: "test",
        lastname: "test",
        email: "test@gmail.com",
        age: 18,
        password: "hola123",
      };

      let response = await requester.post("/api/auth/register").send(data);
      console.log(response);
    });
  });
});
