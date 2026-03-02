type QueryError = {
    data?: {
        message?: string
    }
    message?: string
    error?: string
}

export const getGiftsQueryErrorMessage = (error: unknown): string => {
    if (!error) return 'Something went wrong. Please try again.'

    const queryError = error as QueryError
    return (
        queryError.data?.message ??
        queryError.message ??
        queryError.error ??
        'Something went wrong. Please try again.'
    )
}
