import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const server = chai.use(chaiHttp);
const expect = chai.expect;

describe('Location API', () => {
    it('Return an array of locations on GET /location', done => {
        server.request.execute(app)
            .get('/location')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    })

    it('Add a location on POST /location and return the LID', done => {
        server.request.execute(app)
            .post('/location')
            .send({
                location_name: 'Test Location',
                lat: 0,
                lng: 0,
                count: 0
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('number');
                done();
            });
    })

    it('Increase the count of a location on PUT /location/:lid/increase', done => {
        server.request.execute(app)
            .put('/location/1/increase')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Location count increased');
                done();
            });
    })

    it('Decrease the count of a location on PUT /location/:lid/decrease', done => {
        server.request.execute(app)
            .put('/location/1/decrease')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Location count decreased');
                done();
            });
    })

});

describe('Report API', () => {
    it('Add a report on POST /report', done => {
        server.request.execute(app)
            .post('/reports')
            .send({
                villain_name: 'Test Villain',
                lid: 1,
                location_name: 'Test Location',
                reported_by: 'Test User',
                time_reported: 1234567890,
                status: 'OPEN',
                description: 'Test Description',
                image_url: 'Test URL'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Report added');
                done();
            });
    })

    it('Return a report on GET /reports/:rid', done => {
        server.request.execute(app)
            .get('/reports/5')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
    })

    it('Return an array of reports on GET /reports', done => {
        server.request.execute(app)
            .get('/reports')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    })

    it('Close a report on PUT /reports/close/:rid', done => {
        server.request.execute(app)
        .put('/reports/close/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Report closed');
            done();
        });
    })

    it('Delete a report on DELETE /reports/:rid', done => {
        server.request.execute(app)
        .delete('/reports/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Report deleted');
            done();
        });
    })

});