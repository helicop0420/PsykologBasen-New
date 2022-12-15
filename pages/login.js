import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from 'axios'
import { useSelector } from "react-redux";

export default function registerUser() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useSelector(({ user }) => user);
    const handleRegisterUser = () => {
        axios.post('http://localhost:7777/psychologist/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            if(response.status == 201) {
                const user = { token: response.data };
                localStorage.setItem("psbUser", JSON.stringify(user));
            }
            location.href = "/"
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        console.log("user-------------->", user)
    }, [user])
    return (
        <>
            <Layout>
                <div className="container">
                    <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Sign In </p>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Email</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <div>Password</div>
                            <input className="input-newsletter w-search" required type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button className="btn btn-default btn-find font-sm" onClick={handleRegisterUser} >Login</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
