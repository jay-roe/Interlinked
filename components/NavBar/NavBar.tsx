'use client';

import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '@/types/User';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import SearchBar from '../SearchBar/SearchBar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  // Allow state access in SearchBar component
  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const navLinks = (function navigation(currentUser: User) {
    return currentUser
      ? [
          { name: 'Home', href: '/', current: true },
          { name: 'Feed', href: '/feed', current: false },
        ]
      : [
          { name: 'Home', href: '/', current: true },
          {
            name: 'Login',
            href: '/login',
            dataTestid: 'nav-login',
            current: false,
          },
          { name: 'Register', href: '/register', current: false },
        ];
  })(currentUser);

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="container mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiOutlineXMark
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* // TODO Fix font family for logo */}
                  <h1
                    data-testid="home-interlinked"
                    className="font-logo text-white lg:text-3xl xl:text-4xl"
                  >
                    INTERLINKED
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        data-testid={item.dataTestid}
                        className={classNames(
                          item.href === pathname
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium transition-all'
                        )}
                        aria-current={
                          item.href === pathname ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {currentUser && (
                //when FiSearch button is clicked, the search bar will appear/dissapear
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="mr-2 ml-2 rounded-full bg-gray-800 p-1 text-gray-400 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <span className="sr-only">Search</span>
                    <FiSearch className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Link href="/notifications">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <FiBell className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        data-testid="nav-menu"
                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Open user menu</span>
                        <ImageOptimized
                          className="h-8 w-8 rounded-full"
                          src={currentUser.profilePicture}
                          alt={currentUser.name}
                          width={32}
                          height={32}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              data-testid="nav-menu-profile"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              data-testid="nav-menu-edit-profile"
                              href="/edit-profile"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Edit Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              data-testid="nav-menu-settings"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              data-testid="nav-logout"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
            <div className="mb-2 flex justify-end">
              {/* search bar that appears when search button is clicked*/}
              {showSearch && <SearchBar handleSearch={handleSearch} />}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
