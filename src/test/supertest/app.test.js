import config from "../../config/config.js";

import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:8080/api`);

describe("Testing The Great Henge API resources", () => {
  describe("Testing User and Product data flow", () => {
    let uid = null;
    let pid = null;
    let cid = null;
    let upid = null;
    let cookie = null;
    let token = null;
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
      let data = { email: "adminCoder@coder.com", password: "adminCod3r123" };
      let response = await requester.post("/auth/login").send(data);
      let { headers } = response;
      cookie = {
        name: headers["set-cookie"][0].split("=")[0],
        value: headers["set-cookie"][0].split("=")[1],
      };
      expect(cookie.name).to.be.equals("connect.sid");
      expect(cookie.value).to.be.ok;
    });

    it("Testing password recovery", async () => {
      let data = { email: "booba@gmail.com" };
      let response = await requester.post("/users/recoverpassword").send(data);
      let { _body, statusCode } = response;
      token = _body.token;
      upid = _body.id;
      expect(statusCode).to.be.equals(200);
    });

    it("Testing password update", async () => {
      let data = { password: "12345678" };
      let response = await requester
        .post("/users/resetpassword/" + upid + "/" + token)
        .send(data);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Testing get all products", async () => {
      let response = await requester
        .get("/products")
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      const products = _body.products.docs;
      expect(Array.isArray(products)).to.be.equals(true);
    });  

    it("Testing create product", async () => {
      let data = {
        title: "Test title",
        description: "Test description",
        price: 1,
        thumbnail: "http://test",
        code: "test code",
        stock: 1,
        category: "test category",
        owner: uid,
      };
      let response = await requester
        .post("/products")
        .send(data)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      const product = _body.product;
      pid = product[0]._id;
      expect(Array.isArray(product)).to.be.equals(true);
    });

    it("Testing get a single product", async () => {
      let response = await requester
        .get("/products/" + pid)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      expect(_body.product).to.have.property("_id");
    });

    it("Testing product update", async () => {
      let data = { title: "updated" };
      let response = await requester
        .put("/products/" + pid)
        .send(data)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      expect(_body.product.title).to.be.equals("updated");
    });

    it("Testing get all carts", async () => {
      let response = await requester
        .get("/carts")
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      const carts = _body.cart;
      expect(Array.isArray(carts)).to.be.equals(true);
    });

    it("Testing get a single cart", async () => {
      let response = await requester
        .get("/carts/" + cid)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { _body } = response;
      expect(_body.cart).to.have.property("_id");
    });

    it("Testing cart update", async () => {
      let data = {
        title: "Test title",
        description: "Test description",
        price: 1,
        thumbnail: "http://test",
        code: "test code",
        stock: 1,
        category: "test category",
        owner: uid,
      };
      let response = await requester
        .put("/carts/" + cid)
        .send(data)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Testing deleting test product", async () => {
      let response = await requester
        .delete("/products/" + pid)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Testing deleting test cart", async () => {
      let response = await requester
        .delete("/carts/" + cid)
        .set("cookie", [cookie.name + "=" + cookie.value]);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Testing deleting test user", async () => {
      let response = await requester.delete("/users/" + uid);
      let { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
  });
});
