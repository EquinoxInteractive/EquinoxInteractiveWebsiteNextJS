import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <pre aria-hidden className="font-mono text-[10px] leading-3 text-muted-foreground sm:text-xs sm:leading-4">{`
 _  _    ___  _  _
| || |  / _ \\| || |
| || |_| | | | || |_
|__   _| |_| |__   _|
   |_|  \\___/   |_|
`}</pre>
      <h1 className="mt-6 font-orbitron text-4xl font-bold">404</h1>
      <p className="mt-3 text-muted-foreground">Oops! Page not found</p>
      <Link href="/" className="mt-8 border border-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground">Return to Home</Link>
    </div>
  );
}
