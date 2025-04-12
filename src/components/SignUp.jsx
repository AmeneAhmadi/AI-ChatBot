import { useContext, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import chatGPTIconBlack from "../assets/chat-gpt-black.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userSignUp } = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
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
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    const errorMessage = await userSignUp(formData.username, formData.password);
    errorMessage ? setError(errorMessage) : navigate("/chat");
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen ">
      <div className="flex justify-center items-center w-12">
        <img src={chatGPTIconBlack} alt="icon" className="w-full h-full" />
      </div>
      <p className="flex justify-center items-center sm:text-2xl text-center font-bold">
        Create an account
      </p>
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSignUp}
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
          <button
            type="submit"
            className="w-full bg-[#0FA47F] text-white py-3 rounded-lg"
          >
            {loading ? "Signing up ..." : "Create"}
          </button>
        </form>
      </div>
      <p className="flex items-center justify-center gap-1 text-sm">
        Do you have an account?
        <button onClick={() => navigate("/login")} className="text-[#0FA47F]">
          Login
        </button>
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
export default SignUp;
