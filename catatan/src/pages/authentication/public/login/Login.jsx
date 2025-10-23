import { useState } from "react";
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button"
import http from "../../../../api/apiClient";

export default function LoginPage(){
    const [form, setForm] = useState({
        email : "",
        password : ""
    })

    const [notes, setNotes] = useState([])
    

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setForm({
            ...form,
            [name] : value
        });
    }

     const fetchNotes = async () => {
        const response = await http.get('/note')
        console.log(response.data.data.data);
        
        setNotes(response.data.data.data)
    } 

     const handleLogin = async (event) => {
        event.preventDefault();

        const response = await http.post("/login", form)
        console.log(response);

        if(response.status == 200) {
            sessionStorage.setItem("token-bebas",
                response.data.data.token)
                fetchNotes()
        }
    }

     return <div className="h-full bg-gray-900">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Catatan Bung"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-auto w-40"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Catatan Pribadi</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} method="POST" className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    placeholder="Enter Email"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleFormChange}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    placeholder="Enter password"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Sign in
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
                Belum ada akun?{' '}
                <a href="/register" className="font-semibold text-blue-600 hover:underline ml-1">
                Register
                </a>
            </p>
            </div>
        </div>
        </>
        </div>
    </div>

}