import "./globals.css";

export const metadata = {
  title: "Block Lease",
  description: "Demo for a blockchain-based rental deposit escrow platform."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
