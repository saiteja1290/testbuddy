import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    useEffect(() => {
        const toggleButton = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-default');
        const signInButtons = document.querySelectorAll('.sign-in-btn');

        // Navbar toggle function
        toggleButton.addEventListener('click', () => {
            navbarMenu.classList.toggle('hidden');
        });

        // Hover effect function
        signInButtons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.classList.add('hovered');
            });
            button.addEventListener('mouseout', () => {
                button.classList.remove('hovered');
            });
        });

        // Cleanup event listeners on unmount
        return () => {
            toggleButton.removeEventListener('click', () => {
                navbarMenu.classList.toggle('hidden');
            });
            signInButtons.forEach(button => {
                button.removeEventListener('mouseover', () => {
                    button.classList.add('hovered');
                });
                button.removeEventListener('mouseout', () => {
                    button.classList.remove('hovered');
                });
            });
        };
    }, []);

    return (
        <nav className="bg-indigo-800 dark:bg-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100">TestBuddy</span>
                </a>
                <button id="navbar-toggle" data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:text-gray-100 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-indigo-600 rounded-lg bg-indigo-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-indigo-800 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-800">
                        <li>
                            <Link to='/studentlogin' className="sign-in-btn block py-2 px-3 text-gray-100 rounded hover:bg-indigo-600 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 dark:text-gray-100 md:dark:hover:text-indigo-500 dark:hover:bg-indigo-600 dark:hover:text-gray-100 md:dark:hover:bg-transparent">Student Login</Link>
                        </li>
                        <li>
                            <Link to='/adminlogin' className="sign-in-btn block py-2 px-3 text-gray-100 rounded hover:bg-indigo-600 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 dark:text-gray-100 md:dark:hover:text-indigo-500 dark:hover:bg-indigo-600 dark:hover:text-gray-100 md:dark:hover:bg-transparent">Admin Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
