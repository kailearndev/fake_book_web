import type { ICreatePostRequest, IPostResponse } from "../types/post.type";
import { api } from "./api";

const getPosts = async () => {
	try {
		const res = await api<IPostResponse[]>("/posts", {
			method: "GET",
		});
		return res;
	} catch (error) {
		throw new Error("Failed to fetch posts");
	}
};

const createPost = async (postData: ICreatePostRequest) => {

	try {
		const res = await api<IPostResponse[]>("/posts", {
			method: "POST",
			body: JSON.stringify(postData),
		});
		return res;
	} catch (error) {
		throw new Error("Failed to create post");
	}
};

const deletePost = async (postId: string) => {
	try {
		const res = await api<string>(`/posts/${postId}`, {
			method: "DELETE",
		});
		return res;
	} catch (error) {
		throw new Error("Failed to delete post");
	}
};

export const postService = {
	getPosts,
	createPost,
	deletePost,
};
