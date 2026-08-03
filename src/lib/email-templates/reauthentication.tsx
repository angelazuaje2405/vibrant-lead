import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>AKA Conect</Text>
        <Heading style={h1}>Confirma tu identidad</Heading>
        <Text style={text}>Usa este código para continuar:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          El código caduca en unos minutos. Si no lo solicitaste, ignora este
          mensaje.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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
  margin: '0 0 16px',
}
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  letterSpacing: '0.18em',
  color: '#1746e6',
  margin: '0 0 28px',
}
const footer = {
  fontSize: '12px',
  color: '#8b95a5',
  margin: '32px 0 0',
  borderTop: '1px solid #e5e9f0',
  paddingTop: '16px',
}
