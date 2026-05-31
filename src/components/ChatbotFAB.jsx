import { useState, useRef, useEffect } from "react";

const QUICK_REPLIES = [
  "Apa itu AKG?",
  "Cara hitung BMR saya?",
  "Menu sehat untuk diet?",
  "Makanan tinggi protein?",
];

export default function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya Asisten GiziMeal. Ada yang bisa saya bantu terkait nutrisi, makanan sehat, atau Angka Kecukupan Gizi (AKG)?",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { sender: "user", text, time: timeNow }]);
    setInputVal("");
    setIsTyping(true);
    setShowQuick(false);

    try {
      const formattedHistory = [];
      for (let i = 1; i < messages.length; i++) {
        formattedHistory.push({
          role: messages[i].sender === "user" ? "user" : "assistant",
          content: messages[i].text
        });
      }

      const response = await fetch("http://localhost:3000/api/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: formattedHistory 
        }),
      });

      const jsonResult = await response.json();

      if (!response.ok || !jsonResult.success) {
        throw new Error(jsonResult.message || "Gagal mendapatkan balasan AI.");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: jsonResult.reply,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }
      ]);

    } catch (err) {
      console.error("Chatbot Fetching Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, koneksi saya ke server GiziMeal AI terputus. Mohon coba kirim pesan beberapa saat lagi. 🌿",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => { e.preventDefault(); sendMessage(inputVal); };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-lg right-lg w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl z-40 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Tanya Asisten Gizi"
      >
        <span className="material-symbols-outlined text-[24px]">{isOpen ? "close" : "forum"}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[72px] right-lg w-[340px] max-w-[calc(100vw-32px)] h-[460px] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">

          {/* Header */}
          <div className="bg-primary text-on-primary px-md py-sm flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <div>
                <h4 className="font-bold text-[14px]">Asisten GiziMeal</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                  <span className="text-[10px] tracking-wider text-on-primary/80 font-semibold uppercase">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-on-primary/80 hover:text-on-primary p-xs rounded-full" aria-label="Tutup">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-surface-container border-b border-outline-variant/50 px-md py-xs flex items-start gap-xs">
            <span className="material-symbols-outlined text-[13px] text-on-surface-variant mt-0.5 flex-shrink-0">info</span>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Asisten ini bersifat informatif dan <strong>bukan pengganti konsultasi dokter atau ahli gizi.</strong>
            </p>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-grow overflow-y-auto p-md flex flex-col gap-sm bg-surface/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col max-w-[82%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}>
                <div className={`px-sm py-xs rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.sender === "user"
                    ? "bg-primary text-on-primary rounded-tr-none"
                    : "bg-surface-container text-on-surface rounded-tl-none border border-outline-variant/30"
                  }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-on-surface-variant/60 mt-0.5 px-xs">{msg.time}</span>
              </div>
            ))}

            {/* Animasi Mengetik Bouncing */}
            {isTyping && (
              <div className="flex self-start">
                <div className="px-sm py-xs rounded-2xl bg-surface-container rounded-tl-none border border-outline-variant/30 flex gap-1 items-center">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuick && !isTyping && (
              <div className="flex flex-wrap gap-xs mt-xs">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="bg-surface-container border border-outline-variant text-on-surface text-[11px] px-sm py-xs rounded-full hover:border-secondary hover:text-secondary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Kirim */}
          <form onSubmit={handleSend} className="p-sm bg-surface-container-low border-t border-outline-variant flex gap-sm">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tanya tentang kalori, AKG..."
              className="flex-grow bg-surface border border-outline-variant rounded-xl px-sm py-xs text-[13px] focus:outline-none focus:border-secondary text-on-surface placeholder:text-on-surface-variant/60"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="w-9 h-9 bg-primary text-on-primary disabled:opacity-40 rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
              aria-label="Kirim"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}