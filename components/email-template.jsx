export default function EmailTemplate({ message }) {
  // keep it plain JSX/HTML; avoid next/image, next/link, client hooks, shadcn/ui, etc.
  return (
    <html>
      <body style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
        <p style={{ fontSize: 16, lineHeight: "24px" }}>{message}</p>
      </body>
    </html>
  );
}
