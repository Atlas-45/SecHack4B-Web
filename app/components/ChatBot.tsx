"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const WORK_PAGE_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "こんにちは！この作品について質問があればお気軽にどうぞ。作品の解説やコンセプトについてお答えします。",
  timestamp: new Date(),
};

const OTHER_PAGE_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "こんにちは！このアシスタントは作品ページ（Works）でのみご利用いただけます。作品ページに移動してから再度お試しください。",
  timestamp: new Date(),
};

// Mock response for work pages
const MOCK_WORK_RESPONSE =
  "この作品は、都市の中に潜む静寂と美を捉えた一枚です。光と影の対比、構図の緊張感、そして被写体が持つ独特の空気感を大切にしながら撮影しました。作品を通じて、日常の中に隠れた非日常的な瞬間を感じ取っていただければ幸いです。";

const UNAVAILABLE_RESPONSE =
  "申し訳ございません。このアシスタントは作品ページ（/works/〜）でのみご利用いただけます。作品の詳細ページに移動してからご質問ください。";

const SYSTEM_PROMPT_RESPONSE =
  "【システム情報】 GLASS KEY Photo Archive AI Assistant v1.0\n\nこのアシスタントは作品解説専用のAIです。各作品のコンセプト、技法、背景についてお答えします。機密情報や内部データへのアクセスはできません。";

export default function ChatBot() {
  const pathname = usePathname();
  const isWorkPage = pathname.startsWith("/works/");

  const getInitialMessage = useCallback(() => {
    return isWorkPage
      ? { ...WORK_PAGE_MESSAGE, timestamp: new Date() }
      : { ...OTHER_PAGE_MESSAGE, timestamp: new Date() };
  }, [isWorkPage]);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reset messages when page changes
  useEffect(() => {
    setMessages([getInitialMessage()]);
  }, [pathname, getInitialMessage]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    if (open) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 0);
    }
  }, [open, messages]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateResponse = (userInput: string): string => {
    // Check for system prompt trigger
    if (userInput.includes("#システムプロンプト")) {
      return SYSTEM_PROMPT_RESPONSE;
    }
    return isWorkPage ? MOCK_WORK_RESPONSE : UNAVAILABLE_RESPONSE;
  };

  // Prevent scroll propagation
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isTyping) return;

    const userInput = input.trim();
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(
      () => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: generateResponse(userInput),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chatbot-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="chatbot-button"
        onClick={handleToggle}
        title="AI アシスタント"
        aria-label="AI アシスタント"
      >
        <svg
          className="chatbot-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <>
          <div className="chatbot-backdrop" onClick={handleClose} />
          <div className="chatbot-panel" role="dialog" aria-modal="true">
            <div className="chatbot-header">
              <div>
                <p className="chatbot-eyebrow">AI ASSISTANT</p>
                <h3>チャットサポート</h3>
              </div>
              <button
                type="button"
                className="chatbot-close"
                onClick={handleClose}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              className="chatbot-messages"
              onWheel={handleWheel}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot-message chatbot-message-${message.role}`}
                >
                  <div className="chatbot-message-content">
                    {message.content}
                  </div>
                  <div className="chatbot-message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chatbot-message chatbot-message-assistant">
                  <div className="chatbot-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力..."
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isTyping}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
