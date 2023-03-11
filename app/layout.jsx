import './globals.css'
import Nav from './auth/Nav'
import { Montserrat, Roboto } from "@next/font/google"
import QueryWrapper from './auth/QueryWrapper'
import SideNav from './components/SideNav'

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head />
      <body className={`mx-4 md:mx-48 xl:mx-96 ${montserrat.variable} p-10 bg-zinc-100 font-montserrat`}>
        <QueryWrapper>
          <Nav />
          <SideNav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
