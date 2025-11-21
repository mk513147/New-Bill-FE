<<<<<<< HEAD
import API_ENDPOINTS from "@/Api/apiEndpoints";
import { API } from "@/Api/api";
import { useQuery } from "@tanstack/react-query";

export const getCustomer = async () => {
	const res = await API.get(API_ENDPOINTS.CUSTOMERS.BASE);
	return res.data?.data || null;
};

export const useCustomer = () => {
	return useQuery({
		queryKey: ["getCustomer"],
		queryFn: getCustomer,
		retry: false,
		staleTime: 1000 * 60 * 10,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
=======
import API_ENDPOINTS from '@/Api/apiEndpoints'
import { createCrudHooks } from './createCrudHooks'

export const customerHooks = createCrudHooks(API_ENDPOINTS.CUSTOMERS.BASE, 'customers')
>>>>>>> d75b31d56762c7a56c7662413c60c423e933a7d9
