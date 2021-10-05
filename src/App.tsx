import React from 'react';
import { History } from 'history';
import Modal from 'react-modal';
import './App.css';
import GoalsPage from './components/GoalsPage/GoalsPage';
import Goal from './components/Goal/Goal';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

type AppProps = {
    history: History;
}

Modal.setAppElement('#root');
const App = ({history}: AppProps) => {
    return (
        <div className="App">
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={GoalsPage} />
                    <Route path="/goal/:id" component={Goal} />
                </Switch>
            </ConnectedRouter>
        </div>
    );
};

export default App;
