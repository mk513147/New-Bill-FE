import { useQuery } from "@tanstack/react-query";
import { API } from "@/Api/api";
import API_ENDPOINTS from "@/Api/apiEndpoints";

export const getProfile = async () => {
  const { data } = await API.get(API_ENDPOINTS.MERCHANT.PROFILE);
  return data.user;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    retry: false,

    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
