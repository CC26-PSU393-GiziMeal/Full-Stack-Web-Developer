import { useState, useRef, useEffect } from "react";

export default function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya adalah Asisten GiziMeal. Ada yang bisa saya bantu terkait nutrisi, makanan sehat, atau Angka Kecukupan Gizi (AKG) hari ini?",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (text) => {
    const q = text.toLowerCase();
    if (q.includes("halo") || q.includes("hai") || q.includes("pagi") || q.includes("siang") || q.includes("malam")) {
      return "Halo! Senang bisa menyapa Anda. Ada informasi gizi atau resep sehat apa yang ingin Anda cari hari ini?";
    }
    if (q.includes("akg") || q.includes("kecukupan gizi")) {
      return "Angka Kecukupan Gizi (AKG) adalah rata-rata kecukupan zat gizi harian untuk kelompok orang berdasarkan jenis kelamin, umur, dan aktivitas fisik. GiziMeal membantu Anda memenuhi AKG harian ini secara seimbang!";
    }
    if (q.includes("kalori") || q.includes("kcal") || q.includes("energi") || q.includes("bmr")) {
      return "Kalori adalah takaran energi dalam makanan. Setiap orang memiliki kebutuhan kalori harian yang berbeda (rata-rata 2000 kkal untuk dewasa). Anda bisa menggunakan fitur Kalkulator kami untuk menghitung kebutuhan BMR & kalori harian Anda!";
    }
    if (q.includes("resep") || q.includes("sandwich") || q.includes("masak") || q.includes("menu")) {
      return "Tentu! Rekomendasi terbaik kami saat ini adalah Carrot Apple Sandwich yang memiliki Skor AKG 41.16/100, atau menu sehat berserat tinggi lainnya yang bisa Anda temukan di database gizi kami.";
    }
    if (q.includes("bayam") || q.includes("brokoli") || q.includes("sayur") || q.includes("cabbage") || q.includes("chilli")) {
      return "Sayuran hijau sangat baik untuk memenuhi kebutuhan serat, vitamin C, dan kalsium harian Anda tanpa menambahkan banyak kalori.";
    }
    if (q.includes("terima kasih") || q.includes("makasih") || q.includes("nuhun") || q.includes("thanks")) {
      return "Sama-sama! Selalu jaga pola makan seimbang ya. Hubungi saya kembali jika butuh bantuan gizi lainnya!";
    }
    return "Pertanyaan yang sangat bagus! Secara umum, kami menyarankan Anda mengikuti Pedoman Gizi Seimbang Kemenkes RI dengan membatasi konsumsi gula, garam, dan minyak berlebih, serta mengonsumsi cukup air putih dan beragam sumber protein.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    const timeString = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: userText, time: timeString }]);
    setInputVal("");
    setIsTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(userText);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 850);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary hover:bg-brand-green rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl z-40 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Tanya Asisten Gizi"
      >
        <span className="material-symbols-outlined text-[28px]">
          {isOpen ? "close" : "forum"}
        </span>
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-[88px] right-lg w-[360px] max-w-[calc(100vw-32px)] h-[480px] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-chat-popup">
          {/* Header */}
          <div className="bg-primary text-on-primary px-lg py-md flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
              <div>
                <h4 className="font-bold text-body-lg text-on-primary">Asisten GiziMeal</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                  <span className="text-[10px] tracking-wider text-on-primary/80 font-semibold uppercase">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-primary/80 hover:text-on-primary p-xs rounded-full"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-grow overflow-y-auto p-md flex flex-col gap-md bg-surface/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
              >
                <div
                  className={`px-md py-sm rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-on-primary rounded-tr-none"
                      : "bg-surface-container text-on-surface rounded-tl-none border border-outline-variant/30"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-on-surface-variant/70 mt-1 px-xs">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col self-start items-start max-w-[80%]">
                <div className="px-md py-sm rounded-2xl bg-surface-container text-on-surface rounded-tl-none border border-outline-variant/30 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSend}
            className="p-md bg-surface-container-low border-t border-outline-variant flex gap-sm"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tanya tentang kalori, resep, AKG..."
              className="flex-grow bg-surface border border-outline-variant rounded-xl px-md py-sm text-[14px] focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/60"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-10 h-10 bg-primary text-on-primary hover:bg-brand-green disabled:opacity-40 disabled:hover:bg-primary rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
              aria-label="Kirim"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
