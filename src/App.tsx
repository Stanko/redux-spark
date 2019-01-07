import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TabWrapper from './components/TabWrapper/TabWrapper';

interface IProps {
  reduxState: object,
}

class App extends Component<IProps> {
  public render() {
    const { reduxState } = this.props;

    return (
      <div className='App'>
        <h1 className='App-title'>Redux Spark Demo</h1>
        <div className='App-content'>
          <TabWrapper reduxState={ reduxState } />
        </div>
      </div>
    );
  }
}

export default connect((state:any) => ({
  reduxState: state,
}))(App);
