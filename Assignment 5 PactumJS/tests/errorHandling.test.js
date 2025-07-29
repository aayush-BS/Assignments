const pactum = require('pactum');
require('../pactum.config');

describe('Error Handling Test', () => {
  it('should return 404 for a non-existent post', async () => {
    await pactum.spec()
      .get('/posts/9999')
      .expectStatus(404);
  });
});
