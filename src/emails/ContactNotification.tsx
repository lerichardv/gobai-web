import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nuevo mensaje de contacto de {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img
            src="https://gobai.la/img/gobai-blue-gradient-logo.png"
            width="288"
            height="92"
            alt="Gobai"
            style={logo}
          />
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>Nuevo Mensaje de Contacto</Heading>
          <Text style={text}>
            Se ha recibido una nueva consulta a través del formulario de la página web.
          </Text>
          
          <Section style={infoSection}>
            <Text style={label}>NOMBRE</Text>
            <Text style={value}>{name}</Text>
            
            <Text style={label}>EMAIL</Text>
            <Link href={`mailto:${email}`} style={link}>{email}</Link>
            
            {phone && (
              <>
                <Text style={label}>TELÉFONO</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={label}>MENSAJE</Text>
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            Este mensaje fue enviado automáticamente desde el sitio web de GOBAI.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactNotificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const header = {
  backgroundColor: '#00040a',
  padding: '20px',
  textAlign: 'center' as const,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logo = {
  margin: '0 auto',
};

const headerTitle = {
  color: '#62e4ff',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '10px 0 0',
};

const content = {
  padding: '40px 48px',
};

const h1 = {
  color: '#00040a',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  textTransform: 'uppercase' as const,
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
};

const infoSection = {
  marginTop: '32px',
};

const label = {
  color: '#8898aa',
  fontSize: '10px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  margin: '16px 0 4px',
  textTransform: 'uppercase' as const,
};

const value = {
  color: '#00040a',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 12px',
};

const link = {
  color: '#00c6ff',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  marginTop: '8px',
};

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  marginTop: '32px',
};
