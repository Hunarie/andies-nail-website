'use client';

import { useState } from 'react';
import { Container, Text, TextInput, Textarea, Button, Group, Box, SimpleGrid, Stack, Paper, Alert } from '@mantine/core';
import { TbPhone, TbMail, TbCheck, TbX } from 'react-icons/tb';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Contact.module.css';
import { useTranslations } from 'next-intl';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Phone validation regex (supports formats like (555) 123-4567, 555-123-4567, 5551234567)
const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export function Contact() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateInput = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : t('contact.form.name.error');
      case 'email':
        if (!value.trim()) return t('contact.form.email.error.required');
        return EMAIL_REGEX.test(value) ? '' : t('contact.form.email.error.invalid');
      case 'phone':
        // Phone is optional, but if provided must be valid
        return value.trim() && !PHONE_REGEX.test(value) ? t('contact.form.phone.error') : '';
      case 'message':
        return value.trim() ? '' : t('contact.form.message.error');
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change and update errors
    const error = validateInput(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Sanitize inputs to prevent XSS
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateInput(name, value);
      if (error) {
        newErrors[name] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Create sanitized version of data for submission
    const sanitizedData = {
      name: sanitizeInput(formData.name.trim()),
      email: sanitizeInput(formData.email.trim()),
      phone: sanitizeInput(formData.phone.trim()),
      message: sanitizeInput(formData.message.trim())
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: t('contact.contactInfo.phone.title'),
      description: process.env.NEXT_PUBLIC_CONTACT_PHONE || '(616) 734-7308',
      icon: <TbPhone size={30} />
    },
    {
      title: t('contact.contactInfo.email.title'),
      description: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'andieorozco2006@gmail.com',
      icon: <TbMail size={30} />
    },
  ];

  return (
    <Box 
      id="contact" 
      component="section"
      className={styles.contactSection}
    >
      {/* Decorative elements */}
      <div className={styles.decorativeCircleTop} />
      <div className={styles.decorativeCircleBottom} />

      <Container size="xl" className={styles.container}>
        <SectionTitle>{t('contact.title')}</SectionTitle>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
          <div>
            <Text size="lg" mb="md" className={styles.descriptionText}>
              {t('contact.description')}
            </Text>

            {submitStatus === 'success' && (
              <Alert 
                icon={<TbCheck size={16} />} 
                title={t('contact.alerts.success.title')} 
                color="green" 
                mb="md"
              >
                {t('contact.alerts.success.message')}
              </Alert>
            )}
            
            {submitStatus === 'error' && (
              <Alert 
                icon={<TbX size={16} />} 
                title={t('contact.alerts.error.title')} 
                color="red" 
                mb="md"
              >
                {t('contact.alerts.error.message')}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                label={t('contact.form.name.label')}
                placeholder={t('contact.form.name.placeholder')}
                required
                mb="md"
                error={errors.name}
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <TextInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                label={t('contact.form.email.label')}
                placeholder={t('contact.form.email.placeholder')}
                required
                mb="md"
                error={errors.email}
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <TextInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label={t('contact.form.phone.label')}
                placeholder={t('contact.form.phone.placeholder')}
                mb="md"
                error={errors.phone}
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                label={t('contact.form.message.label')}
                placeholder={t('contact.form.message.placeholder')}
                required
                minRows={4}
                mb="xl"
                error={errors.message}
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <Button 
                type="submit" 
                radius="md" 
                size="md"
                loading={isSubmitting}
                className={styles.submitButton}
                disabled={Object.values(errors).some(error => error)}
              >
                {t('contact.form.submit')}
              </Button>
            </form>
          </div>

          <div>
            <Stack>
              {contactInfo.map((item, index) => (
                <Paper 
                  key={index} 
                  p="lg" 
                  radius="md" 
                  withBorder
                  className={styles.contactCard}
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Box mt={4} className={styles.iconColor}>
                      {item.icon}
                    </Box>
                    <div>
                      <Text fw={600} size="md" mb={5} className={styles.cardTitle}>{item.title}</Text>
                      <Text size="sm" className={styles.cardText}>{item.description}</Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Paper 
              withBorder 
              p="xl" 
              mt="xl" 
              radius="md"
              className={styles.socialCard}
            >
              <Text fw={600} size="lg" mb="md" className={styles.socialTitle}>
                {t('contact.social.title')}
              </Text>
              <Text size="sm" mb="xl" className={styles.socialText}>
                {t('contact.social.description')}
              </Text>
              <Group>
                <Button 
                  component="a" 
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
                  target="_blank"
                  variant="outline" 
                  radius="xl"
                  className={styles.socialButton}
                >
                  {t('contact.social.instagram')}
                </Button>
                <Button 
                  component="a" 
                  href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"} 
                  target="_blank"
                  variant="outline" 
                  radius="xl"
                  className={styles.socialButton}
                >
                  {t('contact.social.tiktok')}
                </Button>
              </Group>
            </Paper>
          </div>
        </SimpleGrid>
      </Container>
    </Box>
  );
} 