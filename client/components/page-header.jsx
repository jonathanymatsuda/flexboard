import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';

export default function PageHeader() {
  return (
    <Disclosure as="nav" className="bg-indigo-600">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <h3 className="font-bold text-white">Flexboard</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
