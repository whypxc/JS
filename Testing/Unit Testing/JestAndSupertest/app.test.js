const request = require("supertest");
const app = require('./app');

describe('Test the root path', () => {
  
    test('it should response the GET Done method', done => {
      request(app)
        .get('/done')
        .then(response => {
            expect(response.statusCode).toBe(200)
            done();
        })
    })
    
    test('It should response the GET Promise method', () => {
      return request(app)
        .get("/promise")
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    })
    

    test('It should response the GET Async method', async() => {
        const response = await request(app).get("/async")
        expect(response.statusCode).toBe(200)
    })

    test("It should response the GET method", () => {
      return request(app).get("/supertest").expect(200);
    });
    
})

describe("POST /users", () => {
  describe("given a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});