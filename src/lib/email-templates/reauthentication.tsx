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

import { code, container, footer, h1, main, text } from './styles'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({
  token,
}: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirma tu identidad</Heading>
        <Text style={text}>Usa el siguiente código para continuar:</Text>
        <Text style={code}>{token}</Text>
        <Text style={footer}>
          Este código expira en poco tiempo. Si no lo solicitaste, ignora este
          mensaje.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
