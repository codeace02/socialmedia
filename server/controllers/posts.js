// folder structure of backend app
// handlers of routes, logic yha likhega

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {

    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const searchPost = async (req, res) => {

    // query: { searchBy: 'Hil' }
    const { searchBy: name } = req?.query;

    const query = name?.toLowerCase();

    try {
        
        const postMessages = await PostMessage.find()
        const searchedResult = postMessages?.filter((item) => {
            return item?.creator.toLowerCase().includes(query)
        })

        console.log('===================================================searchedResult============================================', searchedResult)

        res.status(200).json(searchedResult)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {

    const body = req.body;
    const newPost = new PostMessage(body);

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(` from update post => No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`from delete post => No post with id: ${id}`);

    // await PostMessage.findByIdAndRemove(id);
    await PostMessage.findOneAndDelete({ _id: id });

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(` from like post => No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}

export const disLikePost = async (req, res) => {
    console.log('<==============================================request================================================>', req)

    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`custom error 1 No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    if (!post) return res.status(404).send(`custom err 2 No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount - 1 }, { new: true });

    res.json(updatedPost);
}

