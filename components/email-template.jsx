export default function EmailTemplate({ message }) {
  return (
    <html>
      <body style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
        <p style={{ fontSize: 16, lineHeight: "24px" }}>{message}</p>
      </body>
    </html>
  );
}
