const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
chai.use(chaiHttp);

describe("/POST login", () => {
	it("it should show success message, if user success login", (done) => {
		const user = {
			username: "kucing",
			password: "kucing",
		};

		chai
			.request(app)
			.post("/api/user-management/login")
			.send(user)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.success.should.equal(true);
				res.body.data.message.should.equal("Success login");
				res.body.data.user.should.be.a("object");
				done();
			});
	});
});
