import request from "supertest"
import { app } from "../../index"

describe("Integration test on root path", () => {
  test("It should respond to the GET request", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});