const staticHandler = require("./staticHandler")
const homeController = require("./controllers/homeController")
const aboutController = require("./controllers/aboutController")
const contactController = require("./controllers/contactController")
const notFoundController = require("./controllers/notFoundController")

// Routes
const routes = {
  "/": homeController,
  "/about": aboutController,
  "/contact": contactController,
}

function handleRoutes(req, res) {
  const { url } = req

  if (url.startsWith("/public/")) {
    staticHandler(req, res)
    return
  }

  const controller = routes[url]
  if (controller) {
    controller(req, res)
  } else {
    notFoundController(req, res)
  }
}

module.exports = handleRoutes
