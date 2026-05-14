import clsx from "clsx";
import { CloudUpload, Trash } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { postService } from "../services/post.service";
import { uploadService } from "../services/upload.service";
import { useNavigate } from "@tanstack/react-router";


export default function CreatePost() {
    const navigate = useNavigate();
    const [files, setFiles] = useState<string[]>([]);
    const [content, setContent] = useState("");
    const handleUpload = async (acceptedFiles: File[]) => {
        const res = await uploadService(acceptedFiles)
        setFiles(prev => [...prev, ...res.map(file => file)]);

    }
    const { getRootProps, getInputProps, isDragActive, } = useDropzone({
        onDrop: handleUpload,
        accept: { 'image/*': [] },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: true,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
                    if (err.code === "file-too-large") {
                        toast.error(`File ${file.file.name} is too large. Max size is 5MB.`);
                    } else if (err.code === "file-invalid-type") {
                        toast.error(`File ${file.file.name} has an invalid type. Only images are allowed.`);
                    } else {
                        toast.error(`File ${file.file.name} was rejected.`);
                    }
                });
            });
        }
    });




    const handlePost = async () => {
        if (files.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        try {
            await postService.createPost({ content: content, images: files });
            toast.success("Yao ngon lành.");
            setFiles([]);
            setContent("");
            navigate({
                to: "/"
            });
        } catch (error) {
            toast.error("Failed to create post.");
        }
    };
    return (
        <div className="flex flex-col  max-w-7xl w-full p-4 mx-auto">
            <h1 className="shadow-hard max-w-90 text-5xl text-center uppercase bg-primary-container p-5 italic -rotate-2 ">
                Tạo bài viết mới
            </h1>
            <div className="grid lg:grid-cols-2 gap-10  mt-10">
                <div className="flex flex-col gap-4">

                    <div className={
                        clsx("flex flex-col items-center gap-4 p-10 rounded-md border-2 border-dashed border-gray-400 cursor-pointer", isDragActive && " border-4 border-primary-container")
                    }
                        {...getRootProps()}>
                        <CloudUpload size={40} />
                        <h1 className="text-3xl ">
                            Đưa ảnh dô đêy
                        </h1>
                        <p>
                            Đừng up ảnh sẽ please
                        </p>
                        <input {...getInputProps()} type="file" className=" p-4 rounded-md hidden" />

                    </div>
                    <div className="flex flex-col gap-4 shadow-hard p-4  ">
                        <h1>
                            Xem trước
                        </h1>
                        <div className=" snap-x  grid gap-4 grid-cols-3">
                            {
                                files.length > 0 && (
                                    files.map((file, index) => (
                                        <div key={index} className="   scroll-smooth scrollbar-thumb-sky-700 scrollbar-track-sky-100 relative" >
                                            <img src={file} alt={`preview ${index}`} className="aspect-square  h-full shadow-hard  object-cover rounded-md " />
                                            <div className="absolute top-2 right-2  p-1 rounded-full cursor-pointer" onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}>
                                                <Trash size={16} className="text-red-500 hover:rotate-12 duration-150 transition-transform" />
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <textarea
                        placeholder="Bạn đang nghĩ gì thế?"
                        className=" max-w-100! w-full! md:w-full h-full p-4 rounded-md shadow-hard resize-none rotate-6!"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        onClick={handlePost}
                        className="self-end bg-primary-container! text-white px-4 py-2 rounded-md shadow-hard-sm mt-20! 
                        disabled:bg-gray-400! disabled:cursor-not-allowed! disabled:shadow-none disabled:hover:bg-gray-400! hover:bg-primary-container/90 transition-all
                        ">
                        Đăng bài
                    </button>
                </div>


            </div>

        </div>
    )
}
