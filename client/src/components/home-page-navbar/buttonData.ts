type Button = {
    bgColor : string,
    text : string,
    special ?: string,
    to : string,
}

export const buttons: Button[] = [
    {
        bgColor: 'none',
        text: 'Sing In',
        special: 'border-1 border-solid color-border hover:bg-gray-900',
        to: '/choose-account'
    },
    {
        bgColor: 'rgb(29 78 216)',
        text: 'Create New Account',
        to: '/register'
    },
]
