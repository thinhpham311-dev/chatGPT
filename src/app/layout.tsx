import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'
import { ReduxProvider } from "@/redux/provider"

export const metadata: Metadata = {
  title: 'ChatGPT',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ReduxProvider>
            <GlobalStyles />
            {children}
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
