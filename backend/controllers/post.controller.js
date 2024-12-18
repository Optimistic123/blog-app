import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.params);

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {

  const user = await User.findOne(req.params.id);

  const deletedPost = await Post.findOneAndDelete(user);

  res.status(200).json("Post has been deleted");
};