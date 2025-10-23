import { useState } from "react";
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button"
import http from "../../../../api/apiClient";
import { NavLink, useNavigate } from "react-router";

export default function RegisterPage(){
    const [form, setForm] = useState({
        email : "",
        name : "",
        password : "",
        cpassword : ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setForm({
            ...form,
            [name] : value
        })
    }



     const handleRegist = async (event) => {
        event.preventDefault();
        try {
          setIsLoading(true);
          const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.cpassword
          }
          const response = await http.post("/register", payload)
          console.log(response.data);
          if (response.status == 201) {
            navigate("/", {
              replace: true
            })

          } else {
            console.log("Registration failed with status:", response.status);
        }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
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
                required
                onChange={handleFormChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">Name</label>
                <input 
                name="name" 
                type="text"
                value={form.name}
                required
                onChange={handleFormChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">Password</label>
                <input 
                name="password" 
                type="password"
                value={form.password}
                required
                onChange={handleFormChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                placeholder="Enter password" />
                <p className={(form.password.length < 8) ? "text-red-400" : "text-green-300"}>
                {(form.password.length < 8) ? "Password kurang dari 8 karakter" : "Password sudah cukup"}
                </p>
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
                <input 
                name="cpassword" 
                type="password" 
                value={form.cpassword}
                required
                onChange={handleFormChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                placeholder="Enter confirm password" />
                <p className={(form.password === form.cpassword) ? "text-green-300" : "text-red-400"}>
                {(form.password === form.cpassword) ? "Password sama" : "Password tidak sama"}
                </p>
              </div>
            </div>

          <div className="mt-12">
            <Button type="submit" disabled={isLoading} className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none cursor-pointer">
              {isLoading ? "Creating..." : "Create an account"}
            </Button>
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-400">Already have an account?
            <NavLink to="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here
            </NavLink>  
          </p>
        </form>
      </div>
    </div>

}