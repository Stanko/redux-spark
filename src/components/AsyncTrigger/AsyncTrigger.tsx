import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { getTodoItem } from "../../redux/todo-item";
import ApiLabel from "../Global/ApiLabel";
import Button from '../Global/Button';
import Input from '../Global/Input';

interface IProps {
  getTodoItemAction: (id: string) => void,
}

interface IState {
  todoId: string,
}

class AsyncTrigger extends Component<IProps, IState> {
  public state = {
    todoId: '',
  }

  public render() {
    const { todoId } = this.state;

    return (
      <div className='AsyncTrigger'>
        <ApiLabel url='https://jsonplaceholder.typicode.com/todos/${ userId }' />
        <Input
          id='todo-item-id'
          label='Todo item id'
          placeholder='Enter todo item id'
          value={ todoId }
          onChange={ this.handleChange }
        />
        <Button
          onClick={ this.handleClick }
          label='Get todo item'
        />
      </div>
    );
  }

  private handleChange = (value: string) => {
    this.setState({
      todoId: value,
    });
  }

  private handleClick = () => {
    const { getTodoItemAction } = this.props;
    const { todoId } = this.state;

    getTodoItemAction(todoId);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodoItemAction: (id:string) => dispatch(getTodoItem(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AsyncTrigger);
