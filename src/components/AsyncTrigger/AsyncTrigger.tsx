import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { getUser } from "../../redux/user";
import ApiLabel from "../Global/ApiLabel";
import Button from '../Global/Button';
import Input from '../Global/Input';

interface IProps {
  getUserAction: (id: string) => void,
}

interface IState {
  userId: string,
}

class AsyncTrigger extends Component<IProps, IState> {
  public state = {
    userId: '1',
  }

  public render() {
    const { userId } = this.state;

    return (
      <div className='AsyncTrigger'>
        <ApiLabel url={ `https://jsonplaceholder.typicode.com/users/${ userId }` } />
        <Input
          id='user-id'
          label='User id'
          placeholder='Enter user id'
          value={ userId }
          onChange={ this.handleChange }
        />
        <Button
          onClick={ this.handleClick }
          label='Get user'
        />
      </div>
    );
  }

  private handleChange = (value: string) => {
    this.setState({
      userId: value,
    });
  }

  private handleClick = () => {
    const { getUserAction } = this.props;
    const { userId } = this.state;

    getUserAction(userId);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserAction: (id:string) => dispatch(getUser(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AsyncTrigger);
