import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Trash2,
  Send,
  Circle,
  ChevronRight,
} from 'lucide-react';
import './Chatbot.css';

/* ── Quick reply suggestions ── */
const quickReplies = [
  'How do I apply for a student visa?',
  'Which scholarships can I apply for?',
  'What IELTS score do I need?',
  'How to write a strong SOP?',
  'Best universities in Canada for CS?',
];

/* ── Predefined bot responses ── */
const getBotResponse = (msg) => {
  const m = msg.toLowerCase();

  if (m.includes('visa') || m.includes('study permit')) {
    return {
      text: `Great question! For a student visa, you'll typically need:\n\n• University acceptance letter\n• Valid passport\n• Proof of financial support\n• Medical exam (some countries)\n• Statement of Purpose\n\nWhich country are you applying to? I can give you specific guidance!`,
      suggestions: ['Canada visa guide', 'UK student visa', 'Australia visa', 'Germany visa'],
    };
  }
  if (m.includes('scholarship') || m.includes('funding')) {
    return {
      text: `Here are top scholarships for Pakistani students:\n\nFully Funded:\n• Chevening (UK) — Nov deadline\n• Fulbright (USA) — Oct deadline\n• Australia Awards — Apr deadline\n• DAAD (Germany) — Oct deadline\n\nTip: Start your applications at least 6 months before the deadline!`,
      suggestions: ['Chevening details', 'DAAD requirements', 'How to apply for Fulbright'],
    };
  }
  if (m.includes('ielts') || m.includes('toefl') || m.includes('english')) {
    return {
      text: `Most universities require:\n\nIELTS Scores:\n• Canada: 6.5 overall\n• UK: 6.5 (no band below 6.0)\n• Australia: 6.5 overall\n• Germany: 6.0–6.5\n\nPreparation tips:\n• Practice daily for 3–6 months\n• Focus on Writing Task 2\n• Use Cambridge IELTS books 13–18\n• Take 2–3 mock tests before the real exam`,
      suggestions: ['IELTS Writing tips', 'Speaking band 7 tips', 'Best prep resources'],
    };
  }
  if (m.includes('sop') || m.includes('statement of purpose') || m.includes('personal statement')) {
    return {
      text: `A strong SOP should have:\n\nStructure (800–1000 words):\n1. Opening hook — why this field?\n2. Academic background\n3. Work/research experience\n4. Why this university specifically?\n5. Future career goals\n\nAvoid:\n• Generic openings\n• Copy-paste from templates\n• Exceeding word limit\n\nWould you like me to help you outline your SOP?`,
      suggestions: ['SOP outline help', 'Common SOP mistakes', 'SOP for CS programs'],
    };
  }
  if (m.includes('canada') && (m.includes('universit') || m.includes('cs') || m.includes('computer'))) {
    return {
      text: `Top Canadian universities for Computer Science:\n\nTop picks:\n1. University of Toronto — Rank #18 globally\n2. University of Waterloo — Best co-op program\n3. McGill University — Strong research\n4. UBC Vancouver — Tech hub proximity\n5. University of Alberta — Great funding\n\nAverage tuition: CAD 25,000–35,000/year\nDeadline: Usually January–February`,
      suggestions: ['UofT admission requirements', 'Waterloo co-op explained', 'Canada student visa'],
    };
  }
  if (m.includes('document') || m.includes('checklist') || m.includes('required')) {
    return {
      text: `Here's your general document checklist:\n\nAcademic:\n• Transcripts (notarized)\n• Degree certificate\n• IELTS/TOEFL score card\n\nIdentity:\n• Valid passport (6+ months)\n• Passport photos\n\nApplication:\n• Statement of Purpose\n• 2 Recommendation letters\n• Updated CV\n\nFinancial:\n• Bank statements (6 months)\n• Financial affidavit\n\nVisit your Document Checklist to track your progress!`,
      suggestions: ['Upload documents', 'Financial proof requirements', 'Notarization guide'],
    };
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('help')) {
    return {
      text: `Hello! I'm your EMA Study Gate AI Assistant!\n\nI can help you with:\n• Finding the right universities\n• Scholarship guidance\n• Visa application steps\n• SOP and document tips\n• Study destination comparisons\n\nWhat would you like to know?`,
      suggestions: ['Find universities', 'Scholarship options', 'Visa guidance', 'Document checklist'],
    };
  }

  return {
    text: `Thanks for your question! I can help with:\n\n• University search & requirements\n• Scholarship opportunities\n• Visa application guidance\n• Document checklists\n• IELTS/TOEFL preparation\n• SOP writing tips\n\nCould you be more specific? Or try one of the quick options below!`,
    suggestions: ['Visa guidance', 'Scholarships', 'Universities', 'Documents needed'],
  };
};

const Chatbot = () => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1, from: 'bot',
      text: "Hi! I'm your EMA Study Guide AI Assistant. Ask me anything about studying abroad — visas, scholarships, universities, or documents!",
      suggestions: quickReplies.slice(0, 3),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef           = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg = {
      id: Date.now(), from: 'user', text: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);

    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(msg);
      const botMsg = {
        id: Date.now() + 1, from: 'bot',
        text: response.text,
        suggestions: response.suggestions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(prev => prev + 1);
    }, 1200 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{
      id: 1, from: 'bot',
      text: "Chat cleared! How can I help you with your study abroad journey?",
      suggestions: quickReplies.slice(0, 3),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        className={`chatbot-fab${open ? ' chatbot-fab--open' : ''}`}
        onClick={() => setOpen(!open)}
        title="AI Study Assistant"
      >
        {open ? <X size={20} /> : <Bot size={20} />}
        {!open && unread > 0 && (
          <span className="chatbot-fab__badge">{unread}</span>
        )}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__bot">
              <div className="chatbot-header__avatar"><Bot size={20} /></div>
              <div>
                <p className="chatbot-header__name">EMA AI Assistant</p>
                <p className="chatbot-header__status">
                  <Circle size={8} className="chatbot-header__dot" fill="currentColor" /> Online
                </p>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <button className="chatbot-header__btn" onClick={clearChat} title="Clear chat">
                <Trash2 size={16} />
              </button>
              <button className="chatbot-header__btn" onClick={() => setOpen(false)} title="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                {msg.from === 'bot' && (
                  <div className="chatbot-msg__avatar"><Bot size={16} /></div>
                )}
                <div className="chatbot-msg__bubble-wrap">
                  <div className="chatbot-msg__bubble">
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <span className="chatbot-msg__time">{msg.time}</span>

                  {msg.suggestions && (
                    <div className="chatbot-suggestions">
                      {msg.suggestions.map(s => (
                        <button key={s} className="chatbot-suggestion" onClick={() => sendMessage(s)}>
                          <ChevronRight size={12} /> {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar"><Bot size={16} /></div>
                <div className="chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies bar */}
          <div className="chatbot-quick-bar">
            {quickReplies.slice(0, 3).map(q => (
              <button key={q} className="chatbot-quick-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-wrap">
            <textarea
              className="chatbot-input"
              placeholder="Ask about visas, scholarships, universities..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;