import config from "../../config/config.js";

import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:8080/api`);

describe("Testing The Great Henge API resources", () => {
  describe("Testing User and Product data flow", () => {
    let uid = null;
    let pid = null;
    let cid = null;
    let cookie = null;
    it("Testing User Register", async () => {
      let data = {
        name: "test",
        lastname: "test",
        email: "test@gmail.com",
        age: 18,
        password: "hola123",
      };

      let response = await requester.post("/auth/register").send(data);
      let { _body, statusCode } = response;
      let { _id, cart } = _body;
      uid = _id;
      cid = cart;
      expect(statusCode).to.be.equals(200);
    });
    it("Testing login", async () => {
      let data = {
        email: "test@gmail.com",
        password: "hola123",
      };

      let response = await requester.post("/auth/login").send(data);
      let { headers } = response;
      cookie = {
        name: headers["set-cookie"][0].split("=")[0],
        value: headers["set-cookie"][0].split("=")[1],
      };
      //console.log(cookie);
      expect(cookie.name).to.be.equals("connect.sid");
      expect(cookie.value).to.be.ok;
    });
    it("Deleting test cart", async () => {
      let response = await requester.delete("/carts/" + cid);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
    it("Deleting test user", async () => {
      let response = await requester.delete("/users/" + uid);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
  });
});
