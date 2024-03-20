import { useAppDispatch } from '@/hooks/state';
import BookRequest from '@/requests/book_requests';
import { openModal, setBook } from '@/state/bookModalSlice';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../public/icons/upload_icon';
import useAPI from '@/hooks/requests/api';

const bookRequest = new BookRequest();

export default function ImageDropzone() {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const [{ response, isLoading, isError }, setRequestConfig] = useAPI(null, null);
    // Redux dispatch function
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check if response is successful and not loading
        if (!isLoading && response && response.status === 200) {
            // Update global modal state with the book data from the response
            dispatch(setBook(response.data));
            // Open the modal
            dispatch(openModal());
            // Clear image preview after each request
            setFiles([]);
        }
    }, [response, isLoading, dispatch]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                ) as (File & { preview: string })[]
            );

            try {
                // Convert the dropped file to base64 encoded string
                const file = acceptedFiles[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // Make API request with base64 encoded string
                    setRequestConfig(
                        bookRequest.search_image(reader.result as string)
                    );
                };
                reader.onerror = (error) => {
                    console.log('Error converting file to base64:', error);
                };
            } catch (error) {
                console.log('Error uploading file:', error);
            }
        },
        accept: {
            'image/*': ['.png']
        },
        multiple: false,
        maxFiles: 1
    });

    const thumbs = files.map((file) => (
        <div key={file.name}>
            <div>
                <Image
                    src={file.preview}
                    alt="Uploaded Image"
                    object-fit="contain"
                    object-position="50% 50%"
                    fill={true}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="image-dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
                <div className="image-dropzone__preview">
                    {/*{imagePreview && ( // Add a conditional check for imagePreview
                        <Image
                            src={imagePreview as string}
                            alt="Uploaded Image"
                            objectFit="contain"
                            objectPosition="50% 50%"
                            fill={true}
                        />
                    )} */}
                    {thumbs}
                </div>
            ) : (
                <div className="image-dropzone__placeholder">
                    <div className="image-dropzone__placeholder__icon">
                        <UploadIcon />
                    </div>
                    <div className="image-dropzone__placeholder__text">
                        <span>Drag and drop or click to upload</span>
                    </div>
                </div>
            )}
        </div>
    );
}