const aboutController = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(`
    <html>
      Hii, Aayush this side and this is my first Node.js server
      <br/>
      <a href="/">Home</a> OR
      <a href="/contact">Contact</a>
    </html>
  `)
}

module.exports = aboutController