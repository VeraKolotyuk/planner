import React, {FunctionComponent, useState} from 'react';
import DropzoneImg from './DropzoneImg';
import {IDecodedFile} from './decodedFile.interface';

type Props = {

};

const AddMoodboardImage: FunctionComponent<Props> = () => {
    const [image, setImage] = useState<IDecodedFile>({base64: '', file: null});
    const [decoded, setDecoded] = useState(null);

    const handleUploadedImg = (data: IDecodedFile) => {
        setImage(data);
    };
    //
    // const toDataURL = (src: string, callback: (a: string | ArrayBuffer | null) => void) => {
    //     const xhttp = new XMLHttpRequest();
    //
    //     xhttp.onload = function() {
    //         const fileReader = new FileReader();
    //         fileReader.onloadend = function() {
    //             callback(fileReader.result);
    //         };
    //         fileReader.readAsDataURL(xhttp.response);
    //     };
    //
    //     xhttp.responseType = 'blob';
    //     xhttp.open('GET', src, true);
    //     xhttp.send();
    // };
    //
    // toDataURL(image.preview, (dataURL: string | ArrayBuffer | null) => {
    //     //setDecoded(dataURL);
    // });

    return (
        <div className="App">
            <DropzoneImg onChangeData={handleUploadedImg} />
            <div>
                <p><img src={image.base64 as string} /></p>
            </div>
        </div>
    );
};

export default AddMoodboardImage;