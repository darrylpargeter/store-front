import React, { Component } from 'react';
import { DateTime } from 'luxon';
import Search from './Search';
import QueryDateResults from './QueryDateResults';
import '../styles/PopUp.css';

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = ({ queryDate: false });
    this.onSubmit = this.onSubmit.bind(this);
    this.toQuery = this.toQuery.bind(this);
  }

  onSubmit(input) {
    const date = DateTime.fromFormat(input, 'dd/MM/yyyy H:mm')
    this.setState({
      queryDate: this.props.shop.queryDate(date),
    });
    console.log(this.props.shop.queryDate(date));
  }

  toQuery() {
    this.setState({ queryDate: false });
  }

  render() {
    const { showSeach, back } = this.props;
    console.log(this.state.queryDate)
    return (
      <div className='popup-wrapper'>
        {showSeach && !this.state.queryDate ? <Search
          back={this.props.back}
          submit={this.onSubmit}
        /> : ''}
        {this.state.queryDate ? <QueryDateResults
          back={this.props.back}
          toQuery={this.toQuery}
          queryDate={this.state.queryDate}
        /> : ''}

      </div>
    );
  }
}
