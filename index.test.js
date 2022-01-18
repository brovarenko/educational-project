const chai = require('chai')
let chaiHttp = require('chai-http')
const expect = require('chai').expect

var app = require("./app")
chai.use(chaiHttp);

it('should get all users', (done) => {
    chai.request(app)
      .get('/admin/getuser')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
       // expect(res.body).to.haveOwnProperty('data')

        done()
      })
  })