const posts = require("../data/posts");

const connection = require("../db/connection");

function index(req, res) {
  const sql = `SELECT * FROM post`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: true, message: err.message });
    //console.log(results);

    //res.json(results);
  });
  /* let filteredPosts = posts;

  if (req.query.tags) {
    filteredPosts = posts.filter((post) =>
      post.tags.map((tag) => tag.toLowerCase()).includes(req.query.tags)
    );
  }
  res.json(filteredPosts); */
}
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Not Found",
      message: "Item not found",
    });
  }
  res.json(post);
}
function store(req, res) {
  const newId = posts[posts.length - 1].id + 1;
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
  res.json(newPost);
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

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      error: true,
      message: "items not found",
    });
  }

  posts.splice(posts.indexOf(post), 1);
  console.log(posts);

  res.sendStatus(204);
}

module.exports = { index, show, store, update, destroy };
