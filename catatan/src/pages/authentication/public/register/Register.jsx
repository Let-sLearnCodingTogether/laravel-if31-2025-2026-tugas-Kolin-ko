import { useState } from "react";
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button"
import http from "../../../../api/apiClient";

export default function RegisterPage(){
    const [form, setForm] = useState({
        email : "",
        password : "",
        cpassword : ""
    })

    const [notes, setNotes] = useState([])
    

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setForm({
            ...form,
            [name] : value
        })
    }

     const fetchNotes = async () => {
        const response = await http.get('/note')
        console.log(response.data.data.data);
        
        setNotes(response.data.data.data)
    } 

     const handleRegist = async (event) => {
        event.preventDefault();

         if (form.password !== form.cpassword) {
            alert("Tidak sama bro password dengan confirm password");
            return;
        }

        const response = await http.post("/register", form)
        console.log(response);

        if(response.status == 201) {
            sessionStorage.setItem("token-bebas",
                response.data.data.token)
                fetchNotes()
        }
    }

     return <div className="flex flex-col justify-center sm:h-screen p-4 h-full bg-gray-900">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="logo" className="w-40 inline-block" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Catatan Pribadi</h2>
        </div>

        <form onSubmit={handleRegist}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-100">Email</label>
              <input 
              name="email" 
              type="text"
              value={form.email}
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-100">Password</label>
              <input 
              name="password" 
              type="password"
              value={form.password}
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
              placeholder="Enter password" />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
              <input 
              name="cpassword" 
              type="password" 
              value={form.cpassword}
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter confirm password" />
            </div>
          </div>

          <div className="mt-12">
            <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none cursor-pointer">
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <a href="/" className="text-blue-600 font-medium hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>

}