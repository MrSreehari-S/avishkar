'use client'

import Link from 'next/link'

export default function EventsPage() {
  return (
    <main className="min-h-[100dvh] w-full flex bg-black text-white">

      {/* MAIN EVENTS */}
      <div
        className="w-1/2 relative flex items-end justify-center border-r border-white/10
                   bg-no-repeat bg-center bg-[length:95%]"
        style={{ backgroundImage: "url('/events/main-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative w-full px-10 pb-16 text-center space-y-4 z-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Main Events
          </h2>

          <p className="text-yellow-400/80 max-w-sm mx-auto">
            Flagship events, competitions and keynote sessions
          </p>

          <Link href="/events/main">
            <button
              className="
                mt-2
                px-10 py-3 rounded-full
                border border-white/30
                font-medium
                transition-all duration-300
                hover:-translate-y-2
                hover:scale-105
                hover:border-yellow-400
                hover:text-yellow-400
                hover:shadow-[0_0_40px_rgba(255,200,0,0.5)]
                active:scale-95
              "
            >
              Explore →
            </button>
          </Link>
        </div>
      </div>

      {/* DEPARTMENT EVENTS */}
      <div
        className="w-1/2 relative flex items-end justify-center bg-cover bg-center
                   brightness-105 saturate-110"
        style={{ backgroundImage: "url('/events/dept-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative w-full px-10 pb-16 text-center space-y-4 z-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Department Events
          </h2>

          <p className="text-yellow-400/80 max-w-sm mx-auto">
            Explore events organized by individual departments
          </p>

          <Link href="/events/dept">
            <button
              className="
                mt-2
                px-10 py-3 rounded-full
                border border-white/30
                font-medium
                transition-all duration-300
                hover:-translate-y-2
                hover:scale-105
                hover:border-yellow-400
                hover:text-yellow-400
                hover:shadow-[0_0_40px_rgba(255,200,0,0.5)]
                active:scale-95
              "
            >
              Choose Department →
            </button>
          </Link>
        </div>
      </div>

    </main>
  )
}
