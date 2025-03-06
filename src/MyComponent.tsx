import { CloseCircleFilled, DiscordOutlined, SendOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

function MyComponent() {
  const [messages, setMessages] = useState<Array<{ sender: boolean; msg: string }>>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const script = document.createElement("script");
  //     script.src = `https://www.google.com/recaptcha/api.js?render=6Ld4E98qAAAAAORNJ888Et-QxVSxyikco6T4iC27}`;
  //     script.async = true;
  //     document.body.appendChild(script);
  //   }
  // }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleCaptchaVerification = () => {
    if (window?.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6Ld4E98qAAAAAORNJ888Et-QxVSxyikco6T4iC27", { action: "open_chat" }).then(async (token: any) => {
          try {
            const response = await fetch("/api/genkit", {
              method: "POST",
              body: JSON.stringify({ token }),
              headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("data =>", data);

            if (data.success) {
              setCaptchaVerified(true);
              setIsOpen(true);
            } else {
              alert("Captcha verification failed. Please try again.");
            }
          } catch (error) {
            console.error("Error verifying reCAPTCHA:", error);
          }
        });
      });
    } else {
      console.error("reCAPTCHA is not loaded yet");
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    setMessages((old) => [...old, { sender: true, msg: text }]);
    setText("");
    setIsTyping(true);

    try {
      const api = await fetch("process.env.NEXT_PUBLIC_API_BASE_URL", {
        method: "POST",
        body: JSON.stringify({ msg: text }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await api.json();
      console.log("json", json);

      setMessages((old) => [...old, { sender: false, msg: json.answer }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=6Ld4E98qAAAAAORNJ888Et-QxVSxyikco6T4iC27`;
      script.async = true;
      document.body.appendChild(script);
  
      // Hide reCAPTCHA badge after the script loads
      script.onload = () => {
        setTimeout(() => {
          const recaptchaBadge = document.querySelector(".grecaptcha-badge") as HTMLElement;
          if (recaptchaBadge) {
            recaptchaBadge.style.display = "none";
          }
        }, 500); // Adding delay to ensure it loads
      };
    }
  }, []);
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.async = true;
    document.head.appendChild(script);
  }, []);


  return (
    <>
      {!isOpen && (
        <button style={{backgroundColor: "red"}} onClick={toggleChat} className="fixed bottom-20 right-10 z-10  text-black p-4 rounded-full hover:text-purple-500 transition duration-300">
          <DiscordOutlined className="text-3xl" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-16 right-6 w-96 h-[28rem] bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col overflow-hidden">
          
          <div className="flex justify-between items-center bg-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <DiscordOutlined className="text-3xl bg-white p-1 rounded-full text-purple-600" />
              <span className="text-lg font-semibold">AI Chat</span>
            </div>
            <CloseCircleFilled className="text-xl cursor-pointer hover:text-gray-300" onClick={toggleChat} />
          </div>

          {!captchaVerified ? (
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              <div className="text-4xl animate-bounce text-blue-600">🔒</div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Verify You’re Human</h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Please complete the reCAPTCHA to start the chat.
              </p>
              <button
                onClick={handleCaptchaVerification}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                ✅ Verify & Start Chat
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((res, index) =>
                  res.sender ? (
                    <div key={index} className="flex justify-end">
                      <div className="bg-purple-500 text-white p-2 rounded-lg max-w-xs shadow-md">{res.msg}</div>
                    </div>
                  ) : (
                    <div key={index} className="flex gap-3 items-start">
                      <DiscordOutlined className="text-3xl text-purple-600" />
                      <div className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-xs shadow-md">{res.msg}</div>
                    </div>
                  )
                )}
                {isTyping && (
                  <div className="flex gap-2">
                    <DiscordOutlined className="text-3xl text-purple-600" />
                    <div className="wave-loader">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>

              <div className="flex items-center p-4 border-t border-gray-300">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <Tooltip title="Send">
                  <button onClick={sendMessage} className="ml-2 p-2 text-lg text-purple-600 hover:text-purple-800">
                    <SendOutlined />
                  </button>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MyComponent;