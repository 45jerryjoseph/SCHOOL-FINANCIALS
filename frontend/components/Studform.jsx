import React, { useState } from 'react';
import { async } from 'regenerator-runtime';
import logo from '../assets/img/logo.jpg';
import { logout, newStudent } from '../assets/js/near/utils';

const Studform = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [reg, setReg] = useState("");
  const [age, setAge] = useState("");
  const [admyear, setAdmyear] = useState("");
  const [year, setYear] = useState("");
 
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
              <form className=' bg-red-200 bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg' onSubmit={newStudForm} >
               <h2  className="display-5 text-center text-black text-3xl py-6">Add New Student</h2>
                <div className="row mb-3 flex gap-7 px-[40%] my-5">
                  <div className="col">
                    <input className='text-black'
                    style={{ color: "black" }}
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      value={name} onChange={(e)=> setName(e.target.value)}
                    />
                  </div>
                  <div className="col ">
                    <input className=' pl-3'
                    style={{ color: "black" }}
                      name="Course"
                      type="text"
                      class="form-control"
                      placeholder="Course"
                      aria-label="Course"
                      value={course} onChange={(e)=> setCourse(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3 flex gap-7 px-[40%]">
                  <div className="col">
                    <input className='text-black'
                    style={{ color: "black" }}
                      name="Reg_No"
                      type="text"
                      class="form-control"
                      placeholder="Reg No"
                      aria-label="Reg No"
                      value={reg} onChange={(e)=> setReg(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input style={{ color: "black" }}
                      name="Age"
                      type="number"
                      class="form-control"
                      placeholder="Age"
                      aria-label="Age"
                      value={age} onChange={(e)=> setAge(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3 flex gap-7 px-[40%]">
                  <div className="col">
                    <input style={{ color: " black" }}
                      name="Adm_Year"
                      type="number"
                      class="form-control"
                      placeholder="Adm Year"
                      aria-label="Adm Year"
                      value={admyear} onChange={(e)=> setAdmyear(e.target.value)}
                    />
                  </div>
                  <div className="col bg-black">
                    <input style={{ color: "black" }}
                      name="year"
                      type="number"
                      class="form-control"
                      placeholder="Year"
                      aria-label="Year"
                      value={year} onChange={(e)=> setYear(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="px-[49%] rounded-lg bg-green-800 my-7" >Add</button>
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

export default Studform

const newStudForm = async (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const course = e.target.Course.value;
    const reg_no = e.target.Reg_No.value;
    const age = e.target.Age.value;
    const admyear = e.target.Adm_Year.value;
    const year = e.target.year.value;

    const addedStudent = await newStudent(
      name,
      course,
      reg_no,
      Number.parseInt( age),
      Number.parseInt( admyear),
      Number.parseInt( year)
    );
    if (addedStudent != null){
      window.location.href = "/students"
    }else{

      newStudForm.reset();
    }
}