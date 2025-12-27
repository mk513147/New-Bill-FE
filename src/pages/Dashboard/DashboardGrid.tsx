import { Grid, Box, VStack } from '@chakra-ui/react'
import { TopSellingItems } from './cards/TopSellingItems'
import { PendingActions } from './cards/PendingActions'
import { TopStockedItems } from './cards/TopStockedItems'
import { SalesByChannel } from './cards/SalesByChannel'
import { SalesOrderSummary } from './cards/SalesOrderSummary'
import { TopVendors } from './cards/TopVendors'
import { ReceiveHistory } from './cards/ReceiveHistory'

export function DashboardGrid() {
  return (
    <Grid
      templateColumns="1fr 360px" // 🔑 independent right rail
      gap={4}
      alignItems="start"
    >
      {/* LEFT COLUMN (main dashboard flow) */}
      <VStack align="stretch" gap={4}>
        <TopSellingItems />

        <Grid templateColumns="repeat(9, 1fr)" gap={4}>
          <Box gridColumn="span 4">
            <TopStockedItems />
          </Box>
          <Box gridColumn="span 5">
            <SalesByChannel />
          </Box>
        </Grid>

        <SalesOrderSummary />

        <Grid templateColumns="repeat(9, 1fr)" gap={4}>
          <Box gridColumn="span 4">
            <TopVendors />
          </Box>
          <Box gridColumn="span 5">
            <ReceiveHistory />
          </Box>
        </Grid>
      </VStack>

      {/* RIGHT COLUMN (isolated, fixed-width) */}
      <Box position="relative" width={'320px'}>
        <PendingActions />
      </Box>
    </Grid>
  )
}
