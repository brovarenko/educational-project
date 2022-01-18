const request = require("supertest");
const assert = require("assert");
let chai = require('chai')
let chaiHttp = require('chai-http');
let should = chai.should();
var app = require("./app")
let adminRouter = require("./routes/adminRouter").adminRouter
const adminController = require("./controllers/adminController.js");
const Disciplines = require('./models/disciplines.js')
chai.use(chaiHttp);
chai.should();
const expect = require('chai').expect






/*
it('it should POST discipline ', (done) => {
    
    chai.request(app)
    .post('/admin/postDisciplines')
    .end((err, res) => {
          res.body.should.be.a('object');
        
          //res.body.book.should.have.property('name');
          
      done();
    });
});

/*


/*
    describe('#show_create_user_screen', function() {
      it('should be a function', function() {
        adminRouter.getDisciplines.should.be.a["function"];
      });
      it('should return something cool', function() {
        var mockReq = null;
        var mockRes = {
          render: function(disciplinesList) {
            viewName.should.exist;
            viewName.should.match(/createuser/);
          }
        };
        routes.show_create_user_screen(mockReq, mockRes);
      });
    });
*/

/*
    it('should find all tasks', () => {
        return adminController.getMatches()
          .then(tasks => {
            expect(tasks.length).to.equal(1)
            expect(tasks[0].name).to.equal('test')
          })
      })
*/
    it('it should GET disciplines ', (done) => {
    chai.request(app)
    .get('/admin/disciplinesList')
    .end((err, res) => {
          res.body.should.be.a('object');     
      done();
    });
    
    });
    it('should return status 200', function (done) {
    request(app)
      .get('/admin/createDisciplines')
      .expect(200)
      .end(done);
    });

    it('should return NotFound with status 404', function (done) {
    request(app)
      .get('/error')
      .expect(404)
      .expect('Not Found')
      .end(done);
    });

    it('should not save without name', function(done) {
      var disciplines = new Disciplines({
      });
      disciplines.save(function(err) {
        expect(err).to.exist
          .and.be.instanceof(Error)
          
        done();
      });
    });

    it('should save without error', function(done) {
        var disciplines = new Disciplines({name:"name"});
        disciplines.save(done);
    });

    it('responds with matching records', async function() {
          const disciplines = await Disciplines.find({});
          disciplines.should.exist
    });
      


     