import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTestAsyncData, toggleFlag } from 'src/redux/global';
import './App.css';
import { ITestAsyncData } from "./model";

interface IProps {
  testAsyncData: ITestAsyncData | null,
  testAsyncDataLoading: boolean,
  testAsyncAction: () => any,
  toggleFlagValue: boolean,
  toggleFlagAction: () => any,
}

class App extends Component<IProps> {
  public componentDidMount() {
    const { testAsyncAction } = this.props;

    testAsyncAction();
  }

  public handleToggle = () => {
    const { toggleFlagAction } = this.props;

    toggleFlagAction();
  }

  public render() {
    return (
      <div className='App'>
        <h1>Redux Generator</h1>
        <button onClick={ this.handleToggle }>Toggle</button>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
  testAsyncData: state.global.testAsyncData,
  testAsyncDataLoading: state.global.loading,
  toggleFlagValue: state.global.isActive,
});
const mapDispatchToProps = (dispatch:any) => ({
  testAsyncAction: bindActionCreators(getTestAsyncData, dispatch),
  toggleFlagAction: bindActionCreators(toggleFlag, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

