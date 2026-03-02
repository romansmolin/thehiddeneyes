import { NextRequest, NextResponse } from 'next/server'
import { AppError } from '../errors/app-error'
import { ErrorCode } from '../errors/error-codes'

type AsyncRouteHandler = (
    req: NextRequest,
    context?: { params?: Promise<Record<string, string>> },
) => Promise<NextResponse>

export function asyncHandler(handler: AsyncRouteHandler): AsyncRouteHandler {
    return async (req: NextRequest, context) => {
        try {
            return await handler(req, context)
        } catch (error) {
            console.error('[API Error]', error)

            if (error instanceof AppError) {
                return NextResponse.json(
                    {
                        error: {
                            code: error.code,
                            message: error.message,
                            fields: error.fields,
                        },
                    },
                    { status: error.statusCode },
                )
            }

            return NextResponse.json(
                {
                    error: {
                        code: ErrorCode.INTERNAL_ERROR,
                        message: 'An unexpected error occurred',
                    },
                },
                { status: 500 },
            )
        }
    }
}
