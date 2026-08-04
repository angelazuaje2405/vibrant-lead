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

import { button, container, footer, h1, link, main, text } from './styles'

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
        <Heading style={h1}>Tienes una invitación</Heading>
        <Text style={text}>
          Te invitaron a unirte a{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Acepta la invitación para crear tu cuenta.
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
