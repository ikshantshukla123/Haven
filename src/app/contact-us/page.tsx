"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

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
            <div className="rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
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

            <div className="rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
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

          <div className="rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
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
                  className="w-full rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-rose-deep-600 hover:to-rose-deep-700 disabled:opacity-50"
                >
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