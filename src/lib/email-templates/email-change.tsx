import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface EmailChangeEmailProps {
  siteName: string
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail to read
  // "from OLD to NEW" instead of "from NEW to NEW".
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma el cambio de correo en {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>{siteName}</Text>
        <Heading style={h1}>Confirma el cambio de correo</Heading>
        <Text style={text}>
          Solicitaste cambiar la dirección de correo de tu cuenta en {siteName}{' '}
          desde{' '}
          <Link href={`mailto:${oldEmail}`} style={link}>
            {oldEmail}
          </Link>{' '}
          a{' '}
          <Link href={`mailto:${newEmail}`} style={link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirmar cambio
        </Button>
        <Text style={footer}>
          Si no solicitaste este cambio, protege tu cuenta de inmediato.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: '#101627',
}
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 28px' }
const brand = {
  fontSize: '13px',
  fontWeight: 'bold' as const,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: '#1746e6',
  margin: '0 0 20px',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#101627',
  margin: '0 0 18px',
}
const text = {
  fontSize: '15px',
  color: '#4a5568',
  lineHeight: '1.6',
  margin: '0 0 22px',
}
const link = { color: '#1746e6', textDecoration: 'underline' }
const button = {
  backgroundColor: '#1746e6',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '9999px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = {
  fontSize: '12px',
  color: '#8b95a5',
  margin: '32px 0 0',
  borderTop: '1px solid #e5e9f0',
  paddingTop: '16px',
}
