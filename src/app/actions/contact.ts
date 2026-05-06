'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { resend } from '@/lib/resend';
import ContactNotificationEmail from '@/emails/ContactNotification';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'nameRequired' }),
  email: z.string().email({ message: 'emailInvalid' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'messageRequired' }),
});

export async function submitContactForm(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: result.data,
    });

    // Send email notification to admin
    try {
      const { data, error } = await resend.emails.send({
        from: 'Resend <onboarding@resend.dev>', // Using Resend's default for better reliability unless domain is verified
        to: process.env.ADMIN_EMAIL || 'gobaiwebsite@outlook.com',
        subject: `(GOBAI.LA) Nuevo Mensaje de Contacto - ${result.data.name}`,
        react: ContactNotificationEmail({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || undefined,
          message: result.data.message,
        }),
      });

      if (error) {
        console.error('Resend API Error:', error);
      } else {
        console.log('Email sent successfully:', data);
      }
    } catch (emailError) {
      console.error('Error in resend.emails.send catch block:', emailError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'databaseError',
    };
  }
}

export async function getContactSubmissions(page = 1, pageSize = 10) {
  try {
    const skip = (page - 1) * pageSize;
    
    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactSubmission.count(),
    ]);

    return {
      submissions,
      totalPages: Math.ceil(total / pageSize),
      total,
    };
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return {
      submissions: [],
      totalPages: 0,
      total: 0,
    };
  }
}

export async function getAllContactSubmissions() {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching all contact submissions:', error);
    return [];
  }
}

