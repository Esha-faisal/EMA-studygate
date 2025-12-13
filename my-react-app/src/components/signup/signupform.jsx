import React from 'react';
import { useState, useEffect } from 'react';
import './signupform.css';
import { Link } from "react-router-dom";


import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
    function Signupform() {
        const initialvalue  ={username: "",  password :"", retypepassword:"",email: "",};
        const[ formvalues, setformvalues] = useState(initialvalue);
        const[ formerrors, setformerrors] = useState({});
        const [onSubmit , setonSubmit] = useState(false);

        const handlechange = (e) => {
            // console.log(e.target);
            const {name , value} = e.target;
            setformvalues({...formvalues, [name]: value})
            // console.log(formvalues);
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            setformerrors(validate(formvalues));
            setonSubmit(true);
        } 
            useEffect(()  => {
                // console.log(formerrors);
            if(Object.keys(formerrors).length === 0 && onSubmit){
                console.log ("Form submitted successfully:", formvalues);
            }
             },[formerrors , onSubmit , formvalues])


        const validate = (value)  =>{
            const error = {};
            const regox = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
            
            if (!value.username) {
                error.username = "username is required!";
            }
             if (!value.password) {
                error.password= "Create password!";
            }else if (!passwordRegex.test(value.password))  {
               error.password = "Must be atleast 8 charcter contains Uppercase, number and special symbol!" ;}
             

            if (!value.retypepassword) {
                error.retypepassword = "Retype passwpord!"; }
                else if(value.retypepassword !== value.password){
                    error.retypepassword ="Password not match"
                }

             
            if (!value.email) {
                error.email = "Email is required!";
            } else if(!regox.test(value.email)) {
               error.email = "this is not a valid email format!" ;
            }
            return error;
            
        }

    return (
        <div className= 'full'>
        <div className= 'wrapper'>
           
             
            <form onSubmit={handleSubmit} noValidate>
            
                <h1> Create an account </h1>
                 <div className="input-box">
                   <input type="text"  name="username" placeholder='Username' value={formvalues.username}  onChange={handlechange}/> <FaUserAlt className='icon' /> </div>
                   
                   <p className='error-msg'>  { formerrors.username}   </p>
                   <div  className="input-box">
                   <input type="password"  name="password" placeholder='Password' value={formvalues.password} onChange={handlechange} /><FaLock className='icon' /> </div>
                  
                  <p className='error-msg' >  { formerrors.password}   </p>
                   <div className="input-box">
                   <input type="password" name="retypepassword"  placeholder='Retype password' value={formvalues.retypepassword} onChange={handlechange} /><FaLock className='icon' /> </div>

                    <p className='error-msg'>  { formerrors.retypepassword}   </p>
                   <div className="input-box">
                   <input type="email" name="email"  placeholder='Email' value={formvalues.email}  onChange={handlechange}/> <MdEmail 
                     
                     className='icon'/> </div>
                     <p className='error-msg'>  { formerrors.email}   </p>
                    
                    
                   
                    <button type="submit"> signup    </button>
                <div className="already-account">
                    Already have an account? <Link to="/login">Login</Link>
                </div>

             </form>
        </div>
        </div>
    );
};

export default Signupform;