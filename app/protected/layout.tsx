import Header from "@/components/header/header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <Header />
      {children}
    </div>
  );
}
