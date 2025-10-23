import http from "../../api/apiClient";
import { NavLink } from "react-router";
import { useCallback, useEffect, useState } from "react";

export default function NotesPages() {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState([]);

    const fetchNotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await http.get("/");

            setNotes(response.data.data);

        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return <div className="container mx-auto space-y-5">
            <h1 className="font-semibold text-2xl">Catatan</h1>
            <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700">
                {notes.map((notes) => (
                    <li key={notes.id} className="pt-4 p-5 border border-slate-300">
                        <blockquote className="text-zinc-800 dark:text-zinc-100 italic">
                            “{notes.title}”
                        </blockquote>
                        <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            — {notes.content}
                        </div>
                        {notes.category && (
                            <span className="mt-2 inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                {notes.category}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    }
    
}