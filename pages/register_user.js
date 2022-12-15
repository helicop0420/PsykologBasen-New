import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from 'axios'

export default function registerUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleRegisterUser = () => {
        axios.post('http://localhost:7777/user/register', {
            name: name,
            email: email,
            phoneNumber: phoneNumber
        })
        .then(function (response) {
            console.log(response);
            location.href = "/"
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <>
            <Layout>
                <div className="container">
                    <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Register a user </p>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Name</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Email</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <div>PhoneNumber</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button className="btn btn-default btn-find font-sm" onClick={handleRegisterUser} >Register</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
