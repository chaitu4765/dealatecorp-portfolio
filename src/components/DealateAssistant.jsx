import { useEffect, useRef, useState } from "react";

const quickPrompts = ["Our services", "Start a project", "Talk to the team"];

function ChatIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M23 12.5c0 5-4.2 8.5-9.4 8.5-1.4 0-2.8-.2-4-.7L4 23l1.5-5.3A8 8 0 0 1 4 12.5C4 7.5 8.2 4 13.6 4S23 7.5 23 12.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12.5" r="1.2" fill="currentColor" />
      <circle cx="13.5" cy="12.5" r="1.2" fill="currentColor" />
      <circle cx="18" cy="12.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function formatInline(text) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`strong-${index}`}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

function StructuredMessage({ text }) {
  const blocks = [];
  let listItems = [];
  let listType = null;

  const flushList = () => {
    if (!listItems.length) return;
    const List = listType === "ordered" ? "ol" : "ul";
    blocks.push(
      <List className="dealate-assistant__list" key={`list-${blocks.length}`}>
        {listItems.map((item, index) => (
          <li key={`item-${index}`}>{formatInline(item)}</li>
        ))}
      </List>,
    );
    listItems = [];
    listType = null;
  };

  text
    .replace(/\r/g, "")
    .split("\n")
    .forEach((line) => {
      const heading = line.match(/^\s{0,3}#{1,3}\s+(.+)$/);
      const unorderedItem = line.match(/^\s*[-*]\s+(.+)$/);
      const orderedItem = line.match(/^\s*\d+[.)]\s+(.+)$/);

      if (heading) {
        flushList();
        blocks.push(
          <p
            className="dealate-assistant__heading"
            key={`heading-${blocks.length}`}
          >
            {formatInline(heading[1])}
          </p>,
        );
        return;
      }

      const item = unorderedItem?.[1] ?? orderedItem?.[1];
      const nextListType = orderedItem
        ? "ordered"
        : unorderedItem
          ? "unordered"
          : null;
      if (item) {
        if (listType && listType !== nextListType) flushList();
        listType = nextListType;
        listItems.push(item);
        return;
      }

      flushList();
      if (line.trim())
        blocks.push(
          <p key={`paragraph-${blocks.length}`}>{formatInline(line.trim())}</p>,
        );
    });

  flushList();
  return <div className="dealate-assistant__rich-text">{blocks}</div>;
}

export function DealateAssistant({ onStartProject }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I’m Dealate Assistant. What are you looking to build or grow?",
    },
  ]);
  const input = useRef(null);
  const launcher = useRef(null);
  const messageList = useRef(null);
  const sessionId = useRef(
    globalThis.crypto?.randomUUID?.() || `dealate-${Date.now()}`,
  );

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (open && messageList.current)
      messageList.current.scrollTop = messageList.current.scrollHeight;
  }, [open, messages, pending]);

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  const send = async (value) => {
    const text = value.trim();
    if (!text || pending) return;
    const conversation = [...messages, { from: "user", text }];
    setMessages(conversation);
    setDraft("");
    setPending(true);
    try {
      const response = await fetch("/api/dealate-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation,
          sessionId: sessionId.current,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Dealate Assistant is unavailable.");
      setMessages((current) => [
        ...current,
        { from: "bot", text: payload.text },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          from: "bot",
          text: "I’m unable to reply right now. Choose Start a project below to reach our team.",
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  const startProject = () => {
    setOpen(false);
    onStartProject();
  };

  return (
    <aside
      className={`dealate-assistant ${open ? "is-open" : ""}`}
      aria-label="Dealate Assistant"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      {open && (
        <section
          id="dealate-assistant-panel"
          className="dealate-assistant__panel"
          aria-label="Chat with Dealate Assistant"
        >
          <header className="dealate-assistant__header">
            <div className="dealate-assistant__identity">
              <span className="dealate-assistant__spark" aria-hidden="true">
                <ChatIcon />
              </span>
              <div>
                <strong>Dealate Assistant</strong>
                <span>Here to help</span>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close assistant">
              ×
            </button>
          </header>
          <div
            ref={messageList}
            className="dealate-assistant__messages"
            role="log"
            aria-label="Conversation"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                className={`dealate-assistant__message dealate-assistant__message--${message.from}`}
                key={`${message.from}-${index}`}
              >
                {message.from === "bot" ? (
                  <StructuredMessage text={message.text} />
                ) : (
                  message.text
                )}
              </div>
            ))}
            {pending && (
              <p
                className="dealate-assistant__message dealate-assistant__message--bot"
                role="status"
              >
                Thinking…
              </p>
            )}
          </div>
          <div
            className="dealate-assistant__prompts"
            aria-label="Suggested questions"
          >
            {quickPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                disabled={pending}
                onClick={() =>
                  prompt === "Start a project" ? startProject() : send(prompt)
                }
              >
                {prompt}
              </button>
            ))}
          </div>
          <form
            className="dealate-assistant__composer"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <label className="sr-only" htmlFor="dealate-assistant-message">
              Ask a question
            </label>
            <input
              ref={input}
              id="dealate-assistant-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about a project..."
              disabled={pending}
            />
            <button type="submit" aria-label="Send message" disabled={pending}>
              {pending ? "…" : "↗"}
            </button>
          </form>
        </section>
      )}
      <button
        className="dealate-assistant__launcher"
        ref={launcher}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? "dealate-assistant-panel" : undefined}
        aria-label={open ? "Close Dealate Assistant" : "Open Dealate Assistant"}
      >
        <span aria-hidden="true">{open ? "×" : <ChatIcon />}</span>
        <b>{open ? "Close" : "Ask us"}</b>
      </button>
    </aside>
  );
}
