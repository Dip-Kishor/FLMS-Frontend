"use client";
// import { Suspense } from "react";
import React, { useRef,useState ,useEffect} from "react";
import axios from "axios";
import {port} from "@/constants/appl.constant";
import LoginButton from "@/components/UI/LoginButton";
import Link from "next/link";
import { usePopup } from "@/components/UI/Popup";
import { useFlmsPopup } from "@/components/UI/FLMS.Popup";
// import LoadingOverlay from "@/components/UI/LoadingSpinner";
import Loading from "@/components/UI/Loading";
import Cookies from "js-cookie";
import Modal from "@/components/UI/Modal";
import Spinner from "@/components/UI/Spinner"; // adjust the path as needed
import { FiEye, FiEyeOff } from "react-icons/fi";


// import { useSearchParams } from "next/navigation";


const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showPopup } = usePopup();
  const { showFlmsPopup } = useFlmsPopup();
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);
  const [resetPasswordError, setResetPasswordError] = React.useState<string | null>(null);
  const [isCodeModalOpen, setCodeIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordIsModalOpen] = useState(false);
  const [modeOfButton, setModeOfButton] = useState("Reset");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
      const [resendTimer, setResendTimer] = useState(60); // in seconds

    // const searchParams = useSearchParams();
    // const message = searchParams.get("message");
    
  // useEffect(() => {
  //   if (message) {
  //     showPopup(message, "warning");
  //   }
  // }, []);
  useEffect(() => {
  if (isCodeModalOpen) {
    // Focus the first input after a short delay to ensure the modal has mounted
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }
  let interval: NodeJS.Timeout;

  if (isResendDisabled) {
    interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [isCodeModalOpen,isResendDisabled]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoadingSpinner(true);
// Show loading indicator
    e.preventDefault();
    const payload = { email, password };

    try {
        const response = await axios.post(`${port}/userApi/login`, payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
  
        if (response.data.status === 4) {
            setLoading(false);
            const token = response.data.data.token;
            const userData = response.data.data;
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000; 
            // Cookies.set("token", token, { expires: 1 / 8640 }); 
            Cookies.set("token_expiry", expirationTime.toString(), 
            { expires: 1 ,
              path:"/" 
            });
            Cookies.set("token", token, {
              expires: 1,
              path: "/",
            });
            Cookies.set(
              "userData",
              JSON.stringify({
                email: response.data.data.email,
                userName: response.data.data.userName,
                role: response.data.data.role,
              }),
              { expires: 1, path: "/" }
            );
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("token_expiry", expirationTime.toString());
            sessionStorage.setItem("userData", JSON.stringify(userData));
          showFlmsPopup(response.data.message, "success","/");
          // window.location.href = "/";
        } else {
            setLoading(false);
          showPopup(response.data.message, "warning");
        }
      } catch (error) {
            setLoadingSpinner(false);

        console.error("Error during login:", error);
        showPopup("An error occurred during login.", "warning");
      } finally {
            setLoadingSpinner(false);
// Hide loading indicator
      }
  };
 const handlePasswordChange = async()=>{
    setIsModalOpen(true);
  }
  const handleResetPasswordSubmit = async(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)=>{
    setLoadingSpinner(true);
    setIsResendDisabled(true);
     e.preventDefault();
     try {
        const response = await axios.post(`${port}/userApi/forgotPassword?email=${email}`,null , {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.data.status === 4) {
          setLoadingSpinner(false);
          setIsModalOpen(false);
          setCodeIsModalOpen(true);
        } else {
          setLoadingSpinner(false);
          setResetPasswordError(response.data.message);
        }
      } catch (error) {
        setLoadingSpinner(false);
        console.error("Error:", error);
        showPopup("An error occurred while reseting your password.", "warning");
      } finally {
        setLoadingSpinner(false); // Hide loading indicator
      }
  };


  //Code input design
const handleCodeChange = (index: number, value: string) => {
  setResetPasswordError("")
  if (!/^\d?$/.test(value)) return;

  const newCode = [...code];
  newCode[index] = value;
  setCode(newCode);

  // Clear red border if fixed
  if (value.trim() !== "") {
    setInvalidIndexes((prev) => prev.filter((i) => i !== index));
  }

  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    setResetPasswordError("");
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

 const handleCodeSubmit = async(e: React.FormEvent) => {
  e.preventDefault();

  const emptyIndexes = code
    .map((digit, index) => (digit.trim() === "" ? index : -1))
    .filter((i) => i !== -1);

  if (emptyIndexes.length > 0) {
    setInvalidIndexes(emptyIndexes);
    // Optionally focus the first empty input
    inputRefs.current[emptyIndexes[0]]?.focus();
    return;
  }

  setInvalidIndexes([]); // Clear any previous errors if valid
  const finalCode = code.join("");
  console.log("Submitted Code:", finalCode);
  // Submit finalCode to backend
   try {
        const response = await axios.post(`${port}/userApi/codeVerify?email=${email}&code=${finalCode}`,null , {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.data.status === 4) {
          setLoadingSpinner(false);
          setCodeIsModalOpen(false);
          setPasswordIsModalOpen(true);
          setResetPasswordError("");
        } else {
          setLoadingSpinner(false);
          setResetPasswordError(response.data.message);
        }
      } catch (error) {
        setLoadingSpinner(false);
        console.error("Error:", error);
        showPopup("An error occurred while reseting your password.", "warning");
      } finally {
        setLoadingSpinner(false); // Hide loading indicator
      }
};
const handleNewPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingSpinner(false);
    e.preventDefault();
    const payload = { email, password ,confirmPassword};

    try {
        const response = await axios.post(`${port}/userApi/resetPassword`, payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
  
        if (response.data.status === 4) {
            setPasswordIsModalOpen(false)
          showFlmsPopup(response.data.message, "success","/Auth/login");
          // window.location.href = "/";
        } else {
            setLoadingSpinner(false);
          setResetPasswordError(response.data.message);
        }
      } catch (error) {
        setLoadingSpinner(false);
        console.error("Error:", error);
        setResetPasswordError('Error Occurred');
      } finally {
        setLoadingSpinner(false); // Hide loading indicator
      }
  };
  return (
    <>
    {loading ? <Loading /> : <></>}
    <div className="min-h-screen flex items-center justify-center bg-[#dbe9e2] bg-cover ">
      <div className="w-[1188px]  bg-no-repeat  h-[50vh]">
        <div className="w-[300px] md:w-[700px] mx-auto bg-white  rounded-md flex flex-col md:flex-row">
          <div className="hidden w-full md:w-1/2 h-[340px] bg-cover bg-[url('/Stadium2.jpg')] text-center text-white md:flex flex-col justify-end p-5">
            {/* <Logo /> */}
            <p className="text-3xl pb-2">FLMS</p>
            <p className="text-1xl">Login to explore more and register for up coming tournament.</p>
          </div>
          <div className="w-full md:w-1/2 px-6 pt-5 ">
          <p className="">Welcome Back!</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                 Username or Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="user or user@example.com"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 pr-10 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform text-xl text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

              <div className="w-full">
                <LoginButton name="Login" loading={loadingSpinner} />
              </div>
            </form>
            <div className="link text-center py-3 space-x-2">
              <button
                onClick={handlePasswordChange}
                className="underline text-[#4C6F35] focus:outline-none cursor-pointer"
              >
                Forgot Password?
              </button>
              <span className="text-gray-400"></span>
              <Link href="/Auth/register" className="underline text-[#4C6F35]">
                Create Account!
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModeOfButton("Reset");
          setEmail("");
          setPassword("");
        }}
        title="Reset Password"
        size="sm"
        footerButtons={[]}
      >
        <div className="">
          <form onSubmit={handleResetPasswordSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 block w-full p-2 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
              placeholder="user@example.com"
              required
            />
            {resetPasswordError && (
              <p className="text-sm text-red-600 mb-3">{resetPasswordError}</p>
            )}
            <hr/>
            <div className="flex justify-end gap-2 pt-2">
              {loadingSpinner ? (
                  <Spinner text="Processing..." />
                ) : (
                  <button
                    type="submit"
                    className="bg-[#4C6F35] text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {modeOfButton}
                  </button>
                )}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setModeOfButton("Reset");
                  setEmail("");
                  setPassword("");
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </form>
        </div>
    </Modal>
    <Modal
        isOpen={isCodeModalOpen}
        onClose={() => {
          setCodeIsModalOpen(false);
          setModeOfButton("Proceed");
          setEmail("");
          setPassword("");
        }}
        title="Reset Password"
        size="sm"
        footerButtons={[]}
      >
        <div className="">
          <form onSubmit={handleCodeSubmit}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter Code
      </label>
      <div className="flex justify-between gap-2 mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={`w-10 h-12 text-center text-xl border-2 rounded focus:outline-none
              ${invalidIndexes.includes(index) ? 'border-red-500' : 'border-gray-300 focus:border-[#4C6F35]'}`}
          />
        ))}
      </div>
      <p>
        <button
          type="button"
          onClick={handleResetPasswordSubmit}
          disabled={isResendDisabled}
          className={`text-gray-700 px-4 py-2 hover:text-gray-800 ${
            isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend?"}
        </button>
      </p>
      {resetPasswordError && (
        <p className="text-sm text-red-600 mb-3">{resetPasswordError}</p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        {loadingSpinner ? (
          <Spinner text="Processing..." />
          ) : (
            <button
              type="submit"
              className="bg-[#4C6F35] text-white px-4 py-2 rounded hover:bg-green-600"
            >
            Proceed
            </button>
          )}
          <button
            type="button"
            onClick={() => {
            setCode(Array(6).fill(""));
            setCodeIsModalOpen(false);
            setModeOfButton("Proceed");
            setEmail("");
            setPassword("");
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
          >
           Close
          </button>
         </div>
        </form>
      </div>
    </Modal>
     <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setPasswordIsModalOpen(false);
          setModeOfButton("Proceed");
          setEmail("");
          setPassword("");
        }}
        title="Reset Password"
        size="sm"
        footerButtons={[]}
      >
        <div className="">
          <form onSubmit={handleNewPasswordSubmit}>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                 New Password
                </label>
                <input
                  type={showPassword?"text":"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform text-xl text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showPassword?"text":"password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform text-xl text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

          
            {resetPasswordError && (
              <p className="text-sm text-red-600 mb-3">{resetPasswordError}</p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              {loadingSpinner ? (
                <Spinner text="Processing..." />
                ) : (
            <button
              type="submit"
              className="bg-[#4C6F35] text-white px-4 py-2 rounded hover:bg-green-600"
            >
            Proceed
            </button>
          )}
          <button
            type="button"
            onClick={() => {
            setCode(Array(6).fill(""));
            setPasswordIsModalOpen(false);
            setModeOfButton("Proceed");
            setEmail("");
            setPassword("");
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
          >
           Close
          </button>
         </div>
        </form>
      </div>
    </Modal>
    </>
  );
};

export default Page;
