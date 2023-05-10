import { ReactElement } from 'react';

import { RiInboxFill } from 'react-icons/ri';
import { BiSend } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { IoCodeWorking } from 'react-icons/io5'
import { MdOutlineManageAccounts, MdSupervisorAccount } from 'react-icons/md';

type Link = {
    linkIcon : ReactElement,
    linkMeesage : string,
    linkTo : string
}

export const links: Link[] = [
    {
        linkIcon: <RiInboxFill />,
        linkMeesage: 'Inbox',
        linkTo: '/inbox'
    },
    {
        linkIcon: <BiSend />,
        linkMeesage: 'Sent',
        linkTo: '/sent'
    },
    {
        linkIcon: <HiUserGroup />,
        linkMeesage: 'Groups',
        linkTo: '/groups'
    },
    {
        linkIcon: <IoCodeWorking />,
        linkMeesage: 'Workspace',
        linkTo: '/workspace'
    }
]

export const bottomLinks: Link[] = [
    {
        linkIcon: <MdSupervisorAccount />,
        linkMeesage: 'Accounts',
        linkTo: '/choose-account'
    },
    {
        linkIcon: <MdOutlineManageAccounts />,
        linkMeesage: 'Profile Settings',
        linkTo: '/profile-settings'
    },
]
