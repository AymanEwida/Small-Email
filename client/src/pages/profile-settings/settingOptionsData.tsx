import { ReactElement } from 'react';

import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdSecurity } from 'react-icons/md';

type SettingOption = {
    icon : ReactElement;
    title : string;
    desc : string;
    info : string;
}

export const settingOptions: SettingOption[] = [
    {
        icon: <BsFillPersonLinesFill />,
        title: 'Personal Details',
        desc: 'here you can see and adjust your account details.',
        info: 'OPEN_PERSONAL_DETAILS'
    },
    {
        icon: <MdSecurity />,
        title: 'Security',
        desc: 'here you can secure you account by providing 2FA or changing your password.',
        info: 'OPEN_SECURITY'
    }
]