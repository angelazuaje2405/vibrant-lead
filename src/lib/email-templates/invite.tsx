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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Te invitaron a unirte a {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>{siteName}</Text>
        <Heading style={h1}>Te han invitado</Heading>
        <Text style={text}>
          Recibiste una invitación para unirte a{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Haz clic en el botón para aceptarla y crear tu cuenta.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Aceptar invitación
        </Button>
        <Text style={footer}>
          Si no esperabas esta invitación, puedes ignorar este mensaje.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

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
