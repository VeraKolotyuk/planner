import React, { FunctionComponent } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { IDecodedFile } from './decodedFile.interface';

const getColor = (props: {isDragAccept: boolean, isDragReject: boolean, isDragActive: boolean}) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: {isDragAccept: boolean, isDragReject: boolean, isDragActive: boolean}) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

type Props = {
    onChangeData: (a: IDecodedFile) => void
};

const  DropzoneImg: FunctionComponent<Props> = ({onChangeData}: Props) => {
    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent) => {
                const target = event.target as FileReader;
                const data = {base64: target.result, file};
                onChangeData(data);
            };
            reader.readAsDataURL(file);
        }
    });

    return (
        <div className="container">
            <Container
                {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
                <input {...getInputProps()} />
                <p>Drag some files here, or click to select files</p>
            </Container>
        </div>
    );
};

export default DropzoneImg;