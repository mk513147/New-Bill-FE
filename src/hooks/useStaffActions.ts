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

  const exportStaff = useMutation({
    mutationFn: () =>
      API.get(API_ENDPOINTS.STAFF.EXPORT, { responseType: 'blob' }).then((res) => res.data),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.download = `staff_${Date.now()}.xlsx`
      link.click()
      window.URL.revokeObjectURL(url)
      toast('Staff exported successfully', 'success')
    },
    onError: () => {
      toast('Failed to export staff', 'error')
    },
  })

  const importStaff = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData()
      fd.append('file', file)
      return API.post(API_ENDPOINTS.STAFF.IMPORT, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStaffList'] })
      toast('Staff imported successfully', 'success')
    },
    onError: () => {
      toast('Failed to import staff', 'error')
    },
  })

  return {
    createStaff,
    updateStaff,
    deleteStaff,
    exportStaff,
    importStaff,
  }
}
