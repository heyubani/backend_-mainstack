import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import { Application } from '../src/app';

const app = new Application();

const { expect } = chai;
chai.use(chaiHttp);

describe('Auth', () => {
  describe('Create and login user', () => {
    it('Should create user account successfully', (done) => {
      chai.request(app) 
        .post('/api/v1/auth/signup')
        .send({
          username: 'user1',
          email: 'test@test.com',
          password: 'test123'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Account created successfully');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('Should is user already exist', (done) => {
      chai.request(app) 
        .post('/api/v1/auth/signup')
        .send({
          username: 'user1',
          email: 'test@test.com',
          password: 'test123'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Account already exists.');
          expect(res.body.status).to.equal('error');
          done();
        });
    });
    it('Should login user successfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@test.com',
          password: 'test123'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Logged in successfully');
          expect(res.body.status).to.equal('success');
          process.env.USER_ACCESS_TOKEN = res.body.data.token;
          done();
        });
    });
    it('Should flag if user try logging in with wrong credentials successfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@test.com',
          password: 'test123@1'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('user');
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });
  describe('Articles', () => {
    it('Should create new article successfully', (done) => {
        chai.request(app)
          .post('/api/v1/article')
          .set({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.USER_ACCESS_TOKEN}`
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.message).to.equal('Article created successfully.');
            expect(res.body.status).to.equal('success');
            process.env.ARTICLE_ID = res.body.data;
            done();
          });
      });
    it('Should flag if article already exist', (done) => {
        chai.request(app)
          .post('/api/v1/article')
          .set({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.USER_ACCESS_TOKEN}`
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('status');
            expect(res.body.message).to.equal('Article  already exist.');
            expect(res.body.status).to.equal('error');
            done();
          });
      });
    it('Should fetch single article exist', (done) => {
        chai.request(app)
          .get(`/api/v1/article/${process.env.ARTICLE_ID}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.USER_ACCESS_TOKEN}`
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.message).to.equal('Article fetch successfully.');
            expect(res.body.status).to.equal('success');
            done();
          });
      });
  });
});
