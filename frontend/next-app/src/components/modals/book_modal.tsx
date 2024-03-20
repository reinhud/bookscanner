'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { closeModal } from '@/state/bookModalSlice';
import Image from 'next/image';
import { useEffect } from 'react';
import CloseCircleIcon from '../../../public/icons/close-circle_icon';
import DefaultBookCover from '../../../public/images/default_book_cover.jpg';

export default function BookModal() {
    const { isVisible, book } = useAppSelector((state) => state.bookModal);
    // Redux dispatch function
    const dispatch = useAppDispatch();

    const handleClose = (event: React.MouseEvent<any>) => {
        event.stopPropagation(); // Stop event propagation to prevent closing the modal when clicking inside the modal content
        dispatch(closeModal());
    }; 

    // Effect to add or remove the active-modal class from the body element for scrolling
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [isVisible]);

    if (!isVisible || !book) return null; // Render nothing if showModal is false or book is null

    // Determine the image URL to be rendered
    const imageUrlToRender = book.image_url || DefaultBookCover;

    return (
        <div className="modal">
            <div className="modal-overlay" onClick={(e) => handleClose(e)}></div>
            <div className="book-modal">
                <div className="book-modal__close-btn" onClick={(e) => handleClose(e)}>
                    <CloseCircleIcon />
                </div>
                <div className="book-modal__image">
                    <Image
                        src={imageUrlToRender}
                        alt="Default Book Cover"
                        objectFit="fill"
                        object-position="50% 50%"
                        fill={true}
                    />
                </div>
                <div className="book-modal__title">{book.title!}</div>
                <span className="book-modal__seperator"></span>
                <div className="book-modal__content">
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">ISBN:</div>
                        <div className="book-modal__content__item__value">{book.isbn13!}</div>
                    </div>
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">Author:</div>
                        <div className="book-modal__content__item__value">
                            {book.authors ? book.authors.join(', ') : ''}
                        </div>
                    </div>
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">Page Count:</div>
                        <div className="book-modal__content__item__value">{book.page_count!}</div>
                    </div>
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">Published Date:</div>
                        <div className="book-modal__content__item__value">{book.published_date!}</div>
                    </div>
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">Categories:</div>
                        <div className="book-modal__content__item__value">
                            {book.categories ? book.categories.join(', ') : ''}
                        </div>
                    </div>
                    <div className="book-modal__content__item">
                        <div className="book-modal__content__item__label">Average Rating:</div>
                        <div className="book-modal__content__item__value">{book.average_rating!}</div>
                    </div>
                    <span className="book-modal__seperator"></span>
                    <div className="book-modal__content__item">
                        <p>{book!.description!}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
