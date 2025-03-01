import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
// Import from CJS path instead of ESM
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      setSessionId(uuidv4());
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (userMessage) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_text: userMessage.content,
        sessionId: sessionId
      })
    });

    // Check specifically for 429 status
    if (response.status === 429) {
      setRateLimited(true);
      throw new Error('RATE_LIMIT_EXCEEDED');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to send message');
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(userMessage);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.message,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message);
      
      // Check for rate limit error
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        setMessages(prev => [...prev, {
          type: 'error',
          content: "The total number of requests for today has exceeded the threshold. The threshold will be reset tomorrow. Thank you for trying the chat!",
          timestamp: new Date().toISOString()
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'error',
          content: `Error: ${error.message}`,
          timestamp: new Date().toISOString()
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Copy code to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // You could add a toast notification here if you want
        console.log('Code copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Message component that renders text with markdown
  const MessageContent = ({ content, type }) => {
    if (type === 'user') {
      return <p className="text-sm">{content}</p>;
    }
    
    return (
      <div className="markdown-content text-sm">
        <ReactMarkdown 
          components={{
            // Use SyntaxHighlighter for code blocks
            code: ({node, inline, className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : 'text';
              const codeString = String(children).replace(/\n$/, '');
              
              return !inline ? (
                <div className="my-2 rounded overflow-hidden relative">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={() => copyToClipboard(codeString)}
                      className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-xs flex items-center opacity-80 hover:opacity-100 transition-opacity"
                      title="Copy to clipboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={language}
                    className="text-xs rounded"
                    customStyle={{margin: 0, padding: '0.75rem'}}
                    showLineNumbers={language !== 'text'}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-gray-200 text-gray-800 rounded px-1 text-xs font-mono" {...props}>
                  {children}
                </code>
              );
            },
            // Make links clickable and open in new tab
            a: ({node, ...props}) => (
              <a 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              />
            ),
            // Add some spacing for paragraphs
            p: ({node, ...props}) => (
              <p className="mb-2" {...props} />
            ),
            // Style headings
            h1: ({node, ...props}) => (
              <h1 className="text-xl font-bold mb-2" {...props} />
            ),
            h2: ({node, ...props}) => (
              <h2 className="text-lg font-bold mb-2" {...props} />
            ),
            h3: ({node, ...props}) => (
              <h3 className="text-md font-bold mb-2" {...props} />
            ),
            // Style lists
            ul: ({node, ...props}) => (
              <ul className="list-disc pl-5 mb-2" {...props} />
            ),
            ol: ({node, ...props}) => (
              <ol className="list-decimal pl-5 mb-2" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="mb-1" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // If rate limited, disable the input
  const isInputDisabled = isLoading || rateLimited;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Ask about my projects</h3>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <MessageContent content={message.content} type={message.type} />
                  <time className="text-xs opacity-75 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </time>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={rateLimited ? "Chat limit reached for today" : "Type your message..."}
                disabled={isInputDisabled}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isInputDisabled || !inputText.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Send'
                )}
              </button>
            </div>
            {rateLimited && (
              <p className="text-xs text-red-600 mt-2">
                Daily request limit reached. Please try again tomorrow.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;