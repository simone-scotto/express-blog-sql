const express = require("express");
const app = express();
const port = 3050;
const routersPost = require(`./routers/posts`);
const error = require("./middlewear/error");

app.use(express.static("public"));
app.use(express.json());

app.use("/api/posts", routersPost);
app.get("/", (req, res) => {
  res.send("Welcome to my Blog!");
  console.log("server connected");
});
app.use(error.errorsHandler);
app.use(error.notFound);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
