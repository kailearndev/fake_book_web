import { Reply } from "lucide-react";
import type { Comment } from "../types/post.type";
import { useState } from "react";


interface CommentProps {
    comment: Comment[]
    onReply?: (content: string, parentId?: string) => void
}

export default function Comments({ comment, onReply }: CommentProps) {
    const [replyContent, setReplyContent] = useState<string>("");
    const handleReply = (content: string, parentId?: string) => {
        onReply && onReply(content, parentId);
        setReplyContent("");
    };
    return (
        <div className="flex w-full gap-4 mt-4  flex-col  bg-white p-4">
            {
                comment.length === 0 && (
                    <div className="flex flex-col  gap-4">
                        <h2 className="text-lg font-bold">Chưa có bình luận nào</h2>
                        <div className="relative w-2/3">
                            <textarea
                                rows={4} className=" h-10 p-2 rounded-md shadow-hard-sm resize-none "
                                placeholder="Hãy là người đầu tiên bình luận về bài viết này!"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            >
                                Hãy là người đầu tiên bình luận về bài viết này!
                            </textarea>
                            <Reply onClick={() => handleReply(replyContent)} className="absolute! bottom-2 -right-3   bg-primary-container text-white rounded-md shadow-hard-sm" />
                        </div>

                    </div>
                )
            }
            {
                comment.length > 0 && (
                    <h2 className="text-sm font-bold flex gap-2">{comment.length} Bình luận
                        <p>
                            {comment.map(c => c.replies.length).reduce((a, b) => a + b, 0) > 0 && (
                                <span>{comment.map(c => c.replies.length).reduce((a, b) => a + b, 0)} trả lời</span>
                            )}
                        </p>
                    </h2>


                )
            }
            < div className="flex flex-col gap-4">
                {comment.map((c) => (
                    <div className="flex flex-col h-100 overflow-y-scroll" key={c.id}>
                        <div className="flex  gap-4">
                            <img src="https://bom.edu.vn/public/upload/2024/12/memee-cuoi-34.webp" alt="avt" className="w-10 h-10 shadow-hard-sm shadow-black" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-sm font-bold">{c.author.name || c.author.email}</h2>
                                <div className="flex justify-between w-full">
                                    <div className="relative">
                                        <p>{c.content}</p>
                                        <textarea
                                            placeholder="Trả lời bình luận"
                                            className="w-full  h-10 p-2 rounded-md shadow-hard-sm resize-none ml-4 "
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                        />
                                        <Reply onClick={() => handleReply(replyContent, c.id)} className="absolute! -right-6 bottom-2 bg-primary-container text-white rounded-md shadow-hard-sm" />
                                    </div>
                                </div>

                            </div>

                        </div>
                        {
                            c.replies && c.replies.length > 0 && (
                                <div className="flex flex-col gap-4 mt-4 ml-10">
                                    {c.replies.map((reply) => (
                                        <div key={reply.id} className="flex items-center gap-4">
                                            <img src="https://bom.edu.vn/public/upload/2024/12/memee-cuoi-34.webp" alt="avt" className="w-10 h-10 shadow-hard-sm shadow-black" />
                                            <div className="flex flex-col gap-1 relative">
                                                <h2 className="text-sm font-bold">{reply.author.name || reply.author.email}</h2>
                                                <p>{reply.content}</p>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>

        </div >

    )
}
