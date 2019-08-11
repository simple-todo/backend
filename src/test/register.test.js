const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
chai.use(chaiHttp);

describe("/POST register", () => {
	it("it should show failed message, because user already registered", (done) => {
		const user = {
			username: "kucing",
			password: "kucing",
			full_name: "joko",
		};

		chai
			.request(app)
			.post("/api/user-management/register")
			.send(user)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.message.should.equal("Failed register, Username already registed");
				done();
			});
	});
});
