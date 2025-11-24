import PageRouter from './routes/PageRouter.tsx'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './redux/store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as UIProvider } from '@/components/ui/provider.tsx'

const queryClient = new QueryClient()
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <UIProvider>
            <PageRouter />
          </UIProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
