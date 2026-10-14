import { Navbar } from "@/src/components/navbar/navbar"

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
        {children}
      </>
  );
}
