import { ReactElement } from 'react';

import { BsArrow90DegRight, BsArrow90DegLeft } from 'react-icons/bs';

type Button = {
    icon : ReactElement;
    text : string;
    functionCategory : string;
}

export const buttons: Button[] = [
    {
        icon: <BsArrow90DegRight />,
        text: 'Transfer',
        functionCategory: 'transfer'
    },
    {
        icon: <BsArrow90DegLeft />,
        text: 'Respone',
        functionCategory: 'respone'
    }
]
