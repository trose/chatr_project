const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
var sinonChai = require("sinon-chai");
const { Chatr } = require('../../model');

chai.use(chaiHttp);
chai.use(sinonChai);

const baseUrl = chai.request('localhost:3000');

describe('Chatr Routes', () => {
  describe('create /chatr/:recipientId/from/:senderId', () => {
    it ('creates a new chatr', async () => {
      const res = await baseUrl.post('/chatr/12345/from/6789')
             .send({ message: 'test message' });

      expect(res).to.have.status(200);
    });
  });

  describe('get /chatr/:recipientId', () => {
    it ('gets chatr for user 12345', async () => {
      const res = await baseUrl.get('/chatr/12345');

      expect(res).to.have.status(200);
    });

    it ('should 404 if no messages', async () => {
      const res = await baseUrl.get('/chatr/1');

      expect(res).to.have.status(404);
    });
  });

  describe('get /chatr/:recipientId/from/:senderId', () => {
    it ('gets chatr for user 12345 from user 6789', async () => {
      const res = await baseUrl.get('/chatr/12345/from/6789');

      expect(res).to.have.status(200);
    });
    it ('should 404 if no messages (recipientId)', async () => {
      const res = await baseUrl.get('/chatr/1/from/6789');

      expect(res).to.have.status(404);
    });

    it ('should 404 if no messages (senderId)', async () => {
      const res = await baseUrl.get('/chatr/12345/from/1');

      expect(res).to.have.status(404);
    });
  });
});