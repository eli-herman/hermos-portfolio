import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs text-[#5A6480] uppercase tracking-widest mb-4">404</p>

      <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] bg-clip-text text-transparent">
        Nothing here.
      </h1>

      <p className="text-muted text-base mt-4 max-w-[40ch]">
        This page doesn&apos;t exist. Maybe it moved, maybe it never did.
      </p>

      <Link
        href="/"
        style={{ boxShadow: '0 6px 0 0 #7E4F10' }}
        className="mt-10 inline-flex items-center justify-center rounded-xl min-h-[48px] px-10 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] hover:from-[#D4921A] hover:via-[#EABD70] hover:to-[#D4921A] transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back home
      </Link>
    </div>
  );
}
