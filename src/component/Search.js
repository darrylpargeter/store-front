import React, { Component } from 'react';
import '../styles/Search.css'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { input: '' };
  }

  onChange({ target }) {
    const input = target.value;
    this.setState({ input });
  }

  onSubmit() {
      this.props.submit(this.state.input);
  }

  render() {
    const { back } = this.props;
    return(
      <div className='searchWrapper'>
        <div className='search'>
          <h1>Query Shop Opening Times</h1>
          <input
            onChange={this.onChange}
            type='text'
            placeholder='dd/mm/yyyy hh:mm'
            value={this.state.input}
          />
          <input onClick={this.onSubmit} type='button' value='Query' />
        </div>
        <div>
          <h1 className='back' onClick={back}>Back</h1>
        </div>
      </div>
    );
  }
}
