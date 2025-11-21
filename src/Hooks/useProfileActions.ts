import { API } from '@/Api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useProfileActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createProfile = useMutation({
    mutationFn: (payload: any) => API.post('/profile', payload).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const updateProfile = useMutation({
    mutationFn: (payload: any) => API.put(`/profile/${pubId}`, payload).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', pubId] })
    },
  })

  const deleteProfile = useMutation({
    mutationFn: () => API.delete(`/profile/${pubId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    createProfile,
    updateProfile,
    deleteProfile,
  }
}
