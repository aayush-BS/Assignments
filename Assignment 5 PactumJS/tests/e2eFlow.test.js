const pactum = require('pactum');
require('../pactum.config');

describe('E2E Test Flow', () => {
  it('should create a user, create a post, and verify using known existing post', async () => {
    // Create User (mock only)
    await pactum.spec()
      .post('/users')
      .withJson({
        name: 'Aayush Patil',
        username: 'aayush1923',
        email: 'abc@abc.com'
      })
      .expectStatus(201)
      .stores('userId', 'id');

    // Create Post (mock only)
    await pactum.spec()
      .post('/posts')
      .withJson({
        title: 'My Post',
        body: 'This is a test post body',
        userId: '$S{userId}'
      })
      .expectStatus(201)
      .expectJsonLike({
        userId: '$S{userId}'
      })
      .stores('postId', 'id');

    // Since mock server doesn't persist, use GET on known post ID
    await pactum.spec()
      .get('/posts/1')
      .expectStatus(200)
      .expectJsonLike({
        id: 1,
        userId: 1
      });

    // Delete is mock, will always return 200
    await pactum.spec()
      .delete('/posts/$S{postId}')
      .expectStatus(200);
  });
});
