import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/Api/api";
import { ToasterUtil } from "@/components/ToasterUtil";

export const createCrudHooks = (baseEndpoint: string, baseKey: string) => {
	const toast = ToasterUtil();

	return {
		/** ---------- GET ALL ---------- **/
		useGetAll: () =>
			useQuery({
				queryKey: [baseKey, "list"],
				queryFn: async () => {
					const { data } = await API.get(baseEndpoint);
					return data;
				},
			}),

		/** ---------- CREATE ---------- **/
		useCreate: () => {
			const queryClient = useQueryClient();
			return useMutation({
				mutationFn: async (payload: any) => {
					const { data } = await API.post(baseEndpoint, payload);
					return data;
				},
				onSuccess: () => {
					toast("Created successfully!", "success");
					queryClient.invalidateQueries({ queryKey: [baseKey] });
				},
				onError: (err: any) =>
					toast(err.response?.data?.message || "Create failed", "error"),
			});
		},

		/** ---------- UPDATE ---------- **/
		useUpdate: () => {
			const queryClient = useQueryClient();
			return useMutation({
				mutationFn: async ({ id, payload }: any) => {
					const { data } = await API.put(`${baseEndpoint}/${id}`, payload);
					return data;
				},
				onSuccess: () => {
					toast("Updated successfully!", "success");
					queryClient.invalidateQueries({ queryKey: [baseKey] });
				},
				onError: (err: any) =>
					toast(err.response?.data?.message || "Update failed", "error"),
			});
		},

		/** ---------- DELETE ---------- **/
		useDelete: () => {
			const queryClient = useQueryClient();
			return useMutation({
				mutationFn: async (id: string | number) => {
					const { data } = await API.delete(`${baseEndpoint}/${id}`);
					return data;
				},
				onSuccess: () => {
					toast("Deleted successfully!", "success");
					queryClient.invalidateQueries({ queryKey: [baseKey] });
				},
				onError: (err: any) =>
					toast(err.response?.data?.message || "Delete failed", "error"),
			});
		},
	};
};
