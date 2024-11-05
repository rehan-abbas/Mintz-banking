import Mobilenav from "@/components/Mobilenav";
import Sidebar from "@/components/Sidebar";
import { MobileIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstname: "Rehan",
    lastname: "Ab",
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <Mobilenav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
