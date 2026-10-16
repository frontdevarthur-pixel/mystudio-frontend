'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { submitContact } from '@/lib/api/endpoints';
import type { ContactFormPayload, ApiError } from '@/types/api';
import type { Lang } from '@/lib/api/endpoints';

const i18n = {
  uk: {
    name: "Ваше ім'я *",
    email: 'Email *',
    phone: 'Телефон (необов\'язково)',
    description: 'Опишіть ваш проект *',
    submit: 'Надіслати заявку →',
    sending: 'Надсилаємо...',
    successTitle: 'Заявку надіслано!',
    successText: 'Ми зв\'яжемося з вами найближчим часом.',
    errorText: 'Сталася помилка. Спробуйте пізніше або напишіть нам напряму.',
    nameError: 'Введіть ваше ім\'я',
    emailError: 'Введіть коректний email',
    phoneFormat: 'Формат: +380991234567',
    descriptionError: 'Опишіть проект (мінімум 10 символів)',
  },
  en: {
    name: 'Your name *',
    email: 'Email *',
    phone: 'Phone (optional)',
    description: 'Describe your project *',
    submit: 'Send request →',
    sending: 'Sending...',
    successTitle: 'Request sent!',
    successText: 'We will contact you shortly.',
    errorText: 'Something went wrong. Please try again or contact us directly.',
    nameError: 'Enter your name',
    emailError: 'Enter a valid email',
    phoneFormat: 'Format: +380991234567',
    descriptionError: 'Describe your project (minimum 10 characters)',
  },
};

interface ContactFormProps {
  onSuccess?: () => void;
  lang?: Lang;
}

export default function ContactForm({ onSuccess, lang = 'uk' }: ContactFormProps) {
  const t = i18n[lang] ?? i18n.uk;
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const schema = z.object({
    name: z.string().min(1, t.nameError),
    email: z.string().email(t.emailError),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, t.phoneFormat).or(z.literal('')).optional(),
    project_description: z.string().min(10, t.descriptionError),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    try {
      await submitContact(values as ContactFormPayload);
      setStatus('success');
      reset();
      if (onSuccess) setTimeout(onSuccess, 1500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const apiError = err.response.data as ApiError;
        const validationErrors = apiError.data?.validation_errors ?? {};
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof FormValues, { message: messages[0] });
        });
        setStatus('idle');
      } else {
        setStatus('error');
      }
    }
  };

  const inputClass = 'w-full px-4 py-3.5 rounded-xl bg-[#0d1117] border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors text-sm font-body';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {status === 'success' ? (
        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 text-center">
          <div className="text-3xl mb-3">✓</div>
          <p className="font-semibold text-lg mb-1">{t.successTitle}</p>
          <p className="text-sm text-green-400">{t.successText}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <input {...register('name')} placeholder={t.name} className={inputClass} />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <input {...register('email')} type="email" placeholder={t.email} className={inputClass} />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <input {...register('phone')} type="tel" placeholder={t.phone} className={inputClass} />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
          <div>
            <textarea
              {...register('project_description')}
              rows={4}
              placeholder={t.description}
              className={`${inputClass} resize-none`}
            />
            {errors.project_description && <p className={errorClass}>{errors.project_description.message}</p>}
          </div>
          {status === 'error' && (
            <p className="text-red-400 text-sm">{t.errorText}</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-xl btn-accent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {status === 'loading' ? t.sending : t.submit}
          </button>
        </form>
      )}
    </motion.div>
  );
}
