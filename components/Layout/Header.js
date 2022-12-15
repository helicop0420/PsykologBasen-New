/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = ({handleOpen,handleRemove,openClass}) => {
    const [scroll, setScroll] = useState(0)
    const { user } = useSelector(({ user }) => user);

    const handleLogout = () => {
        localStorage.removeItem("psbUser");
        location.href = "/"
    };
    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY > 200
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
          }
        })
      })
    return (
        <>
            <header className={scroll ? "header sticky-bar stick" : "header sticky-bar"}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/"><h3 className='cursor'>PsykologBasen</h3></Link>
                            </div>
                        </div>
                        <div className="header-right d-flex align-items-center">
                            <div>
                                <Link href="/register" className="btn hover-up w-100 " name="register">Register Psychologist</Link>
                            </div>
                            <div className='ml-30'>
                                <Link href="/register_user" className="btn hover-up w-100" name="register">Register User</Link>
                            </div>
                            {
                                user && 
                                <div className='ml-30'>
                                    <Link href={`/edit/${user.id}`} className="btn hover-up w-100" name="register">My Profile</Link>
                                </div>
                            }
                            <div className='ml-30'>
                                {
                                    user ? 
                                    <p className="btn hover-up w-100" name="register" onClick={handleLogout} >Logout</p> : 
                                    <Link href="/login" className="btn hover-up w-100" name="register">Login</Link>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;