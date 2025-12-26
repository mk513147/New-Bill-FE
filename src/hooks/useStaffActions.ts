import { API } from '@/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints.ts'
import { ToasterUtil } from '@/components/common/ToasterUtil'

const toast = ToasterUtil()

export const useStaffActions = (staffId: string) => {
  const queryClient = useQueryClient()

  const createStaff = useMutation({
    mutationFn: (payload: any) =>
      API.post(API_ENDPOINTS.STAFF.CREATE, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStaffList'] })
      toast('Staff created successfully', 'success')
    },

    onError: () => {
      toast('Failed to create staff', 'error')
    },
  })

  const updateStaff = useMutation({
    mutationFn: (payload: any) =>
      API.patch(`${API_ENDPOINTS.STAFF.UPDATE}/${staffId}`, payload).then((res) => res.data),

    onSuccess: (updatedStaff) => {
      queryClient.setQueriesData({ queryKey: ['getStaffList'] }, (old: any) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.map((c: any) => (c._id === updatedStaff._id ? updatedStaff : c)),
        }
      })
      queryClient.invalidateQueries({ queryKey: ['getStaffList'] })
      toast('Staff updated successfully', 'success')
    },

    onError: () => {
      toast('Failed to update staff', 'error')
    },
  })

  const deleteStaff = useMutation({
    mutationFn: () =>
      API.delete(`${API_ENDPOINTS.STAFF.DELETE}/${staffId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStaffList'] })
      toast('Staff deleted successfully', 'success')
    },

    onError: () => {
      toast('Failed to delete staff', 'error')
    },
  })

  return {
    createStaff,
    updateStaff,
    deleteStaff,
  }
}
