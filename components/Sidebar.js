'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  KeyIcon,
  DocumentTextIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'API Keys', href: '/dashboards', icon: KeyIcon },
  { name: 'API Playground', href: '/playground', icon: BeakerIcon },
  { name: 'Documentation', href: '/docs', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar({ isOpen, onToggle }) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`flex h-full flex-col fixed left-0 top-0 bottom-0 bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo/Brand Section */}
        <div className="flex h-16 items-center px-4 border-b border-gray-700 justify-between">
          <span className={`text-xl font-semibold transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            App6s
          </span>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 mb-1 text-sm font-medium rounded-md transition-colors group ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                title={!isOpen ? item.name : ''}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                  aria-hidden="true"
                />
                <span className={`ml-3 transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0 hidden'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className={`flex-shrink-0 border-t border-gray-700 p-4 ${
          isOpen ? '' : 'hidden'
        }`}>
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium text-white">A6</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">App6s</p>
              <p className="text-xs font-medium text-gray-400">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 