import { setActiveTab } from '@/redux/slices/dockSlice'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { DashboardGrid } from './DashboardGrid'
import { DashBoardFooter } from './DashBoardFooter'

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveTab('home'))
    dispatch(
      setHeader({
        title: 'Dashboard',
        subtitle: 'Overview & statistics',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return (
    <Box px={6} py={4} bg="gray.50" minH="100%">
      <DashboardGrid />
      <DashBoardFooter />
    </Box>
  )
}

export default Dashboard
