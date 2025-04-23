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
import { useAuth } from "@/hooks/use-api/useAuth";
import { useUser } from "@/hooks/use-api/useUser";
import { useEffect, useState } from "react";

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
  const { logout } = useAuth();
  const { getUserById } = useUser();
  const [ user, setUser ] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  
  const fetchUser = async () => {
    const res = await getUserById();
    setUser(res);
  };

  useEffect(() => { 
    fetchUser();
  }, []);

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
