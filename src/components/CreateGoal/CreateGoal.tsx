import ReactModal from 'react-modal';
import {FunctionComponent, useState} from 'react';
import styled from 'styled-components';
import Input from '../Template/Input';
import Select from 'react-select';
type Props = {
    showModal: boolean,
    toggleCreateGoalModal: (a:boolean) => void,
    saveGoal: (a:string, b: string) => void,
    wheelSectors: string[]
}

const formField = `
    border: none;
    outline: none;
    background: #f5f5f5;
    padding: .5rem 1rem;
`;

const Form = styled.form`
    display: grid;
    row-gap: 1rem;
`;


const Textarea = styled.textarea`
    ${formField};
    height: 7.5rem;
    font-family: Helvetica, sans-serif;
    resize: none;
`;

const Button = styled.button`
    background: lightseagreen;
    color: white;
    border: none;
    height: 2.5rem;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
`;


const CreateGoal: FunctionComponent<Props> = ({ showModal, toggleCreateGoalModal, saveGoal, wheelSectors }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const options = wheelSectors.map((name: string) => {
        return {'value': name, 'label': name};
    });
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
            <Form>
                <h4>New Goal</h4>
                <Select options={options} />
                <Input type="text"
                       placeholder={'Title'}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={(e) => {
                    e.preventDefault();
                    saveGoal(title, description);
                }}>Save</Button>
            </Form>
        </ReactModal>
    );
};

export default CreateGoal;