import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "UE Resume Builder and Mock Interview app",
  description:
    "UE resume builder and Mock interview is a free, open-source, and powerful resume builder that allows anyone to create a modern professional resume in 3 simple steps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
