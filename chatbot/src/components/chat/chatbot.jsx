import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { IoRadioButtonOn } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";
import instructions from "./instructions.json";

const gemKey = import.meta.env.VITE_GEMINI_KEY;
const genAi = new GoogleGenerativeAI(gemKey);

const Chatbot = ({ isStyled }) => {
  const [botMessage, setBotMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const handleStyle = isStyled ? { display: "block" } : { display: "none" };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/```([^```]+)```/g, "<pre><code>$1</code></pre>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>");
  };

  const setInputVal = (e) => {
    setUserInput(e.target.value);
  };

  const sendInput = async () => {
    if (!userInput) return;
    setIsSending(true);

    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptWithInstructions = `${instructions.botName} (${instructions.responseType}): ${userInput}. Remember to follow these guidelines: ${instructions.scope}`;
      const result = await model.generateContent(promptWithInstructions);
      let botResponse = result.response.text() || "";
      botResponse = formatText(botResponse);

      const updatedMessages = [
        ...chatHistory,
        { user: userInput, bot: botResponse },
      ];
      setChatHistory(updatedMessages);
      sessionStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
      console.log(`updatedMessages: `);
      console.log(updatedMessages);
      setUserInput("");
    } catch (err) {
      console.error(`Error generating content: ${err}`);
      setChatHistory([
        ...chatHistory,
        { user: userInput, bot: "Error generating response" },
      ]);
      console.log(`Chat history: `);
      console.log(chatHistory);
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    const savedMessages = JSON.parse(sessionStorage.getItem("chatHistory"));
    if (savedMessages) {
      setBotMessage(savedMessages);
      console.log(`saved Message:`);
      console.log(savedMessages);
    }
  }, []);
  return (
    <div>
      <div
        className="h-5/6 w-1/4 bg-gradient-to-tl from-gray-950 via-75% via-sky-950 to-gray-900 rounded-lg fixed bottom-4 right-4 border-l border-t border-r-transparent border-b-cyan-700 border-cyan-900"
        id="chat-body"
        style={{ ...handleStyle }}
      >
        <div id="inner-body" className="flex h-full flex-col justify-between">
          <div
            id="heading"
            className="h-8 bg-transparent font-syne  rounded-t-lg w-full flex justify-around items-center flex-col text-white "
          >
            <a href="#" className="text-2xl font-bold pl-2 flex items-center">
              <AiOutlineComment />
              Chat Bot
            </a>
            <br />
            {/* <span className='text-base pl-2 text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> */}
          </div>
          <div
            id="middle-chat"
            className="flex flex-col gap-3 mt-3 overflow-x-scroll"
          >
            {chatHistory.map((msg, index) => (
              <div className="chat_message" key={index}>
                <div id="user-input-preview" className="relative pb-1">
                  <span className="before:content-none absolute left-1 top-2 rounded-full w-8 h-8  bg-slate-300 drop-shadow-md z-10 flex justify-center items-center">
                    <IoPerson />
                  </span>
                  <ul className="relative bg-gray-400  ml-10 py-1 px-2 mr-10 rounded-lg inline-flex justify-start">
                    <li className="rounded-full inline p-2">{msg.user}</li>
                  </ul>
                </div>

                <div id="bot-reply" className="relative">
                  <span className="before:content-none absolute left-1 top-1 rounded-full w-8 h-8 bg-slate-300 border-t-4 border-slate-800 z-10 flex justify-center items-center">
                    <IoRadioButtonOn />
                  </span>
                  <ul className="relative bg-gray-400  ml-10 p-2 mr-10 rounded-lg drop-shadow-md ">
                    <li
                      className="rounded-full  inline p-2"
                      dangerouslySetInnerHTML={{ __html: msg.bot }}
                    ></li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <section id="bottom" className="w-full">
            <div className="button-sec w-full flex gap-2 p-2">
              <input
                type="text"
                id="input"
                className="w-10/12 h-10 p-1 px-3 bg-gray-600 opacity-80 text-white  placeholder-white/85 rounded-xl active:border-none"
                placeholder="Enter the prompt"
                value={userInput}
                onChange={setInputVal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendInput();
                  }
                }}
              />
              <button
                className="bg-gray-100/15 border-t border-r border-gray-600 text-white w-1/6 rounded-xl font-poppins text-sm"
                id="inp_btn"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "SEND"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
