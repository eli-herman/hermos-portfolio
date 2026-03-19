'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Send failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-[#555] focus:outline-none focus:border-[#B8790E] transition-colors duration-200';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: 0.1 }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="What are you building?"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={reduced ? undefined : { scale: 1.02, boxShadow: '0 8px 0 0 #7E4F10' }}
        whileTap={reduced ? undefined : { scale: 0.98, y: 4, boxShadow: '0 2px 0 0 #7E4F10' }}
        initial={false}
        style={{ boxShadow: '0 6px 0 0 #7E4F10' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="self-start inline-flex items-center justify-center rounded-xl min-h-[48px] px-10 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] hover:from-[#D4921A] hover:via-[#EABD70] hover:to-[#D4921A] disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </motion.button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[#B8790E]"
        >
          Message sent. I&apos;ll get back to you soon.
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-400"
        >
          Something went wrong. Try emailing directly at{' '}
          <a href="mailto:hermos.dev@gmail.com" className="underline">hermos.dev@gmail.com</a>.
        </motion.p>
      )}
    </motion.form>
  );
}
