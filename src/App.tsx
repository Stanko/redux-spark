import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getSettings, toggleModal } from './redux/global';

class App extends Component {
  public render() {
    return (
      <div className='App'>
        Redux Generator
        <button onClick={ this.handleGetSettingsClick }>getSettings</button>
        <button onClick={ this.handleToggleModalClick }>toggleModal</button>
      </div>
    );
  }

  private handleGetSettingsClick = () => {
    (this.props as any).dispatch(getSettings())
  }

  private handleToggleModalClick = () => {
    (this.props as any).dispatch(toggleModal())
  }
}

export default connect()(App);
