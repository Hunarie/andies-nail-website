'use client';

import { useState } from 'react';
import { Container, Text, TextInput, Textarea, Button, Group, Box, SimpleGrid, Stack, Paper, Alert } from '@mantine/core';
import { TbPhone, TbMail, TbCheck, TbX } from 'react-icons/tb';
import { SectionTitle } from '@/components/ui/SectionTitle';

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
      style={{ 
        backgroundColor: 'var(--background)',
        padding: 'var(--section-padding)',
        position: 'relative',
        overflow: 'hidden' 
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute', 
          top: 50, 
          right: 80, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          background: 'var(--primary-pink-light)', 
          opacity: 0.4,
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute', 
          bottom: 120, 
          left: 40, 
          width: 150, 
          height: 150, 
          borderRadius: '50%', 
          background: 'var(--primary-pink-light)', 
          opacity: 0.3,
          zIndex: 1
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle>Get in Touch</SectionTitle>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
          <div>
            <Text size="lg" mb="md" style={{ color: 'var(--text-color)', fontFamily: "var(--font-lato), sans-serif" }}>
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
              />
              
              <TextInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                placeholder="your.email@example.com"
                required
                mb="md"
                styles={{
                  label: { fontFamily: "var(--font-lato), sans-serif" },
                  input: { 
                    borderColor: 'var(--border-color)',
                    '&:focus': { borderColor: 'var(--primary-pink)' }
                  }
                }}
              />
              
              <TextInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label="Phone"
                placeholder="(555) 123-4567"
                mb="md"
                styles={{
                  label: { fontFamily: "var(--font-lato), sans-serif" },
                  input: { 
                    borderColor: 'var(--border-color)',
                    '&:focus': { borderColor: 'var(--primary-pink)' }
                  }
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
                styles={{
                  label: { fontFamily: "var(--font-lato), sans-serif" },
                  input: { 
                    borderColor: 'var(--border-color)',
                    '&:focus': { borderColor: 'var(--primary-pink)' }
                  }
                }}
              />
              
              <Button 
                type="submit" 
                radius="md" 
                size="md"
                loading={isSubmitting}
                style={{
                  backgroundColor: 'var(--primary-pink)',
                  color: 'white',
                  fontFamily: "var(--font-lato), sans-serif",
                  transition: 'all 0.3s ease',
                  border: 'none',
                  letterSpacing: '0.5px',
                  fontWeight: 500
                }}
                styles={{
                  root: {
                    '&:hover': {
                      backgroundColor: 'var(--primary-pink-dark)'
                    }
                  }
                }}
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
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: '#fff7f9',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Box mt={4} style={{ color: 'var(--primary-pink-dark)' }}>
                      {item.icon}
                    </Box>
                    <div>
                      <Text fw={600} size="md" mb={5} style={{ fontFamily: "var(--font-lato), sans-serif", color: 'var(--text-color)' }}>{item.title}</Text>
                      <Text size="sm" style={{ fontFamily: "var(--font-lato), sans-serif", color: 'var(--text-color)' }}>{item.description}</Text>
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
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: '#fff7f9'
              }}
            >
              <Text fw={600} size="lg" mb="md" style={{ fontFamily: "var(--font-playfair), serif", color: 'var(--text-color)' }}>
                Follow On Social Media
              </Text>
              <Text size="sm" mb="xl" style={{ fontFamily: "var(--font-lato), sans-serif", color: 'var(--text-color)' }}>
                Follow me on social media to stay updated on my journey &lt;3.
              </Text>
              <Group>
                <Button 
                  component="a" 
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
                  target="_blank"
                  variant="outline" 
                  radius="xl"
                  style={{
                    borderColor: 'var(--primary-pink)',
                    color: 'var(--primary-pink-dark)',
                    fontFamily: "var(--font-lato), sans-serif",
                    transition: 'all 0.3s ease'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: 'var(--primary-pink-light)',
                        borderColor: 'var(--primary-pink-dark)',
                        color: 'var(--primary-pink-dark)'
                      }
                    }
                  }}
                >
                  Instagram
                </Button>
                <Button 
                  component="a" 
                  href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"} 
                  target="_blank"
                  variant="outline" 
                  radius="xl"
                  style={{
                    borderColor: 'var(--primary-pink)',
                    color: 'var(--primary-pink-dark)',
                    fontFamily: "var(--font-lato), sans-serif",
                    transition: 'all 0.3s ease'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: 'var(--primary-pink-light)',
                        borderColor: 'var(--primary-pink-dark)',
                        color: 'var(--primary-pink-dark)'
                      }
                    }
                  }}
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