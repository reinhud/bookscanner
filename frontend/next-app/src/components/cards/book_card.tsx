'use client';

import { useAppDispatch } from '@/hooks/state';
import { openModal, setBook } from '@/state/bookModalSlice';
import Image from 'next/image';
import DefaultBookCover from '../../../public/images/default_book_cover.jpg';
import BookType from '../../types/book_type';

export default function BookCard({ book }: { book: BookType }) {
    // Redux dispatch function
    const dispatch = useAppDispatch();

    const handleClick = () => {
        // Set the modal with the latest book data
        dispatch(setBook(book));
        // Open the modal
        dispatch(openModal());
    };

    // Determine the image URL to be rendered
    const imageUrlToRender = book.image_url || DefaultBookCover;

    return (
        <div className="book-card" onClick={handleClick}>
            <div className="book-card__image">
                {/* Display cover picture */}
                <Image
                    src={imageUrlToRender}
                    alt="Default Book Cover"
                    object-fit="contain"
                    object-position="50% 50%"
                    fill={true}
                />
                
            </div>
            <h1 className="book-card__title">{book.title!}</h1>
            <span className="book-modal__seperator"></span>
            <div className="book-card__content">
                <div className="book-card__content__item">
                    <div className="book-card__content__item__label">ISBN:</div>
                    <div className="book-card__content__item__value">
                        {book.isbn13!}
                    </div>
                </div>
                <div className="book-card__content__item">
                    <div className="book-card__content__item__label">
                        Author:
                    </div>
                    <div className="book-card__content__item__value">
                        <div className="book-card__content__item__value__author">
                            {book.authors!.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
