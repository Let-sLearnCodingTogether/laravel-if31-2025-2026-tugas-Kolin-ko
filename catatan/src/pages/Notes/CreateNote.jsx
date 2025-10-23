import http from "@/api/apiClient";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useId, useState } from "react";
import { useNavigate } from "react-router";

export default function CreateNote(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        title : "",
        content : "",
        category : ""
    });

     const handleOnChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async (event) => {
            event.preventDefault();
            try {
                setIsLoading(true);
                const response = await http.post("/note", form);

                if (response.status === 201) {
                    navigate("/list-note", {
                        replace: true
                    });
                }
            } catch (error) {
                console.log("Gagal menambahkan Catatan:", error);
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <div className="flex flex-col sm:h-screen p-4 h-full bg-gray-900">
            <h1 className="font-semibold text-2xl mb-5 text-white">Buat Catatan</h1>
            <form onSubmit={onSubmit}>
                <div className="space-y-3">
                    <Input name="title" value={form.title} onChange={handleOnChange} label="Title" placeholder="Judul..." />
                    <Input name="content" value={form.content} onChange={handleOnChange} label="Content" placeholder="Isi kutipan..." />
                    <Input name="category" value={form.category} onChange={handleOnChange} label="Category" placeholder="Kategori..." />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    )
}