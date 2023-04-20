'use client';
import { FaRegCommentDots } from 'react-icons/fa';
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { User, Admin } from '@/types/User';
import Link from '@/components/Link/Link';
import { usePathname } from 'next/navigation';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import SearchBar from '../SearchBar/SearchBar';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser, currentAdmin, logout } = useAuth();
  const pathname = usePathname();
  const t = useTranslations('NavBar');

  // Allow state access in SearchBar component
  const toggleSearch = () => {
    setShowSearch((curr) => !curr);
  };

  const hideSearch = () => {
    setShowSearch(false);
  };

  const navLinks = (function navigation(
    currentUser: User,
    currentAdmin: Admin
  ) {
    if (currentUser && currentUser.isCompany) {
      return [
        { name: t('home'), href: '/', current: true },
        { name: t('manage-postings'), href: '/manage-jobs', current: false },
      ];
    }
    if (currentUser) {
      return [
        { name: t('home'), href: '/', current: true },
        { name: t('feed'), href: '/feed', current: false },
        { name: t('jobs'), href: '/job-feed', current: false },
      ];
    } else if (currentAdmin) {
      return [{ name: t('reports'), href: '/admin', current: true }];
    } else {
      return [
        { name: t('home'), href: '/', current: true },
        {
          name: t('login'),
          href: '/login',
          dataTestid: 'nav-login',
          current: false,
        },
        { name: t('register'), href: '/register', current: false },
      ];
    }
  })(currentUser, currentAdmin);

  // if user account is not locked or timed out
  if (!currentUser?.accountLocked && !currentUser?.accountTimeout) {
    return (
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="container mx-auto">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">{t('open-main-menu')}</span>
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
                <div className="ml-11 flex flex-1 items-center justify-start sm:ml-0 sm:items-stretch">
                  <div className="flex flex-shrink-0 items-center">
                    {/* // TODO Fix font family for logo */}
                    <h1
                      data-testid="home-interlinked"
                      className="hidden font-logo text-white sm:block lg:text-3xl xl:text-4xl"
                    >
                      INTERLINKED
                    </h1>
                    <ImageOptimized
                      src="/../public/interlinked-logo.ico"
                      alt="interlinked logo"
                      className="sm:block"
                      width={30}
                      height={30}
                    />
                  </div>
                  <LocaleSwitcher />
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navLinks.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={hideSearch}
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
                  <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={toggleSearch}
                    >
                      <span className="sr-only">{t('search')}</span>
                      <FiSearch size={24} aria-hidden="true" />
                    </button>

                    <Link
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 transition-all hover:text-white focus:outline-none "
                      href={'/DM'}
                      onClick={hideSearch}
                      data-testid="nav-dm"
                    >
                      <span className="sr-only">{t('dms')}</span>
                      <FaRegCommentDots size={24} aria-hidden="true" />
                    </Link>

                    <Link
                      href="/notifications"
                      onClick={hideSearch}
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">{t('view-notifications')}</span>
                      <FiBell size={24} aria-hidden="true" />
                    </Link>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button
                          onClick={hideSearch}
                          data-testid="nav-menu"
                          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">{t('open-user-menu')}</span>
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
                            <Link
                              href="/profile"
                              data-testid="nav-menu-profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t('profile')}
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              data-testid="nav-menu-edit-profile"
                              href="/edit-profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t('edit-profile')}
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={logout}
                              data-testid="nav-logout"
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t('logout')}
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
                {/* admin navbar */}
                {currentAdmin && (
                  <div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button
                          data-testid="nav-menu"
                          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">{t('open-user-menu')}</span>
                          <ImageOptimized
                            className="h-8 w-8 rounded-full"
                            src={currentAdmin.profilePicture}
                            alt={currentAdmin.name}
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
                            <button
                              onClick={logout}
                              data-testid="nav-logout"
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t('logout')}
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="mb-2 flex justify-end">
                {/* search bar that appears when search button is clicked*/}
                {showSearch && <SearchBar toggleSearch={toggleSearch} />}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
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
  } else {
    return <div className="p-7" />;
  }
}
