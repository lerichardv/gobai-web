'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiSendPlaneLine, RiLoader4Line, RiCheckboxCircleLine } from '@remixicon/react';
import { toast } from 'sonner';
import { submitContactForm } from '@/app/actions/contact';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'nameRequired' }),
  email: z.string().email({ message: 'emailInvalid' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'messageRequired' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ standalone = true }: { standalone?: boolean }) {
  const t = useTranslations('Contacto');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setIsSuccess(true);
        toast.success(t('hero.form.success'));
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.error(t('hero.form.error'));
      }
    } catch (error) {
      toast.error(t('hero.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      standalone && "bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 shadow-2xl"
    )}>
      {/* Success State Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-20 bg-[#00040a]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-gobai-cyan/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <RiCheckboxCircleLine className="text-gobai-cyan w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
            {t('hero.form.successTitle')}
          </h3>
          <p className="text-white/70 max-w-xs mx-auto mb-8">
            {t('hero.form.success')}
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-bold uppercase tracking-widest transition-all"
          >
            {t('hero.form.sendAnother')}
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-white uppercase tracking-widest flex justify-between">
              {t('hero.form.name')}
              {errors.name && <span className="text-red-400 text-[10px] lowercase tracking-normal font-medium">{t(`hero.form.validation.${errors.name.message}`)}</span>}
            </label>
            <input 
              {...register('name')}
              type="text" 
              placeholder={t('hero.form.namePlaceholder')}
              className={cn(
                "w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors",
                errors.name && "border-red-400/50 focus:border-red-400"
              )}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-white uppercase tracking-widest flex justify-between">
              {t('hero.form.email')}
              {errors.email && <span className="text-red-400 text-[10px] lowercase tracking-normal font-medium">{t(`hero.form.validation.${errors.email.message}`)}</span>}
            </label>
            <input 
              {...register('email')}
              type="email" 
              placeholder={t('hero.form.emailPlaceholder')}
              className={cn(
                "w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors",
                errors.email && "border-red-400/50 focus:border-red-400"
              )}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white uppercase tracking-widest">{t('hero.form.phone')}</label>
          <input 
            {...register('phone')}
            type="text" 
            placeholder={t('hero.form.phonePlaceholder')}
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors"
          />
        </div>

        {/* Message Field */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white uppercase tracking-widest flex justify-between">
            {t('hero.form.message')}
            {errors.message && <span className="text-red-400 text-[10px] lowercase tracking-normal font-medium">{t(`hero.form.validation.${errors.message.message}`)}</span>}
          </label>
          <textarea 
            {...register('message')}
            rows={4}
            placeholder={t('hero.form.messagePlaceholder')}
            className={cn(
              "w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors resize-none",
              errors.message && "border-red-400/50 focus:border-red-400"
            )}
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan text-[#00040a] font-black rounded-2xl shadow-[0_0_40px_rgba(98,228,255,0.4)] hover:shadow-[0_0_60px_rgba(98,228,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <RiLoader4Line size={20} className="animate-spin" />
              {t('hero.form.submitting')}
            </>
          ) : (
            <>
              <RiSendPlaneLine size={20} />
              {t('hero.form.submit')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
