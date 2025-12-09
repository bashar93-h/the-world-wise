import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("data/cities.json");
const middlewares = jsonServer.defaults({
  static: "./dist",
});

const port = process.env.PORT || 9000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
