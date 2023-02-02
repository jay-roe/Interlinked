import 'styles/globals.css'
import NavBar from "@/components/NavBar/NavBar";
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
        <body>
          <AuthProvider>
            <main className='min-h-screen flex flex-col bg-purple-background'>
              <NavBar />
              {children}
            </main>
          </AuthProvider>
        </body>
    </html>
  )
}
