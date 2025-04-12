import { AiOutlineSun } from "react-icons/ai";
import { RiFlashlightLine } from "react-icons/ri";
import { CiWarning } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const StartScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const bgColor = isDarkMode ? "bg-[#444654]" : "bg-[#ECECF1]";
  return (
    <div
      className={`${
        isDarkMode ? "text-white" : "text-black"
      } flex flex-col justify-center items-center w-full gap-20`}
    >
      <h1 className="text-sm sm:text-2xl md:text-3xl">ChatGPT</h1>
      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <AiOutlineSun size={16} />
            <h2 className="text-[10px] sm:text-sm md:text-lg">Examples</h2>
          </div>
          <div className="flex flex-col text-center text-[6px] sm:text-xs leading-6 gap-3">
            <div className={`${bgColor} rounded-md p-2`}>
              “Explain quantum computing in simple terms” →
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              “Got any creative ideas for a 10 year old’s birthday?” →
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              “How do I make an HTTP request in Javascript?” →
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <RiFlashlightLine size={16} />
            <h2 className="text-[10px] sm:text-sm md:text-lg">Capabilities</h2>
          </div>
          <div className="flex flex-col text-center text-[6px] sm:text-xs leading-6 gap-3">
            <div className={`${bgColor} rounded-md p-2`}>
              Remembers what user said earlier in the conversation
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              Allows user to provide follow- up corrections
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              Trained to decline inappropriate requests
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <CiWarning size={16} />
            <h2 className="text-[10px] sm:text-sm md:text-lg">Limitations</h2>
          </div>
          <div className="flex flex-col text-center text-[6px] sm:text-xs leading-6 gap-3">
            <div className={`${bgColor} rounded-md p-2`}>
              May occasionally generate incorrect information
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              May occasionally produce harmful instructions or biased content
            </div>
            <div className={`${bgColor} rounded-md p-2`}>
              Limited knowledge of world and events after 2021
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartScreen;
