import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartFunctions } from "@/contexts/CartContext";
const Contact = ({ cart }: { cart: CartFunctions }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <Header cart={cart} />
      <main className="store-shell content-page">
        <span className="eyebrow">LET’S TALK TECH</span>
        <h1>
          A little help.
          <br />A better connection<span className="logo-dot">.</span>
        </h1>
        <div className="contact-layout">
          <div>
            <p className="content-lead">
              Need a hand finding your next phone? Tell us what you’re looking
              for.
            </p>
            <Link className="text-link" to="/shop">
              Or explore the collection <ArrowUpRight size={16} />
            </Link>
            <div className="preview-notice">
              This is a concept store. The form lets you preview your message
              locally; sending will be available when the new backend is
              connected.
            </div>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const text = String(data.get("message") || "").trim();
              if (text.length < 10) {
                setError(
                  "Please tell us a little more (at least 10 characters).",
                );
                return;
              }
              setError("");
              setMessage(text);
            }}
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="How should we call you?"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={255}
                placeholder="you@example.com"
              />
            </label>
            <label>
              What’s on your mind?
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Tell us about your next upgrade…"
              />
            </label>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <button className="store-button dark-button" type="submit">
              Preview your message <Send size={16} />
            </button>
            {message && (
              <div className="preview-notice" role="status">
                <strong>Message preview — saved only on this page</strong>
                <p className="whitespace-pre-wrap mt-2">{message}</p>
                <p className="mt-3">Your message has not been sent.</p>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Contact;
