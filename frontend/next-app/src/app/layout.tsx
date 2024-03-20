import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../sass/styles.scss';
// Loading the 'Inter' font from Google Fonts, with a subset of 'latin' characters
const inter = Inter({ subsets: ['latin'] });

// Defining metadata for the application
// This metadata is used for SEO and potentially by social media platforms
export const metadata: Metadata = {
    title: 'Bookscanner App',
    description: 'Application for getting info and recommendations for books.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
