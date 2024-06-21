import React, { useEffect ,useState } from 'react'
import {Container , Logo ,LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'


function Header() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setUserName(user.name); // Assuming user.name contains the username
                    setEmail(user.email); // Assuming user.name contains the username
                }
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };

        if (authStatus) {
            fetchUser();
        }
    }, [authStatus] );

    return (
        <header className='py-3 shadow rounded-t-2xl bg-blue-950'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-4 text-white'>
                        <Link to='/'>
                            <Logo width='70px'/>

                        </Link>
                    </div>
                    {authStatus && (
                    <div className='mx-auto p-2 px-3 gap-8 flex items-center justify-around rounded-2xl text-white'>
                        <div className='bg-black p-2 rounded-2xl px-3'>Welcome: {userName} 😎</div>
                        <div className='underline text-[15px]'>{email}</div>
                    </div>
                )}
                    <ul className='flex ml-auto text-white'> 
                        {navItems.map((item, index) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button 
                                    onClick= {() => navigate(item.slug)}
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-black rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null 
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>

    )
}

export default Header
