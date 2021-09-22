import ReactModal from 'react-modal';
import {FunctionComponent, useState} from 'react';

type Props = {
    showModal: boolean,
    toggleCreateGoalModal: (a:boolean) => void,
    saveGoal: (a:string, b: string) => void,
}

const CreateGoal: FunctionComponent<Props> = ({ showModal, toggleCreateGoalModal, saveGoal }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <ReactModal
            style={{
                content: {
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    margin: 'auto',
                    width: '450px',
                    background: '#fff',
                    overflow: 'auto',
                    outline: 'none',
                    padding: '20px',
                    boxShadow: '0 0 30px rgba(153, 153, 153, 0.15)',
                    borderRadius: '15px',
                    border: 'none'
                }
            }}
            isOpen={showModal}
            onRequestClose={() => {toggleCreateGoalModal(false);}}
        >
            <form>
                <h4>New Goal</h4>
                <label>Title</label>
                <input type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea value={description}
                          onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    saveGoal(title, description);
                }}>Save</button>
            </form>
        </ReactModal>
    );
};

export default CreateGoal;