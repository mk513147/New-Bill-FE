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
        subtitle: 'Live business analytics, collections, stock, and transaction flow',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return (
    <Box
      height={'100%'}
      minH="100%"
      overflowY="auto"
      bg="linear-gradient(180deg, #fffaf5 0%, #f8fafc 36%, #eef2ff 100%)"
    >
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <DashboardGrid />
        <DashBoardFooter />
      </Box>
    </Box>
  )
}

export default Dashboard
