import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import { jsonTreeTheme } from '../../constants/global';

interface IProps {
  reduxState: object,
}

export default class ReduxStoreLog extends Component<IProps> {
  public render() {
    const { reduxState } = this.props;

    return (
      <JSONTree
        hideRoot={ true }
        data={ reduxState }
        invertTheme={ true }
        theme={ jsonTreeTheme }
      />
    );
  }
}
