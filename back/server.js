require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Listen port 4000
const PORT = process.env.PORT || 4000;

const routesDirectory = path.join(__dirname, 'paths');

// Generate the name of a route from a file name
function getRouteName(fileName) {
    if (fileName === 'index.js') return '/';
    return '/' + fileName.replace('.js', '');
}

// Automatically load all routes from the `src` directory
fs.readdirSync(routesDirectory).forEach((file) => {
    const routePath = getRouteName(file);
    const routeModule = require(path.join(routesDirectory, file));
    app.use(routePath, routeModule);
});

app.use(cors());

const routes = app._router.stack.filter((r) => r.route).map((r) => r.route.path);
console.log(routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});