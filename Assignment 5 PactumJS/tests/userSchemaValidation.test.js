const pactum = require('pactum');
const { like } = require('pactum-matchers');
require('../pactum.config');

describe('User Schema Validation', () => {
  it('should validate user schema and content type', async () => {
    await pactum.spec()
      .get('/users/1')
      .expectStatus(200)
      .expectHeader('content-type', 'application/json; charset=utf-8')
      .expectJsonMatch({
        id: like(1),
        name: like('Aayush Patil'),
        username: like('Aayush1923'),
        email: like('abc@abc.com')
      });
  });
});
