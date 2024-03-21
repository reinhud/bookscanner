'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BookPic1 from '../../../../public/images/book_pic_1.svg';
import ActionButton from '../../../components/buttons/signin_button';

export default function Intro() {
    /**
        Component for displaying introductory content.
        Renders an image, a title, a description, and action buttons.
     **/

    // Define router object
    const router = useRouter();

    return (
        <div className="intro">
            {/* Display introductory image */}
            <div className="intro__picture">
                <Image src={BookPic1} alt="BookPic1" />
            </div>

            {/* Display introductory hero content */}
            <div className="intro__hero">
                {/* Display introductory title */}
                <div className="intro__hero__title">
                    Find your next read with Bookscanner! Test 
                </div>
                {/* Display introductory description */}
                <div className="intro__hero__description">
                    We help you get more out of your next trip to the bookstore
                    and bring the info you need into your hands.
                </div>
            </div>

            {/* Display introductory action buttons */}
            <div className="intro__buttons">
                {/* Render Sign Up button */}
                <ActionButton
                    text="Sign Up"
                    type="button"
                    onClick={() => router.push('/signin/signup')}
                />
                {/* Render link to Login page */}
                <Link href="/signin/login">Already have an Account?</Link>
            </div>
        </div>
    );
}
