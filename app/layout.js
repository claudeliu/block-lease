import "./globals.css";

export const metadata = {
  title: "Block Lease",
  description: "Rental deposit escrow for student housing, subleases, lease takeovers, and cross-border move-ins."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
