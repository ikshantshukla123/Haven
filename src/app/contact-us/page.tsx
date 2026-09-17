"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SITE, whatsappLink } from "@/lib/site";
import Spinner from "@/components/Spinner";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const supabase = createClient();
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message,
    });
    setSubmitting(false);

    if (dbError) {
      setError("Failed to send message. Please try again or contact us directly.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const inputClass =
    "w-full rounded-xl border border-cream-200 px-4 py-3 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20";

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-6 font-serif text-4xl font-black text-ink">Contact Us</h1>
          <p className="mx-auto max-w-3xl text-lg text-ink-soft">
            We&apos;d love to hear from you! Get in touch for any questions, custom orders, or just
            to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-cream-200 bg-white p-8">
              <h2 className="mb-6 text-2xl font-semibold text-ink">Get in Touch</h2>
              <div className="space-y-6 text-ink-soft">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blush-100">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Phone</h3>
                    <a href={SITE.phoneHref} className="hover:text-rose-deep">
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blush-100">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Email</h3>
                    <a href={SITE.emailHref} className="hover:text-rose-deep">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">WhatsApp</h3>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-rose-deep"
                    >
                      {SITE.phone} — chat with us directly
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blush-100">
                    🕒
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Business Hours</h3>
                    <p>Monday - Sunday: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cream-200 bg-white p-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">Why Contact Us?</h2>
              <ul className="space-y-3 text-ink-soft">
                {[
                  "Custom hamper requests",
                  "Corporate gifting solutions",
                  "Bulk order inquiries",
                  "Product information",
                  "Delivery inquiries",
                  "Partnership opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-2">
                    <span className="mt-1 text-rose-deep">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-cream-200 bg-white p-8">
            <h2 className="mb-6 text-2xl font-semibold text-ink">Send us a Message</h2>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ✅
                </div>
                <h3 className="mb-2 text-xl font-semibold text-ink">Thank You!</h3>
                <p className="text-ink-soft">
                  Your message has been sent successfully. We&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={SITE.phone}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="custom">Custom Hamper Request</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="bulk">Bulk Orders</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:active:scale-100"
                >
                  {submitting && <Spinner />}
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}