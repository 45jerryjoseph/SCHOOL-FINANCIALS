import React from 'react'

import '../assets/css/global.css';
import logo from '../assets/img/logo.jpg';
import pens from '../assets/img/pens.jpg';
import { logout , getAccount } from '../assets/js/near/utils';
// import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Students from './Students';
// import Courses from './Courses';
// import Finances from './Finances';

const Dashboard = () => {
    const hat =<svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>;
  const book = <svg xmlns="http://www.w3.org/2000/svg" className="h-13 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>;
  const archive =<svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>;
  const pays ={fin :"/finances"}
  const stud ={studs: "/students"}
  const cou ={cors: "/courses"}
  return (

    <>
   
     <main className="h-14 bg-gradient-to-r from-cyan-500 to-red-500 overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-black to-black-400 flex">  
            <div className="imageobject flex-1">
                <img src={logo} className="left-0 top-1 h-14 rounded " alt=""/>
            </div>
            <div className="float-right flex-1">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-5 my-2 border-b-2 border-blue-400 hover:border-blue-500 rounded float-right mr-2" id="btn" onClick={logout} >
                    logout
                </button>
            </div>
        </div>

            <img src={pens} className="object-cover w-full absolute overflow-hidden" alt="pens"/>
                <div className='mx-[42%] w-60  rounded my-6 absolute bg-slate-400 '>
                  <p className='mx-3 ' >{getAccount}</p>
                </div>
                <div class="md:w-72 h-40 sm:w-44 w-44 top-[50%] left-[40%] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg absolute">
                  <div className='float-center h-47 '> {archive}</div>
                      <div className='bg-red-500 my-5 py-4'>
                        <Link to={pays.fin}>  
                      <button class="rounded-full  border-2 mx-20 px-3 py-1 w-auto">ACCOUNTS</button>
                        </Link>
                      </div>
                </div>
                <div class="md:w-72 h-40 sm:w-44  top-[20%] left-[25%] bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg absolute">
                  <div className='float-center h-47 '> {hat}</div>    
                    <div className='bg-red-500 my-5 py-4'>
                       <Link to={stud.studs}>  
                    <button class="rounded-full  border-2 mx-20 px-3 py-1 w-auto ">STUDENTS</button>    
                     </Link>                          
                    </div>
                </div>
                <div class="md:w-72 h-40 sm:w-44  top-[20%] left-[55%] bg-white bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg absolute ">
                  <div className='float-center h-47 '> {book}</div>
                      <div className='bg-red-500 my-5 py-4'>
                         <Link to={cou.cors}>  
                      <button class="rounded-full  border-2 mx-20 px-6 py-1 w-auto">COURSE</button>
                       </Link>
                      </div>
                </div>
      </main>
    </>
  )
}

export default Dashboard
