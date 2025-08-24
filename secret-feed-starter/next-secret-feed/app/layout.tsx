export const metadata = {
  title: 'Secret Feed',
  description: 'Anonim dedikodu platformu',
};

import './globals.css';
import Link from 'next/link';

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="tr">
      <body>
        <header className="header">
          <div className="brand">Secret <span>Feed</span></div>
          <nav>
            <Link href="/">Akış</Link>
            <Link href="/submit" className="cta">+ Gönderi</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}