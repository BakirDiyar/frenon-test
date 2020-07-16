let chai = require("chai");
let chaiHttp = require("chai-http");
let { app } = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("frenon API", () => {
  /**
   * Test the GET route
   */

  describe("POST /api/login", () => {
    it("It should signin a user", (done) => {
      const user = {
        email: "diy@mail.com",
        password: "passhidehash"
      };
      chai
        .request(app)
        .post("/api/login")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status')
          response.body.should.have.property('message')
          response.body.should.have.property('data')
          response.body.should.have.property('token')
          done();
        });
    });
  });

  describe("POST /api/create-users", () => {
    it("It should POST a new user", (done) => {
      const user = {
        name: "Bakir",
        address: "street #",
        email: "diyaaaaaa@mail.com",
        phone: "1234567890",
        password: "passhidehash"
      };
      chai
        .request(app)
        .post("/api/create-users")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status')
          response.body.should.have.property('message')
          response.body.should.have.property('data')
          done();
        });
    });
  });

  describe("GET /api/get-users", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(app)
        .get("/api/get-users")
        .end((err, response) => {
            
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status')
          response.body.should.have.property('message')
          response.body.should.have.property('data')
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /api/get-users/:id", () => {
    it("It should GET a user by ID", (done) => {
      const id = 1;
      chai
        .request(app)
        .get("/api/get-users/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status')
          response.body.should.have.property('message')
          response.body.should.have.property('data')
          done();
        });
    });
  });

  describe("PUT /api/update-users/:id", () => {
    it("It should PUT an existing user", (done) => {
      const id = 1;
      const user = {
        name: "Rogelio",
      };
      chai
        .request(app)
        .put("/api/update-users/" + id)
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status')
          response.body.should.have.property('message')
          response.body.should.have.property('data')
          done();
        });
    });

    describe("DELETE /api/deletes/:id", () => {
      it("It should DELETE an existing user", (done) => {
        const id = 7;
        chai
          .request(app)
          .delete("/api/delete-users/" + id)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.should.have.property('message')
            response.body.should.have.property('data')
            done();
          });
      });
    });
  });
});
