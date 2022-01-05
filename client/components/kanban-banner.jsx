import React from 'react';
import ListForm from './list-form';

export default class KanbanBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ''
    };
  }

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardId}`)
      .then(res => res.json())
      .then(board => this.setState({ board }))
      .catch(err => console.error(err));
  }

  render() {
    const { title } = this.state.board;
    return (
      <div className="mt-5 px-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl leading-6 font-medium text-gray-900">{title}</h2>
        <ListForm />
      </div>
    );
  }
}
