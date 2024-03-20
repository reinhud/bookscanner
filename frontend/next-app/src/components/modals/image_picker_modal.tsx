import { ImagePickerResponse } from 'react-native-image-picker';

export default function ImagePickerModal({
    onImageSelected,
    onClose
}: {
    onImageSelected: (imageData: ImagePickerResponse) => void;
    onClose: () => void;
}) {
    return (
        <div className="image-picker-modal" onClick={onClose}>
            <div className="modal__overlay" onClick={onClose}></div>
            <div className="image-picker-modal__content">
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
                <div className="image-picker-modal__content__title">
                    Select Image
                </div>
                <div className="image-picker-modal__content__buttons">
                    <button>Pick from Library</button>
                    <button>Take a Photo</button>
                </div>
            </div>
        </div>
    );
}
