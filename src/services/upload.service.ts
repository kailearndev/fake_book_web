import { api } from "./api";

export const uploadService = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append(`images`, file);
    });
    try {
        const res = await api<{ urls: string[] }>("/uploads/images", {
            method: "POST",
            body: formData,
        });
        return res.urls;
    } catch (error) {
        throw new Error("Failed to upload files");
    }
}