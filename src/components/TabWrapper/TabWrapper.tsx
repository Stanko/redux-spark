import React, { Component } from "react";
import { config } from "../../constants/global";
import TabContent from "../TabContent/TabContent";
import TabItem from "../TabItem/TabItem";

interface IProps {
  reduxState: object,
}

interface IState {
  activeItemIndex: number,
  content: string,
  trigger: any,
  reducerName: string,
}

export default class TabWrapper extends Component<IProps, IState> {
  public state = {
    activeItemIndex: 0,
    content: config[0].code,
    trigger: config[0].trigger,
    reducerName: config[0].reducerName,
  }

  public render() {
    const { reduxState } = this.props;

    const {
      content,
      trigger,
      reducerName,
    } = this.state;

    return (
      <div className='TabWrapper'>
        <div className='TabWrapper-items'>
          { this.renderItems() }
        </div>
        <TabContent
          reduxState={ reduxState }
          code={ content }
          trigger={ trigger }
          reducerName={ reducerName }
        />
      </div>
    );
  }

  private renderItems() {
    const { activeItemIndex } = this.state;

    return config.map((item, index) => {
      return (
        <TabItem
          key={ item.label }
          index={ index }
          label={ item.label }
          isActive={ activeItemIndex === index }
          clickHandler={ this.handleItemChange }
        />
      );
    });
  }

  private handleItemChange = (nextActiveIndex:number) => {
    this.setState({
      activeItemIndex: nextActiveIndex,
      content: config[nextActiveIndex].code,
      trigger: config[nextActiveIndex].trigger,
      reducerName: config[nextActiveIndex].reducerName,
    });
  }
}
