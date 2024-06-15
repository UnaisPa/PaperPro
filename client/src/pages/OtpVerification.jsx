import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeToRegister } from '../redux/condRenderSlice.js';
import { Link, useNavigate, } from "react-router-dom";
import axios from "../axios.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { BiMobile } from 'react-icons/bi';


const OtpVerification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [resend, setResend] = useState(false);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);

    const [inputs, setInputs] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const {currentUser} = useSelector((state)=>state.tempUser);

    useEffect(() => {
        
        const interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds(seconds - 1);
            }
        
            if (seconds === 0) {
              if (minutes === 0) {
                clearInterval(interval);
              } else {
                setSeconds(59);
                setMinutes(minutes - 1);
              }
            }
          }, 1000);
        
          return () => {
            clearInterval(interval);
          };
    }, [seconds,resend]);

    useEffect(()=>{
        inputRefs.current[0].focus();
    },[])

    const handleKeyDown = (e, index) => {
        if (
            !/^[0-9]{1}$/.test(e.key)
            && e.key !== 'Backspace'
            && e.key !== 'Delete'
            && e.key !== 'Tab'
            && !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (index > 0 || (index === 0 && inputs[0] !== '')) {
                inputRefs.current[index === 0 ? index : index - 1].focus();
                setInputs((prevInputs) => {
                    const newInputs = [...prevInputs];
                    newInputs[index] = '';
                    return newInputs;
                });
            }
        }
    };

    const handleInput = (e, index) => {
        const { value } = e.target;
        if (value) {
            if (index < inputs.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
        setInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = value;
            return newInputs;
        });
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!/^[0-9]{6}$/.test(text)) {
            return;
        }
        const digits = text.split('');
        setInputs(digits);
        inputRefs.current[5].focus();
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const number = inputs.join('');
        console.log(number)
        if(number.trim()==''){
            return toast.warning('Please enter the OTP to verify your account.');
        }else if(number.length<6){
            return toast.warning('Please enter the full 6-digit OTP to verify your account.')
        }

        try{
            const data = {
                name:currentUser.name,
                email:currentUser.email,
                mobile:currentUser.mobile,
                password:currentUser.password,
                otp:number
            }
            await axios.post("/users/verify_otp",data).then((response)=>{
                //console.log(response.data)
                if(response.data.success){
                    toast.success(response.data.message);
                    toast.info('Redirecting to Login Page!')
                    setTimeout(()=>{
                        setResend(false)
                        navigate("/login");
                    },1500)
                }else{
                    console.log(response)
                    toast.error(response.data?.message);
                }
            })
        }catch(err){
            toast.error(err.response ? err.response.data : err.message);
        }
        // Add your verification logic here
    };

    const resendOtp = async (e)=>{
        e.preventDefault();
        setResend(true)
        try{
            await axios.post('/users/resend_otp',{email:currentUser.email}).then((response)=>{
                if(response.data.success){
                    toast.success(response.data.message);
                    setMinutes(1);
                    // dispatch(signInSuccess(formData));
                    // dispatch(changeToVerification())
                    
                    
                }else{
                    toast.error(response.data.message);
                }
            })
        }catch(err){
            toast.error(err.response?err.response.data : err.message);
        }
    }

    return (
        <div className='max-w-md sm:mx-auto text-center mt-[27vh] sm:mt-[20vh] sm:bg-slate-600 sm:bg-opacity-15 mx-2 px-4 sm:px-8 py-10 rounded-xl shadow' >
            <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-slate-200">Email OTP Verification</h1>
                <p className="text-[15px] text-slate-400">Enter the 6-digit verification code that was sent to your Email ID</p>
            </header>
            <form id="otp-form" onSubmit={handleSubmit}>
                <div className='flex items-center justify-center gap-3'>
                    {inputs.map((value, index) => (
                        <input
                            className="w-11 h-10 sm:w-14 sm:h-14 text-center text-sm sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            maxLength={1}
                        />
                    ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                    <button type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-black shadow-sm shadow-indigo-950/10 hover:bg-hoverColor focus:outline-none focus:ring focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">Verify
                        Account
                    </button>
                </div>
                <div className="countdown-text mt-5">
      {seconds > 0 || minutes > 0 ? (
        <p className='text-xs text-slate-400' >
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p className='text-xs text-slate-400' >Didn't recieve code?</p>
      )}

      <button onClick={resendOtp}
        disabled={seconds > 0 || minutes > 0}
        style={{
          color: seconds > 0 || minutes > 0 ? "grey" : "#fff",
        }}
        
      >
        Resend OTP
      </button>
    </div>
            </form>
        </div>
    );
};

export default OtpVerification;


