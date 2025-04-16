import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AdminRoutes } from "@/constants";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavUser } from "./nav-user";
import { useAuth } from "@/hooks/useAuth";

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export function AppSidebar() {
  const { logout, getUser } = useAuth();
  const user = getUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <NavMain items={AdminRoutes} />
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
