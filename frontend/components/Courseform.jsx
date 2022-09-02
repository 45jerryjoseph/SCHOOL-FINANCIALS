import React from 'react'
import logo from '../assets/img/logo.jpg';
import { logout } from '../assets/js/near/utils';

const Courseform = () => {
  return (
    <>
    <header className="h-14 bg-gradient-to-r from-cyan-500 to-red-500 overflow-hidden">
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
  </header>
  <main className='h-screen bg-red-200 bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg'>
    <section className="vh-100 gradient-custom-2">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10">
          <div className="card mask-custom">
            <div className="card-body p-4 text-white ">
              <form className=' bg-red-200 bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg' >
               <h2  className="display-5 text-center text-black text-3xl py-6">Add New Course</h2>
                <div className="row mb-3 flex gap-7 px-[40%] my-5">
                <div className="col">
                    <input className='text-black'
                      name="Course Id"
                      type="text"
                      class="form-control"
                      placeholder="Course Id"
                      aria-label="Course Id"
                    />
                  </div>
                </div>
                <div className="row mb-3 flex gap-7 px-[40%]">
                
                  <div className="col">
                    <input className='text-black'
                      name="Course Name"
                      type="number"
                      class="form-control"
                      placeholder="Course Name"
                      aria-label="Course Name"
                    />
                  </div>
                </div>
                <button type="submit" className="px-[49%] rounded-lg bg-green-800 my-7">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
  </>
  )
}

export default Courseform