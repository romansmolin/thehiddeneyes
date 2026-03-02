import { SignUpForm, GoogleSignInButton } from '@/features/auth'
import { GenericCard } from '@/shared/components'

export const SignUpTab = ({ isGoogleAuthAvailable }: { isGoogleAuthAvailable: boolean }) => {
    return (
        <GenericCard
            cardTitle="Create Account"
            cardDescription="Enter your details to create a new account"
            cardContent={
                <>
                    <SignUpForm />
                    {isGoogleAuthAvailable && (
                        <>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <GoogleSignInButton />
                        </>
                    )}
                </>
            }
        />
    )
}
