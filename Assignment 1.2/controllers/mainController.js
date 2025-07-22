exports.home = (req, res) => {
  res.type('html').send(`Welcome to my Node.js server!
                        <br/>
      <a href="/about">About</a> OR
      <a href="/contact">Contact</a>
      `);
};

exports.about = (req, res) => {
  res.type('html').send(`Hii this is my first Node.js server
                        <br/>
      <a href="/">Home</a> OR
      <a href="/contact">Contact</a>`);
};

exports.contact = (req, res) => {
  res.type('html').send(`
    <html>
      <head><title>Contact</title></head>
      <body>
        <h1>Contact Me</h1>
        <form>
          <label>Name: <input type="text" /></label><br/>
          <label>Email: <input type="email" /></label><br/>
          <input type="submit" value="Submit" />
        </form>
        <img src="/public/contact.png" width="300" alt="Contact Image"/>
        <br/>
      <a href="/about">About</a> OR
      <a href="/">Home</a>
      </body>
    </html>
  `);
};