import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter, Link, Route ,Routes } from 'react-router-dom';

import { Dashboard , Students,Courses, Finances, Studform, Courseform, Financeform} from './components/index';


import './assets/css/global.css';
import logo from './assets/img/logo.jpg';
import pens from './assets/img/pens.jpg';


import {login } from './assets/js/near/utils';
import getConfig from './assets/js/near/config';


export default function App() {
//   const hat =<svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//   <path d="M12 14l9-5-9-5-9 5 9 5z" />
//   <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
// <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
// </svg>;
// const book = <svg xmlns="http://www.w3.org/2000/svg" className="h-13 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
// </svg>;
// const archive =<svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-20   mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
// </svg>;
  // // use React Hooks to store greeting in component state
  // const [greeting, setGreeting] = React.useState()

  // // when the user has not yet interacted with the form, disable the button
  // const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // // after submitting the form, we want to show Notification
  // const [showNotification, setShowNotification] = React.useState(false)

  // // The useEffect hook can be used to fire side-effects during render
  // // Learn more: https://reactjs.org/docs/hooks-intro.html
  // React.useEffect(
  //   () => {
  //     // get_greeting is in near/utils.js
  //     // get_greeting()
  //     //   .then(greetingFromContract => {
  //     //     setGreeting(greetingFromContract)
  //     //   })
  //   },

  //   // The second argument to useEffect tells React when to re-run the effect
  //   // Use an empty array to specify "only run on first render"
  //   // This works because signing into NEAR Wallet reloads the page
  //   []
  // )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
      
      <main className="h-14 bg-gradient-to-r from-cyan-500 to-red-500 overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-black to-black-400 flex">  
            <div className="imageobject flex-1">
                <img src={logo} className="left-0 top-1 h-14 rounded " alt=""/>
            </div>
            <div className="float-right flex-1">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-5 my-2 border-b-2 border-blue-400 hover:border-blue-500 rounded float-right mr-2" id="btn" onClick={login} >
                    Login
                </button>
            </div>
        </div>

            <img src={pens} className="object-cover w-full absolute overflow-hidden" alt="pens"/>
            <div className="absolute top-[40%] left-[40%]  py-9 px-12 bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg hover:bg-gradient-to-r from-cyan-300 to-black ">
                <p className="font-serif  hover:italic font-semibold text-xl  ">SCHOOL RECORDS</p>
            </div>
      </main>
     
      </>
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/finances" element={<Finances/>}/>
          <Route exact path="/courses" element={<Courses/>} />
          <Route exact path="/students" element={<Students />} />
          <Route exact path="/students/form" element={<Studform />} />
          <Route exact path="/courses/form" element={<Courseform />} />
          <Route exact path="/finances/form" element={<Financeform />} />


        </Routes>
      </BrowserRouter>
    </>
    
    
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'set_greeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
