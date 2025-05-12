import { user } from "@/api/user";
import { useQuery } from "../use-query";

export const useUserList = () => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: () => user.getAll(),
    enabled:true,
  });
};

export const useSearcUser = (searchTerm: string) => {
  return useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => user.searchUsers(searchTerm),
    enabled: !!searchTerm.trim(),
  });
}; 

export const useUserData = (id: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ["userData", id],
    queryFn: () => user.getById(id!),
    enabled: !!id && enabled,
  });
};
