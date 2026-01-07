import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'

const toast = ToasterUtil()

export const useCategoryActions = (pubId: string) => {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: (payload: any) =>
      API.post(API_ENDPOINTS.CATEGORY.CREATE, payload).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useAllCategories'] })
      toast('Category created successfully', 'success')
    },

    onError: () => {
      toast('Failed to create category', 'error')
    },
  })

  const updateCategory = useMutation({
    mutationFn: (payload: any) =>
      API.patch(`${API_ENDPOINTS.CATEGORY.UPDATE}/${pubId}`, payload).then((res) => res.data.data),

    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(['useAllCategories'], (old: any[]) => {
        if (!Array.isArray(old)) return old

        return old.map((c) => (c._id === updatedCategory._id ? updatedCategory : c))
      })

      toast('Category updated successfully', 'success')
    },

    onError: () => {
      toast('Failed to update category', 'error')
    },
  })

  const deleteCategory = useMutation({
    mutationFn: () =>
      API.delete(`${API_ENDPOINTS.CATEGORY.DELETE}/${pubId}`).then((res: any) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useAllCategories'] })
      toast('Category deleted successfully', 'success')
    },

    onError: () => {
      toast('Failed to delete category', 'error')
    },
  })

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
