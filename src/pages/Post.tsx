import { useQuery, useQueryClient } from "@tanstack/react-query"
import { postService } from "../services/post.service"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CornerDownRight, LucideKey, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import Comments from "../components/Comment";
import { commentService } from "../services/comment.service";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);
dayjs.locale('vi')
export default function Post() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async () => await postService.getPosts()
    },
    )
    if (isLoading) {
        return (<div className="flex items-center justify-center w-full h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        )
    }
    const handleReply = async (content: string, postId: string, parentId?: string) => {
        try {
            await commentService.createComment({
                content: content,
                postId,
                parentId
            });
            toast.success("Đã trả lời bình luận.");
            queryClient.invalidateQueries({ queryKey: ['post'] });
        } catch (error) {
            toast.error("Failed to reply comment.");
        }



    }
    const handleDeletePost = async (postId: string) => {
        try {
            await postService.deletePost(postId);
            toast.success("Đã xóa bài viết.");
            queryClient.invalidateQueries({ queryKey: ['post'] });
        } catch (error) {
            toast.error("Failed to delete post.");
        }
    }
    return (
        <div className="flex flex-col gap-10 w-full p-4 max-w-4xl mx-auto relative">
            <div className="sticky top-0 bg-white/50 z-10 flex flex-col gap-2 p-2 shadow-hard rounded-md backdrop-blur-3xl">
                <h1 className="text-2xl font-bold">Bài viết</h1>
                <p className="text-sm text-gray-500">Xem những bài viết mới nhất từ cộng đồng</p>
            </div>

            <Link to="/create-post" className="self-start mt-20">
                <button className="flex items-center gap-2 bg-primary-container text-white px-4 py-2 rounded-md shadow-hard-sm">
                    <CornerDownRight />
                    Tạo bài viết
                </button></Link>

            {
                data?.length === 0 && (
                    <div className="flex flex-col items-center gap-4">
                        <LucideKey size={48} />
                        <h2 className="text-lg font-bold">Chưa có bài viết nào</h2>
                    </div>
                )
            }
            {data?.map((post) => (
                <div key={post.id} className="flex flex-col  p-4 rounded-md gap-4 ">
                    <div className="shadow-hard p-5  -rotate-2">
                        <div className="flex items-center gap-4 relative">
                            <img src="https://bom.edu.vn/public/upload/2024/12/memee-cuoi-34.webp" alt="avt" className="w-20 h-20 shadow-hard-sm shadow-black" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-bold">{post.author.name || post.author.email}</h2>
                                <span className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</span>
                            </div>
                            {post.isMine && <X onClick={() => handleDeletePost(post.id)} size={20} className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500" />}
                        </div>
                        <div className="mt-10">
                            <p className="font-medium  text-black text-4xl">{post.content}</p>
                            <PhotoProvider>
                                <div className="grid md:grid-cols-2 grid-cols-3  lg:grid-cols-4 gap-4 mt-4">
                                    {post.images?.length > 0 &&
                                        post.images.map((image, index) => (
                                            <PhotoView src={image.url} key={image.id}>
                                                <img
                                                    src={image.url}
                                                    alt={`post image ${index}`}
                                                    className="w-full aspect-4/3 md:aspect-square h-auto md:h-60 object-cover rounded-md shadow-hard"
                                                />
                                            </PhotoView>
                                        ))}
                                </div>
                            </PhotoProvider>

                        </div>
                        <div className="flex items-center gap-4 mt-4 group">
                            {post.totalReactions > 0 && (
                                <div className="flex items-center gap-2 group-hover:scale-110 transition-all">
                                    {post.myReactionType === "LIKE" && <div className="shadow-hard-sm bg-primary-container w-25 flex justify-center  items-center p-2">👍 {post.reactionStats.LIKE}</div>}
                                </div>
                            )}
                            <Comments comment={post.comments || []} onReply={(content, parentId) => handleReply(content, post.id, parentId)}
                            />
                        </div>

                    </div>
                </div>
            ))}


        </div >
    )
}
