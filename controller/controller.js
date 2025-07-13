const posts = require("../data/posts");

const connection = require("../db/connection");

function index(req, res) {
  const sql = `SELECT * FROM posts`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: true, message: err.message });
    console.log(results);

    res.json(results);
  });
}

function show(req, res) {
  console.log(req.params);
  console.log(typeof req.params.id);

  const id = parseInt(req.params.id);

  const sql = "SELECT * FROM posts WHERE id = ?;";
  console.log(sql);

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: true, essage: err.message });
    console.log(results);

    if (!results.length > 0) {
      return res.status(404).json({ error: true, message: "not found" });
    }
    return res.json(results[0]);
  });
}
function store(req, res) {
  console.log(req.body, "this is the req.body");

  const { title, content, image } = req.body;

  const sql = "INSERT INTO posts (title, content, image) VALUES (?, ?);";

  connection.query(sql, [title, content, image], (err, results) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });

    res.send("done");
  });

  /* const newId = posts[posts.length - 1].id + 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  posts.push(newPost);

  console.log(posts);

  res.status(201);
  res.json(newPost); */
}
function update(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  console.log(posts);

  res.json(post);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);

  const sql = " DELETE FROM posts WHERE id = ?;";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: true, essage: err.message });
    console.log(results);

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "not found",
      });
    }

    res.sendStatus(204);
  });

  /* const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      error: true,
      message: "items not found",
    });
  }

  posts.splice(posts.indexOf(post), 1);
  console.log(posts);

  res.sendStatus(204); */
}

module.exports = { index, show, store, update, destroy };
