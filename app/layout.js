import "./globals.css";

export const metadata = {
  title: {
    default: "Block Lease",
    template: "%s | Block Lease"
  },
  description:
    "Secure deposits for student subleases, lease takeovers, and remote rentals."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
