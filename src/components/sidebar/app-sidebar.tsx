import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AdminRoutes, Chart } from "@/constants";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavUser } from "./nav-user";
import { useAuth } from "@/hooks/use-api/useAuth";
import { NavProjects } from "./nav-projects";

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
  const { getUser, logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <NavProjects projects={Chart} />
          <NavMain items={AdminRoutes} />
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={getUser()} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
