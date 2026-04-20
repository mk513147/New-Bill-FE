import { API } from '@/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { AxiosError } from 'axios'

const toast = ToasterUtil()

export type CategoryPayload = {
  name: string
}

export const useCategoryActions = () => {
  const queryClient = useQueryClient()

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  }

  const createCategory = useMutation({
    mutationFn: (payload: CategoryPayload) =>
      API.post(API_ENDPOINTS.CATEGORY.CREATE, payload).then((res) => res.data?.data ?? res.data),

    onSuccess: () => {
      invalidateCategories()
      toast('Category created successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to create category', 'error')
        return
      }

      toast('Failed to create category', 'error')
    },
  })

  const updateCategory = useMutation({
    mutationFn: ({ categoryId, payload }: { categoryId: string; payload: CategoryPayload }) =>
      API.patch(`${API_ENDPOINTS.CATEGORY.UPDATE}/${categoryId}`, payload).then(
        (res) => res.data?.data ?? res.data,
      ),

    onSuccess: () => {
      invalidateCategories()
      toast('Category updated successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to update category', 'error')
        return
      }

      toast('Failed to update category', 'error')
    },
  })

  const deleteCategory = useMutation({
    mutationFn: (categoryId: string) =>
      API.delete(`${API_ENDPOINTS.CATEGORY.DELETE}/${categoryId}`).then((res) => res.data),

    onSuccess: () => {
      invalidateCategories()
      toast('Category deleted successfully', 'success')
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || 'Failed to delete category', 'error')
        return
      }

      toast('Failed to delete category', 'error')
    },
  })

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
