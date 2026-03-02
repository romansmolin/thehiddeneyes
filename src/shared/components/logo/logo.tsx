import { cn } from '@/shared/lib/css/utils'
import React from 'react'

type LogoProps = React.SVGProps<SVGSVGElement>

export const Logo = ({ className, width = 24, height = 24, ...props }: LogoProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(className, 'size-12 rounded-2xl bg-primary p-2')}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" stroke="white" />
                <circle cx="12" cy="12" r="3" stroke="white" />
            </svg>
        </svg>
    )
}
