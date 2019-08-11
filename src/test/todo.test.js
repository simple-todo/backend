const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
chai.use(chaiHttp);

describe("/PUT todo", () => {
	let userToken = "";
	let task = "";

	it(`it should get new token for next process`, (done) => {
		const user = {
			username: "ayam",
			password: "kucing",
		};

		chai
			.request(app)
			.post("/api/user-management/login")
			.send(user)
			.end(function(err, res) {
				userToken = res.body.data.token;
				done();
			});
	});

	it(`it should show todo's`, (done) => {
		chai
			.request(app)
			.get("/api/todo-management/todos")
			.set("authorization", userToken)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.message.should.equal("Success get Task");
				done();
			});
	});

	it(`it should add new Todo`, (done) => {
		const todo = {
			task: "testing",
		};

		chai
			.request(app)
			.post("/api/todo-management/todos")
			.set("authorization", userToken)
			.send(todo)
			.end(function(err, res) {
				task = res.body.data.data;
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.message.should.equal("Success add new Task");
				res.body.data.data.task.should.equal(todo.task);
				done();
			});
	});

	it(`it should update is_completed status task`, (done) => {
		const todo = {
			todo_id: String(task.id),
		};

		chai
			.request(app)
			.put("/api/todo-management/todos")
			.set("authorization", userToken)
			.send(todo)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.message.should.equal("Success change Task complete");
				done();
			});
	});

	it(`it should delete task `, (done) => {
		const todo = {
			todo_id: String(task.id),
		};

		chai
			.request(app)
			.delete("/api/todo-management/todos")
			.set("authorization", userToken)
			.send(todo)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("success");
				res.body.should.have.property("data");
				res.body.data.should.have.property("message");
				res.body.data.message.should.equal("Success delete Task");
				done();
			});
	});
});
