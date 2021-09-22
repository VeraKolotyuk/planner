import React from 'react';
import Modal from 'react-modal';
import './App.css';
import GoalsPage from './components/GoalsPage/GoalsPage';

Modal.setAppElement('#root');
const App: React.FC = () => {
    return (
        <div className="App">
            <GoalsPage />
        </div>
    );
};

export default App;
