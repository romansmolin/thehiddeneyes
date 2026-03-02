import { SignInTab } from './sign-in-tab'
import { SignUpTab } from './sing-up-tab'
import { GenericTabs, TabsListItem } from '@/shared/components'

const GOOGLE_AUTH = false
const authTabsItems: TabsListItem[] = [
    {
        value: 'sign-in',
        label: 'Sign In',
        component: <SignInTab isGoogleAuthAvailable={GOOGLE_AUTH} />,
        dataTestId: 'sign-in-tab',
    },
    {
        value: 'sign-up',
        label: 'Sign Up',
        component: <SignUpTab isGoogleAuthAvailable={GOOGLE_AUTH} />,
        dataTestId: 'sign-up-tab',
    },
]

export function AuthTabs() {
    return <GenericTabs defaultValue={'sign-in'} tabsList={authTabsItems} />
}
