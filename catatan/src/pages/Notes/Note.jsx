import http from "../../api/apiClient";
import { useNavigate, NavLink } from "react-router";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/ui/Button";

export default function NotesPages() {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    
   const handleLogout = useCallback( async() => {
        try {
            await http.post("/logout");
        } catch (error) {
            console.log(error);
        } finally {
            navigate("/", { 
                replace: true 
            });
        }
    },[navigate]);


    const fetchNotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await http.get("/note");
            console.log(response.data.data)

            setNotes(response.data.data);

        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])


     const deleteNote = async (id) => {

        try {
            setIsLoading(true);
            const response = await http.delete(`/note/${id}`);
            if (response.status === 200) {
                fetchNotes();
            }
        } catch (error) {
            console.log("Gagal menghapus Catatan:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);


    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return <div className="flex flex-col sm:h-screen p-4 h-full bg-gray-900">
            <h1 className="font-semibold text-2xl pb-3 text-white ">Catatan Pribadi </h1>
              <NavLink
                to="/new-note"
                className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Buat Catatan Baru
            </NavLink>
            <button className="flex justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" onClick={handleLogout}>Logout</button>
            
            <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700 bg-gray-900 ">
                {notes.map((note) => (
                    <li key={note.id} className="pt-4 p-5 border rounded-2xl border-slate-300">
                        <h1 className="text-zinc-50 dark:text-zinc-100 text-lg">
                            {note.title}
                        </h1>
                        <div className="mt-1 text-sm text-white font-sans">
                            {note.content}
                        </div>
                        {note.category && (
                            <span className="mt-2 inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                {note.category}
                            </span>
                        )}
                        <div className="mt-5">
                            <Button className = "justify-center rounded-md bg-red-500 px-3 py-2 text-sm/6 font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            onClick={() => deleteNote(note.id)}>Hapus</Button>
                            <NavLink to={`/update-note/${note.id}`}
                            className={" justify-center rounded-md bg-green-500 px-3 py-2.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"}>
                                Update</NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    }
    
}