import "./globals.css"

export const metadata = {
  title: "Chey Florist - Fresh Flower Delivery in Staten Island, NY",
  description: "Hand-arranged fresh flowers for every occasion. Same-day delivery in Staten Island, NY. Premium arrangements for birthdays, anniversaries, weddings, sympathy, and more.",
  keywords: "florist, flowers, Staten Island, delivery, arrangements, fresh flowers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        {children}
      </body>
    </html>
  )
}
