import React, { Component } from 'react';
import { cx } from '../../utils/global';

interface IProps {
  className: string,
  id: string,
  placeholder: string,
  label: string,
  value: string,
  onChange: (value:string) => void,
}

export default class Input extends Component<IProps> {
  public static defaultProps = {
    className: '',
    placeholder: '',
  };

  public render() {
    const {
      className,
      id,
      label,
      value,
    } = this.props;

    const inputClasses = cx({
      'Input': true,
      [className]: className,
    });

    return (
      <div className={ inputClasses }>
        <label
          htmlFor={ id }
          className='Input-label'
        >
          { label }
        </label>
        <input
          className='Input-field'
          id={ id }
          onChange={ this.handleChange }
          value={ value }
        />
      </div>
    );
  }

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    onChange(e.currentTarget.value);
  }
}
