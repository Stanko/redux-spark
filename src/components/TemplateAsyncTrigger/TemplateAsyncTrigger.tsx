import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getTodoList, resetTodoList } from "../../redux/todo-list";
import ApiLabel from "../Global/ApiLabel";
import Button from "../Global/Button";

interface IProps {
  getTodoListAction: () => void,
  resetTodoListAction: () => void,
}

class TemplateAsyncTrigger extends Component<IProps> {
  public render() {
    return (
      <div className='TemplateAsyncTrigger'>
        <ApiLabel url='https://jsonplaceholder.typicode.com/todos' />
        <Button
          className='TemplateAsyncTrigger-button'
          onClick={ this.handleGetClick }
          label='Get todo list'
        />
        <Button
          className='TemplateAsyncTrigger-button'
          onClick={ this.handleResetClick }
          label='Reset todo list'
        />
      </div>
    );
  }

  private handleGetClick = () => {
    const { getTodoListAction } = this.props;

    getTodoListAction();
  }

  private handleResetClick = () => {
    const { resetTodoListAction } = this.props;

    resetTodoListAction();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodoListAction: () => dispatch(getTodoList()),
  resetTodoListAction: () => dispatch(resetTodoList()),
});

export default connect(
  null,
  mapDispatchToProps,
)(TemplateAsyncTrigger)
