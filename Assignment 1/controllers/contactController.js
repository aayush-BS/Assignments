const contactController = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(`
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
        <a href="/">Home</a> OR <a href="/about">About</a>
      </body>
    </html>
  `)
}

module.exports = contactController