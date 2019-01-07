import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { idea } from 'react-syntax-highlighter/dist/styles/hljs';
import ReduxStoreLog from '../../components/ReduxStoreLog/ReduxStoreLog';

interface IProps {
  reduxState: object,
  code: string,
  trigger: any,
}

export default class TabContent extends Component<IProps> {
  public render() {
    const {
      code,
      trigger,
      reduxState,
    } = this.props;

    const TriggerComponent = trigger;

    return (
      <div className='TabContent'>
        <div className='TabContent-code'>
          <h2 className='TabContent-title'>Redux related code</h2>
          <SyntaxHighlighter
            className='TabContent-pre'
            language='javascript'
            style={ idea }
          >
            { code }
          </SyntaxHighlighter>
        </div>
        <div className='TabContent-trigger'>
          <h2 className='TabContent-title TabContent-title--triggers'>Action Triggers</h2>
          <TriggerComponent />
          <div className='TabContent-log'>
            <h2>Redux store</h2>
            <ReduxStoreLog reduxState={ reduxState } />
          </div>
        </div>
      </div>
    );
  }
}
