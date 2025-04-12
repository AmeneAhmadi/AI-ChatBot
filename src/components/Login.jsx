import { useContext, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import chatGPTIconBlack from "../assets/chat-gpt-black.svg";
import Captcha from "../assets/recaptcha logo.svg";
import GoogleIcon from "../assets/icons/Google Logo.svg";
import MicrosoftIcon from "../assets/icons/Microsoft Logo.svg";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userLogin } = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username) {
      usernameRef.current.focus();
      return "Username is required!";
    }
    if (!formData.password) {
      passwordRef.current.focus();
      return "Password is required!";
    }
    if (!checkboxRef.current.checked)
      return "Please verify that you are not a robot!";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    const errorMessage = await userLogin(formData.username, formData.password);
    errorMessage ? setError(errorMessage) : navigate("/chat");
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen ">
      <div className="flex justify-center items-center w-12">
        <img src={chatGPTIconBlack} alt="icon" className="w-full h-full" />
      </div>
      <p className="flex justify-center items-center sm:text-2xl text-center font-bold">
        Welcome back
      </p>
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleLogin}
          className="relative flex flex-col gap-4 sm:w-80"
        >
          <div className="relative">
            <input
              ref={usernameRef}
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              value={formData.username}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FA47F] focus:outline-none focus:ring-0 focus:border-[#0FA47F] peer"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#0FA47F] peer-focus:dark:text-[#0FA47F] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Username*
            </label>
          </div>
          <div className="relative">
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              value={formData.password}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FA47F] focus:outline-none focus:ring-0 focus:border-[#0FA47F] peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#0FA47F] peer-focus:dark:text-[#0FA47F] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password*
            </label>
          </div>
          <div className="border flex justify-between items-center rounded-lg p-2.5">
            <div className="flex items-center gap-4">
              <input
                ref={checkboxRef}
                type="checkbox"
                name="robot"
                id="robot"
                className="w-6 h-6"
              />
              <label htmlFor="robot" className="text-sm">
                I’m not a robot
              </label>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div>
                <img src={Captcha} alt="captcha" />
              </div>
              <p className="text-[10px] text-[#555555]">reCAPTCHA</p>
              <a href="#" className="text-[8px] text-[#555555]">
                Privacy - Terms
              </a>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0FA47F] text-white py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>
        <p className="flex items-center justify-center gap-1 text-sm">
          Don’t have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-[#0FA47F]"
          >
            Sign up
          </button>
        </p>
        <div className="flex flex-col justify-center items-center relative">
          <div className="h-px w-full bg-gray-300"></div>
          <p className="px-4 py-2 absolute bg-white text-xs">OR</p>
        </div>
        <div className="border flex gap-4 items-center rounded-lg px-2.5 py-4">
          <div>
            <img src={GoogleIcon} alt="google" />
          </div>
          <p className="text-sm">Continue with Google</p>
        </div>
        <div className="border flex gap-4 items-center rounded-lg px-2.5 py-4">
          <div>
            <img src={MicrosoftIcon} alt="google" />
          </div>
          <p className="text-sm">Continue with Microsoft Account</p>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
export default Login;
