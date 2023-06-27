/** @format */

import React from 'react';
import { Card, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from '@material-tailwind/react';
import { UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../util/AuthContext';
import { useNavigate } from 'react-router';

const SideNav = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handlelogout = async () => {
    await logOut();
    navigate('/signin', { replace: true });
  };
  return (
    <Card className='fixed top-20 h-[calc(100vh-5rem)] w-full z-20 rounded-none max-w-[25rem] lg:max-w-[35rem] shadow-none p-4 border-r border-r-gray-800/20'>
      <List>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className='h-5 w-5' />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value='14' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className='h-5 w-5' />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className='h-5 w-5' />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={handlelogout}>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SideNav;
