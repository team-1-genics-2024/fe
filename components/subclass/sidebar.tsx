import { AppSidebar } from "../layout/navbar/app-sidebar";

import { SidebarProvider } from "../ui/sidebar";
import { SidebarTrigger } from "../ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
