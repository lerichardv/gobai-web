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

interface ResetPasswordEmailProps {
  resetLink: string;
}

export const ResetPasswordEmail = ({
  resetLink,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Restablece tu contraseña de Gobai</Preview>
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
          <Heading style={h1}>Restablecer Contraseña</Heading>
          <Text style={text}>
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Gobai.
          </Text>
          <Text style={text}>
            Para completar este proceso, haz clic en el siguiente botón:
          </Text>
          
          <Section style={buttonContainer}>
            <Link href={resetLink} style={button}>
              Restablecer Contraseña
            </Link>
          </Section>

          <Text style={textMuted}>
            Este enlace es válido por 1 hora. Si no has solicitado este cambio, puedes ignorar este correo de forma segura.
          </Text>

          <Hr style={hr} />
          
          <Text style={textMutedSmall}>
            Si tienes problemas con el botón, copia y pega esta dirección en tu navegador:
          </Text>
          <Text style={linkText}>
            <Link href={resetLink} style={link}>
              {resetLink}
            </Link>
          </Text>

          <Hr style={hr} />
          
          <Text style={footer}>
            Este mensaje fue enviado automáticamente desde el sitio web de GOBAI.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

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
};

const logo = {
  margin: '0 auto',
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

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#00c6ff',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const textMuted = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center' as const,
  marginTop: '24px',
};

const textMutedSmall = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center' as const,
};

const linkText = {
  textAlign: 'center' as const,
  margin: '8px 0',
  wordBreak: 'break-all' as const,
};

const link = {
  color: '#00c6ff',
  fontSize: '13px',
  textDecoration: 'none',
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
