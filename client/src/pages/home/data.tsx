import { ReactElement } from "react"

import { MdWifiOff } from 'react-icons/md';
import { FcSmartphoneTablet } from 'react-icons/fc';

type FetcherData = {
    icon : ReactElement;
    title : string;
    desc : string;
}

export const fetchersData: FetcherData[] = [
    {
        icon: <MdWifiOff />,
        title: 'Be productive even without an internet connection',
        desc: 'Small Email allows you to read messages, reply to them, delete them and search them when you are not connected to the Internet.'
    },
    {
        icon: <FcSmartphoneTablet />,
        title: 'Small Email with you on any device',
        desc: 'You can enjoy the ease of use and simplicity of Small Email anywhere.'
    }
]