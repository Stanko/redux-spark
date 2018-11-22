import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getSettings, toggleModal } from './redux/global';
import { get, reset } from './redux/users';

class App extends Component {
  public render() {
    return (
      <div className='App'>
        <h3>Redux Generator</h3>
        <button onClick={ this.handleGetSettingsClick }>getSettings</button>
        <button onClick={ this.handleToggleModalClick }>toggleModal</button>

        <button onClick={ this.handleGetClick }>get</button>
        <button onClick={ this.handleResetClick }>reset</button>
        <pre>{ JSON.stringify(this.props, null, 2) }</pre>
      </div>
    );
  }

  private handleGetSettingsClick = () => {
    (this.props as any).dispatch(getSettings())
  }

  private handleToggleModalClick = () => {
    (this.props as any).dispatch(toggleModal())
  }

  private handleGetClick = () => {
    (this.props as any).dispatch(get({ 
      id: 55, 
      options: { details: true } 
    }));
  }

  private handleResetClick = () => {
    (this.props as any).dispatch(reset())
  }
}

export default connect((state:any) => ({
  isModalActive: state.global.isModalActive,
  settings: state.global.settings,
  settingsError: state.global.settingsError,
  settingsLoading: state.global.settingsLoading,

  data: state.users.data,
  loading: state.users.loading,
  error: state.users.error,
  params: state.users.params,
}))(App);
