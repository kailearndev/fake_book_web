import type { ICommentCreate } from "../types/commnet.type";
// import type { IPostResponse } from "../types/post.type";
import { api } from "./api";


const createComment = async (commentData: ICommentCreate) => {

	try {
		const res = await api("/comment", {
			method: "POST",
			body: JSON.stringify(commentData),
		});
		return res;
	} catch (error) {
		throw new Error("Failed to create comment");
	}
};
export const commentService = {
	createComment,
};
