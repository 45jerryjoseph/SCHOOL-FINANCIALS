import React from 'react'
import logo from '../assets/img/logo.jpg';
import { deleteStudent, getStudents, logout } from '../assets/js/near/utils';

import{ MdAdd,MdDelete } from "react-icons/md";
import { Link, ReactDOM} from 'react-router-dom';
import { async } from 'regenerator-runtime';

const Students = () => {
  const studfm ={sf: "/students/form"}
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
              <div className="card-body p-4 text-black">
                <div className=" pt-3 pb-2">
                  <h2 className="my-4 text-center text-4xl italic">Students</h2>
                  <div className="d-flex justify-content-between ">
                    <Link to={studfm.sf}>

                    <button className=' float-left  h-8 w-16 flex bg-slate-600 p-1 shadow-xl shadow-red-700' >

                    <MdAdd  className=' h-6'/>
                    Add
                    </button>
                    </Link>
                  </div>
                </div>

                <table className="table text-black w-full  mb-0 border border-slate-500 ">
                  <thead className=' bg-cyan-300 ' >
                    <tr>
                      <th  className=' border border-slate-500'>Name</th>
                      <th   className=' border border-slate-500'>Course</th>
                      <th   className=' border border-slate-500'>Reg-No</th>
                      <th   className=' border border-slate-500'>Age</th>
                      <th   className=' border border-slate-500'>Adm Year</th>
                      <th   className=' border border-slate-500'>Year</th>
                      <th  className=' border border-slate-500'>Action</th>
                    </tr>
                  </thead>
                  <tbody id='tableBody'>
                     
                  </tbody>
                </table>
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

export default Students


export async function displayStudents(){
  const studentsList = await getStudents(0,20);
  let studRecords = '';

  // loop through the list 
  for (let i = 0; i < studentsList.length; i++) {
    const stud = studentsList[i];
    studRecords += studElement(i,stud);
  }
  // updateStudentRecords(studRecords);
  const studRecordsView = studElement(i,stud);
  return studRecordsView
}

function studElement(id, { name, course,  reg_no,age,admyear, year}) {
  return(
    
     <tr key={`${id}`}>
        <td   className=' border border-slate-500'>{name}</td>
        <td   className=' border border-slate-500'>${course}</td>
        <td   className=' border border-slate-500'>${reg_no}</td>
        <td   className=' border border-slate-500'>${age}</td>
        <td   className=' border border-slate-500'>${admyear}</td>
        <td   className=' border border-slate-500'>${year}</td>
        <td  className=' border border-slate-500 mx-autor'><MdDelete className=' decoration-red-700 hover:cursor-pointer w-full'/> <button onClick= {deleteStudent({id})}></button></td>
    </tr>
  );
}

// ReactDOM.render(
//   studElement(),document.getElementById('tableBody')
// )

// function updateStudentRecords(studRecords){
//   const studRecordsView = studElement(i,stud);
//   return studRecordsView
// }