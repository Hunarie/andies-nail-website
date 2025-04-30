import { Container, Title, Text, TextInput, Textarea, Button, Group, Box, SimpleGrid, Stack, Paper } from '@mantine/core';
import { TbMapPin, TbPhone, TbMail, TbClock } from 'react-icons/tb';

export function Contact() {
  const contactInfo = [
    {
      title: 'Address',
      description: '123 Nail Studio St, Los Angeles, CA 90001',
      icon: <TbMapPin size={30} />
    },
    {
      title: 'Phone',
      description: '(555) 123-4567',
      icon: <TbPhone size={30} />
    },
    {
      title: 'Email',
      description: 'andie@nailsbyandie.com',
      icon: <TbMail size={30} />
    },
    {
      title: 'Working Hours',
      description: 'Tue-Sat: 10:00 AM - 7:00 PM',
      icon: <TbClock size={30} />
    },
  ];

  return (
    <Box 
      id="contact" 
      component="section"
      style={{ 
        backgroundColor: 'white' 
      }}
    >
      <Container size="xl">
        <Title className="section-title" order={2} ta="center" mb={50}>
          Get in Touch
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
          <div>
            <Text size="lg" mb="md">
              Have a question or want to book an appointment? Fill out the form below and I'll get back to you as soon as possible.
            </Text>

            <form>
              <TextInput
                label="Name"
                placeholder="Your name"
                required
                mb="md"
              />
              
              <TextInput
                label="Email"
                placeholder="your.email@example.com"
                required
                mb="md"
              />
              
              <TextInput
                label="Phone"
                placeholder="(555) 123-4567"
                mb="md"
              />
              
              <Textarea
                label="Message"
                placeholder="How can I help you?"
                required
                minRows={4}
                mb="xl"
              />
              
              <Button type="submit" color="pink" radius="md" size="md">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <Stack>
              {contactInfo.map((item, index) => (
                <Paper key={index} p="md" radius="md" withBorder>
                  <Group wrap="nowrap" align="flex-start">
                    <Box mt={4} style={{ color: 'var(--primary-pink-dark)' }}>
                      {item.icon}
                    </Box>
                    <div>
                      <Text fw={600} size="md" mb={5}>{item.title}</Text>
                      <Text size="sm">{item.description}</Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Paper withBorder p="xl" mt="xl" radius="md">
              <Text fw={600} size="lg" mb="md">
                Follow On Social Media
              </Text>
              <Text size="sm" mb="md">
                Stay updated with the latest designs, promotions, and nail care tips by following my social media accounts.
              </Text>
              <Group>
                <Button 
                  component="a" 
                  href="https://www.instagram.com/andiee.orozco2/" 
                  target="_blank"
                  variant="outline" 
                  color="pink"
                  radius="xl"
                >
                  Instagram
                </Button>
                <Button 
                  component="a" 
                  href="https://www.tiktok.com/@andieorozco4" 
                  target="_blank"
                  variant="outline" 
                  color="pink"
                  radius="xl"
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