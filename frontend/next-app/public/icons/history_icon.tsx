export default function HistoryIcon() {
    return (
        <div className="icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="100%" // Set the width and height to adjust the size
                height="100%"
            >
                <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 12a8 8 0 1 0 1.755-5M12 8v4l2.5 2.5M5.754 4.004v3h3"
                />
            </svg>
        </div>
    );
}
