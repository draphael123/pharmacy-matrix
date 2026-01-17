import './globals.css';

export const metadata = {
  title: 'Pharmacy Matrix | Internal Reference Tool',
  description: 'Internal pharmacy matrix reference for customer service teams - lookup pharmacy, medication, and state coverage information.',
  keywords: ['pharmacy', 'medications', 'TRT', 'HRT', 'GLP', 'reference'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

