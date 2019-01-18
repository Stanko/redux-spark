import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUsersList, resetUsersList } from "../../redux/users-list";
import ApiLabel from "../Global/ApiLabel";
import Button from "../Global/Button";

interface IProps {
  getUsersListAction: () => void,
  resetUsersListAction: () => void,
}

class TemplateAsyncTrigger extends Component<IProps> {
  public render() {
    return (
      <div className='TemplateAsyncTrigger'>
        <ApiLabel url='https://jsonplaceholder.typicode.com/users' />
        <Button
          className='TemplateAsyncTrigger-button'
          onClick={ this.handleGetClick }
          label='Get users list'
        />
        <Button
          className='TemplateAsyncTrigger-button'
          onClick={ this.handleResetClick }
          label='Reset users list'
        />
      </div>
    );
  }

  private handleGetClick = () => {
    const { getUsersListAction } = this.props;

    getUsersListAction();
  }

  private handleResetClick = () => {
    const { resetUsersListAction } = this.props;

    resetUsersListAction();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUsersListAction: () => dispatch(getUsersList()),
  resetUsersListAction: () => dispatch(resetUsersList()),
});

export default connect(
  null,
  mapDispatchToProps,
)(TemplateAsyncTrigger)
