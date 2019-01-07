import React, { Component } from 'react';

interface IProps {
  url: string,
}

export default class ApiLabel extends Component<IProps> {
  public render() {
    const { url } = this.props;

    return (
      <div className='ApiLabel'>
        <span className='ApiLabel-caption'>API:</span>
        <span className='ApiLabel-url'>{ url }</span>
      </div>
    );
  }
}
