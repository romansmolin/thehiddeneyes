import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/shared/ui/card'
import { cn } from '@/shared/lib/css/utils'
import { ReactNode } from 'react'

interface GenericCardProps {
    cardTitle?: string
    cardContent: ReactNode
    cardHeader?: ReactNode
    cardDescription?: string
    cardFooter?: ReactNode
    cardContainerClassName?: string
}

export const GenericCard = ({
    cardTitle,
    cardContent,
    cardHeader,
    cardDescription,
    cardFooter,
    cardContainerClassName,
}: GenericCardProps) => {
    return (
        <Card className={cn(cardContainerClassName)}>
            {(cardTitle || cardHeader) && (
                <CardHeader>
                    {cardHeader ?? (
                        <>
                            <CardTitle>{cardTitle}</CardTitle>
                            {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
                        </>
                    )}
                </CardHeader>
            )}
            <CardContent className="space-y-4">{cardContent}</CardContent>
            {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
        </Card>
    )
}
