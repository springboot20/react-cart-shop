/** @format */

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../util/AuthContext';
import IconType from '../icon/IconType';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/product/CartContext';

const navigation = [
  { to: '/', name: 'Home', current: true },
  { to: '/products', name: 'Products', current: true },
  { to: '/check-out', name: 'Check Out', current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const handleActive = ({ isActive }) => {
  return classNames(isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-xl font-medium flex-shrink-0');
};

export default function Example() {
  const { logOut, auth } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate('/signin', { replace: true });
  };

  return (
    <Disclosure as='nav' className='bg-gray-800 fixed top-0 left-0 z-20 right-0'>
      {({ open }) => (
        <>
          <div className='mx-auto px-2 sm:px-2 lg:px-4'>
            <div className='relative flex h-24 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? <XMarkIcon className='block h-10 w-10' aria-hidden='true' /> : <Bars3Icon className='block h-10 w-10' aria-hidden='true' />}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='rgb(139 92 246)' className='h-8 ml-4'>
                    <path d='M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
                  </svg>
                  <span className='logo-name'>Cart Shop</span>
                </div>
                <div className='hidden sm:ml-4 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <NavLink key={item.name} to={item.to} className={handleActive} aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {auth && (
                  <div className='hidden sm:ml-6 sm:block'>
                    <NavLink to='/cart' className='sm:ml-6 flex items-center px-4 py-3 text-sm text-white hover:bg-slate-700 rounded-md transition-all bg-gray-900 lg:mr-6 '>
                      <div className='flex'>
                        <p className='text-xl font-semibold'>Cart</p>
                        <span className='inline-block ml-3 text-xl font-semibold'>{cartItems.length}</span>
                      </div>
                      <IconType iconType={faCartPlus} className='ml-4 text-2xl ' />
                    </NavLink>
                  </div>
                )}

                {!auth && (
                  <div className='hidden sm:block sm:ml-2 px-5 py-3 text-sm text-white hover:bg-slate-700 rounded-md transition-all bg-gray-800 lg:mr-6'>
                    <Link to='/signin' className='font-semibold text-center block'>
                      Sign In
                    </Link>
                  </div>
                )}

                {!auth && (
                  <div className='hidden sm:block sm:ml-2 px-5 py-3 text-sm text-white hover:bg-violet-700 rounded-md transition-all bg-violet-800 lg:mr-6'>
                    <Link to='/signup' className='font-semibold text-center block'>
                      Sign Up
                    </Link>
                  </div>
                )}

                {auth && (
                  <>
                    <button type='button' className='rounded-full mr-4 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-8 w-8 ' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}

                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='sr-only'>Open auth menu</span>
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' className='h-6 fill-white'>
                            <path d='M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z' />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to='/profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Your Profile
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Settings
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to='/signin' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} onClick={handleLogOut}>
                                Sign out
                              </NavLink>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-3 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <NavLink key={item.name} as='a' to={item.to} className={handleActive} aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </NavLink>
              ))}

              {auth && (
                <div className='flex items-center px-4 py-2 text-sm text-white hover:bg-slate-700 p-3 rounded-md transition-all bg-gray-800 lg:mr-6'>
                  <NavLink to='/cart' className='flex'>
                    <p className='text-xl font-semibold'>Cart</p>
                    <span className='inline-block ml-3 text-xl font-semibold'>{cartItems.length}</span>
                  </NavLink>
                  <IconType iconType={faCartPlus} className='ml-4 text-2xl ' />
                </div>
              )}

              {!auth && (
                <div className='px-4 py-2 text-sm text-white hover:bg-violet-700 p-3 rounded-md transition-all  bg-violet-800 lg:mr-6'>
                  <Link to='/signup' className='text-xl font-semibold text-center block'>
                    Sign Up
                  </Link>
                </div>
              )}
              {!auth && (
                <div className='px-4 py-2 text-sm text-white hover:bg-slate-700 p-3 rounded-md transition-all bg-gray-800 lg:mr-6'>
                  <Link to='/signin' className='text-xl font-semibold text-center block'>
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
