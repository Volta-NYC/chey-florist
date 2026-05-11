import "./globals.css"

export const metadata = {
  title: "Chey Florist · Le Jardin Privé — Hand-Arranged Flowers in Staten Island",
  description: "An atelier of fresh blooms. Hand-arranged bouquets and botanical compositions, delivered the same day across Staten Island, NY.",
  keywords: "florist, flowers, Staten Island, atelier, bouquets, weddings, delivery",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col paper grain text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
