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
        <a className='ApiLabel-url' href={ url } target='_blank'>{ url }</a>
      </div>
    );
  }
}
