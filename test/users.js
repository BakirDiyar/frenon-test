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
  describe("GET /api/get-users", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(app)
        .get("/api/get-users")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });


      /**
     * Test the GET (by id) route
     */
    describe("GET /api/get-user/:id", () => {
        it("It should GET a user by ID", (done) => {
            const id = 1;
            chai.request(app)                
                .get("/api/get-user/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
              //      response.body.should.be.a('object');
                 //   response.body.should.have.property('id');
                  //  response.body.should.have.property('name');
                  //  response.body.should.have.property('completed');
           //         response.body.should.have.property('id').eq(1);
                done();
                });
        });
    });

    describe("POST /api/create-user", () => {
        it("It should POST a new user", (done) => {
            const user = {
                name: "Bakir",
                address: "street #",
                email: "diyar@mail.com",
                phone: "1234567890"
            };
            chai.request(app)                
                .post("/api/create-user")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(202);
                  
                done();
                });
        });
    });


    describe("PUT /api/update-user/:id", () => {
        it("It should PUT an existing user", (done) => {
            const id = 1;
            const user = {
                name: "Rogelio",
               
            };
            chai.request(app)                
                .put("/api/update-user/" + id)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                 //   response.body.should.be.a('object');
                  //  response.body.should.have.property('id').eq(1);
                //    response.body.should.have.property('name').eq("Task 1 changed");
            //        response.body.should.have.property('completed').eq(true);
                done();
                });
        });


        describe("DELETE /api/delete/:id", () => {
            it("It should DELETE an existing user", (done) => {
                const id = 7;
                chai.request(app)                
                    .delete("/api/delete-user/" + id)
                    .end((err, response) => {
                        response.should.have.status(200);
                    done();
                    });
            });
        });
    
          
    

      
    });
    


    
});
