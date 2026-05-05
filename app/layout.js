import "./globals.css";

export const metadata = {
  title: "Fridge Chef",
  description: "Turn your ingredients into recipe ideas — powered by AI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
