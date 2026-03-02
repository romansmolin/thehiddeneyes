import { cn } from '@/shared/lib/css/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { ReactNode } from 'react'

export type TabsListItem = {
    value: string
    label: string
    component: ReactNode
    icon?: ReactNode
    dataTestId?: string
}

interface GenericTabsProps {
    defaultValue: string
    tabsList: TabsListItem[]
    tabsContentClassName?: string
}

export const GenericTabs = ({ defaultValue, tabsList, tabsContentClassName }: GenericTabsProps) => {
    return (
        <Tabs defaultValue={defaultValue} className="flex flex-col gap-4">
            <TabsList className="flex w-full h-11">
                {tabsList.map((tabItem) => (
                    <TabsTrigger
                        value={tabItem.value}
                        data-testid={tabItem.dataTestId}
                        key={tabItem.value}
                    >
                        {tabItem.icon}
                        {tabItem.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabsList.map((tabContentItem) => (
                <TabsContent
                    key={tabContentItem.value}
                    value={tabContentItem.value}
                    className={cn('', tabsContentClassName)}
                >
                    {tabContentItem.component}
                </TabsContent>
            ))}
        </Tabs>
    )
}
