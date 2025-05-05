'use client';

import { useState } from 'react';
import { Container, Text, TextInput, Textarea, Button, Group, Box, SimpleGrid, Stack, Paper, Alert } from '@mantine/core';
import { TbPhone, TbMail, TbCheck, TbX } from 'react-icons/tb';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Contact.module.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
      title: 'Phone',
      description: process.env.NEXT_PUBLIC_CONTACT_PHONE || '(616) 734-7308',
      icon: <TbPhone size={30} />
    },
    {
      title: 'Email',
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
        <SectionTitle>Get in Touch</SectionTitle>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
          <div>
            <Text size="lg" mb="md" className={styles.descriptionText}>
              Have a question or want to book an appointment? Fill out the form below and I&apos;ll get back to you as soon as possible.
            </Text>

            {submitStatus === 'success' && (
              <Alert 
                icon={<TbCheck size={16} />} 
                title="Message Sent!" 
                color="green" 
                mb="md"
              >
                Thank you for your message. I&apos;ll get back to you soon!
              </Alert>
            )}
            
            {submitStatus === 'error' && (
              <Alert 
                icon={<TbX size={16} />} 
                title="Error" 
                color="red" 
                mb="md"
              >
                There was a problem sending your message. Please try again.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                placeholder="Your name"
                required
                mb="md"
                styles={{
                  label: { fontFamily: "var(--font-lato), sans-serif" },
                  input: { 
                    borderColor: 'var(--border-color)',
                    '&:focus': { borderColor: 'var(--primary-pink)' }
                  }
                }}
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <TextInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                placeholder="your.email@example.com"
                required
                mb="md"
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <TextInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label="Phone"
                placeholder="(555) 123-4567"
                mb="md"
                classNames={{
                  label: styles.formLabel,
                  input: styles.formInput
                }}
              />
              
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                label="Message"
                placeholder="How can I help you?"
                required
                minRows={4}
                mb="xl"
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
              >
                Send Message
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
                Follow On Social Media
              </Text>
              <Text size="sm" mb="xl" className={styles.socialText}>
                Follow me on social media to stay updated on my journey &lt;3.
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
                  Instagram
                </Button>
                <Button 
                  component="a" 
                  href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"} 
                  target="_blank"
                  variant="outline" 
                  radius="xl"
                  className={styles.socialButton}
                >
                  TikTok
                </Button>
              </Group>
            </Paper>
          </div>
        </SimpleGrid>
      </Container>
    </Box>
  );
} 