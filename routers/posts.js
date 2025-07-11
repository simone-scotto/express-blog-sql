const express = require("express");

const router = express.Router();

const posts = require(`../data/posts`);

const postController = require("../controller/controller");
//INDEX

/* router.get(`/`, function (req, res) {
  let filteredPosts = posts;

  if (req.query.tags) {
    filteredPosts = posts.filter((post) => post.tags.includes(req.query.tags));
  }
  res.json(filteredPosts);
});

// SHOW

router.get("/:id", function (req, res) {
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
});

// STORE

router.post("/", function (req, res) {
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
});

// UPDATE

router.put("/:id", function (req, res) {
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
});

// DESTROY

router.delete("/:id", function (req, res) {
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
}); */

router.get("/", postController.index);

router.get("/:id", postController.show);

router.post("/", postController.store);

router.put("/:id", postController.update);

router.patch("/:id", postController.update);

router.delete("/:id", postController.destroy);

module.exports = router;
