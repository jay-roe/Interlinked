import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from "@/components/NavBar/NavBar"
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
            <NavBar />
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}
