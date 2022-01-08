import React, { Fragment } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isClick: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  render() {
    const toggleTaskForm = this.state.isClicked ? 'flex items-start' : 'hidden';
    return (
       <>
           <div className={toggleTaskForm}>
             <div className="min-w-0 flex-1">
               <form className="relative">
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder='Enter title...'
                      />
                    </div>
                  </div>

                 <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                   <div className="flex-shrink-0">
                     <button
                       type="submit"
                       className="inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                       Save
                     </button>
                     <XIcon onClick={this.handleClick} className='-ml-1 mr-3 h-8 w-8 text-gray-500 cursor-pointer'/>
                   </div>
                 </div>
               </form>
             </div>
           </div>
           <div className='text-center mt-8'>
             <button
               onClick={this.handleClick}
               className="inline-flex text-center px-20 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
             >
               <PlusIcon className="-ml-1 mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
               Add a Task
             </button>
           </div>
       </>
    );
  }
}
