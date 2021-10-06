import React, { FunctionComponent } from 'react';
import DropzoneImg from './DropzoneImg';
import {IDecodedFile} from './decodedFile.interface';
import {IGoal} from '../GoalsPage/goal.interface';

type Props = {
    goal: IGoal;
    updateMoodboard: (a: IGoal, b: string) => void;
};

const AddMoodboardImage: FunctionComponent<Props> = ({ updateMoodboard, goal }: Props) => {
    const handleUploadedImg = (data: IDecodedFile) => {
        updateMoodboard(goal, data.base64 as string);
    };

    return (
        <div className="App">
            <DropzoneImg onChangeData={handleUploadedImg} />
        </div>
    );
};

export default AddMoodboardImage;