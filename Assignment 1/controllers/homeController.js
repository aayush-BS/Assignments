const homeController = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(`
    <html>
      Welcome to my Node.js server!
      <br/>
      <a href="/about">About</a> OR
      <a href="/contact">Contact</a>
    </html>
  `)
}

module.exports = homeController