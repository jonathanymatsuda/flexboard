import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

export default class BoardListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  render() {
    return (
     <div className='p-8'>
       <div className='text-center mt-5'>
          <h2 className='text-gray-500 text-xs font-medium tracking-wide'>No boards have been created for this workspace. Click the button below to create your first one! </h2>
       </div>
       <div className='text-center mt-6'>
         <a
           href={`#boardform?workspaceId=${this.props.workspaceId}`}
           className="inline-flex items-center text-center px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-black bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
         >
           <PlusIcon className="-ml-1 mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
           Create New Board
         </a>
       </div>
     </div>
    );
  }
}
