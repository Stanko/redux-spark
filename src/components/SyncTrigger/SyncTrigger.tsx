import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { setTitle, toggleFlag } from "../../redux/global";
import Button from "../Global/Button";
import Input from "../Global/Input";

interface IProps {
  toggleFlagAction: () => void,
  setTitleAction: (title:string) => void,
}

interface IState {
  title: string,
}

class SyncTrigger extends Component<IProps, IState> {
  public state = {
    title: '',
  };

  public render() {
    const { title } = this.state;

    return (
      <div className='SyncTrigger'>
        <Button
          label='Toggle flag'
          onClick={ this.handleToggleClick }
        />
        <Input
          id='title-id'
          label='Title'
          placeholder='Enter title'
          onChange={ this.handleChange }
          value={ title }
        />
        <Button
          label='Set title'
          onClick={ this.handleSetClick }
        />
      </div>
    );
  }

  private handleToggleClick = () => {
    const { toggleFlagAction } = this.props;

    toggleFlagAction();
  }

  private handleChange = (value:string) => {
    this.setState({
      title: value,
    });
  }

  private handleSetClick = () => {
    const { title } = this.state;
    const { setTitleAction } = this.props;

    setTitleAction(title);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFlagAction: () => dispatch(toggleFlag()),
  setTitleAction: (title:string) => dispatch(setTitle(title)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SyncTrigger)
