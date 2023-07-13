import { ReactElement } from 'react';

import { AiFillInstagram , AiFillLinkedin, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';

type SocialMediaLink = {
    link : string,
    icon : ReactElement
}

export const socialMediaLinks: SocialMediaLink[] = [
    {
        link: '#',
        icon: <AiFillInstagram />
    },    
    {
        link: '#',
        icon: <AiFillFacebook />
    },    
    {
        link: '#',
        icon: <AiFillYoutube />
    },
    {
        link: '#',
        icon: <AiFillLinkedin />
    },
]
