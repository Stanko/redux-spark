import React, { Component } from 'react';
import { cx } from "../../utils/global";

interface IProps {
  className: string,
  label: string,
  onClick: () => void,
}

export default class Button extends Component<IProps> {
  public static defaultProps = {
    className: '',
  };

  public render() {
    const {
      className,
      label,
      onClick,
    } = this.props;

    const inputClasses = cx({
      'Button': true,
      [className]: className,
    });

    return (
      <button
        className={ inputClasses }
        onClick={ onClick }
      >{ label }
      </button>
    );
  }
}
