import Link from "next/link"
import type { Business } from "@/lib/types"

type Props = {
  business: Business
}

export default function AnnouncementBar({ business }: Props) {
  const line =
    business.promotions.find((p) => p.text.length < 120 && !p.text.includes("http"))?.text ??
    "Staten Island delivery — fresh, hand-arranged flowers."

  return (
    <div className="border-b border-stone-200/80 bg-[#f4f1ec] text-center text-xs font-medium tracking-wide text-stone-700 sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2.5 sm:flex-row sm:gap-4">
        <p className="max-w-2xl leading-snug">{line}</p>
        <Link
          href="/collections/mothers-day"
          className="shrink-0 underline decoration-stone-400 decoration-1 underline-offset-4 transition hover:text-stone-900"
        >
          Shop collections
        </Link>
      </div>
    </div>
  )
}
