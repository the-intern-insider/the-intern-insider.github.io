import "./globals.css";

export const metadata = {
  title: "The Intern Insider",
  description: "A practical guide to landing big tech internships."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
