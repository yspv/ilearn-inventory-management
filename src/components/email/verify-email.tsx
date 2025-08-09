import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

export default function VerifyEmail(props: { url: string }) {
  const { url } = props;
  return (
    <Html>
      <Head />
      <Preview>Log In</Preview>
      <Body>
        <Container style={container}>
          <Section style={box}>
            <Heading style={h1}>Log In</Heading>
            <Text>
              If you didn&apos;t try to login, you can safely ignore this email.
            </Text>
            <Button href={url} style={button}>
              Sign in with Magic Link
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const button = {
  backgroundColor: "#5472E4",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const box = {
  padding: "0 48px",
};
