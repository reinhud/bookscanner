import HeroSection from './components/hero_section';

export default function Home() {
    /**
        Component for rendering the Home page.
        This page displays the hero section, recently scanned books, and bookmarks.
    */
    

    return (
        <main className="container">
            {/* Display the hero section */}
            <HeroSection />

            {/* Display section header for recently scanned books <SectionHeader
                title="Recently Scanned"
                href="/main/search_history"
            />*/}
            

            {/* Display history section for recently scanned books <HistorySection />*/}
            
            

            {/* Display section header for bookmarks <SectionHeader title="Recommendations" href="/main/recommendations" />*/}
            

            {/* Display book carousel with example book data <BookCarousel />*/}
            
        </main>
    );
}
