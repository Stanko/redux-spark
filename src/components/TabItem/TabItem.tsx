import React, { Component } from 'react';
import { cx } from '../../utils/global';

interface IProps {
  index: number,
  label: string,
  isActive: boolean,
  clickHandler: (index:number) => void,
}

export default class TabItem extends Component<IProps> {
  public render() {
    const {
      label,
      isActive,
    } = this.props;

    const tabItemClasses = cx({
      'TabItem': true,
      'TabItem--active': isActive,
    });

    return (
      <button
        className={ tabItemClasses }
        onClick={ this.handleClick }
      >
        { label }
      </button>
    );
  }

  private handleClick = () => {
    const {
      index,
      clickHandler,
    } = this.props;

    clickHandler(index);
  }
}
