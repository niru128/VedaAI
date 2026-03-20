import Sidebar from "@/components/layout/Sidebar";
import "./globals.css"

export default function RootLayout({children} : any){
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex bg-gray-50">
        
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </body>
    </html>
  )
}
