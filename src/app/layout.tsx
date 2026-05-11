import "./globals.css"
import { ScrollReveal } from "@/components"

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
        {/* Page-scroll progress bar */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[200] sd-progress origin-left scale-x-0"
        />
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}
