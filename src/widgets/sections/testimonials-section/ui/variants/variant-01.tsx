import { Star, Twitter } from 'lucide-react'
import { Testimonial } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'

const ProductHuntIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
            fill="#FF6154"
        />
        <path
            d="M10.2 8.4H8.6V10.4H7V5.6H10.2C11.08 5.6 11.8 6.23 11.8 7C11.8 7.77 11.08 8.4 10.2 8.4Z"
            fill="white"
        />
    </svg>
)

interface TestimonialsVariant01Props {
    title?: string
    subtitle?: string
    badge?: string
    testimonials?: Testimonial[]
    className?: string
}

const defaultTestimonials: Testimonial[] = [
    {
        content: (
            <>
                This platform has{' '}
                <span className="bg-yellow-100 px-0.5 rounded">completely transformed</span> how we
                work. Highly recommend!
            </>
        ),
        author: 'David Chen',
        handle: '@davidchen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        platform: 'twitter',
    },
    {
        content: (
            <>
                This is the{' '}
                <span className="bg-yellow-100 px-0.5 rounded">best investment I have made</span>{' '}
                for my business this year. Simple, powerful, and effective.
            </>
        ),
        author: 'Sarah Miller',
        handle: '@sarahmiller',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        platform: 'twitter',
    },
    {
        content: (
            <>
                The interface is intuitive.{' '}
                <span className="bg-yellow-100 px-0.5 rounded">Saved me so much time</span> on
                repetitive tasks.
            </>
        ),
        author: 'Patricia Johnson',
        handle: '@pjbuilds',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
        platform: 'twitter',
    },
    {
        content: (
            <>
                Best <span className="bg-yellow-100 px-0.5 rounded">value for money</span> in the
                market. No competition.
            </>
        ),
        author: 'Michael Roberts',
        handle: '@mroberts',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        platform: 'twitter',
    },
    {
        content: (
            <>
                Using this platform daily has been{' '}
                <span className="bg-yellow-100 px-0.5 rounded">a game changer</span> for our team
                productivity.
            </>
        ),
        author: 'James Martinez',
        handle: '@jamesmartinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        platform: 'twitter',
    },
    {
        content: (
            <>
                We use this tool to streamline our workflow.{' '}
                <span className="bg-yellow-100 px-0.5 rounded">Results speak for themselves</span>{' '}
                -- highly recommended.
            </>
        ),
        author: 'Alex Thompson',
        handle: '@alexthompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        platform: 'twitter',
    },
    {
        content: (
            <>
                Outstanding product at an{' '}
                <span className="bg-yellow-100 px-0.5 rounded">incredible price point</span>.
            </>
        ),
        author: 'Andrei Bogdan',
        handle: '@TheAndreiBogdan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrei',
        platform: 'producthunt',
    },
    {
        content: (
            <>
                Super impressed by the UX. I was{' '}
                <span className="bg-yellow-100 px-0.5 rounded">up and running in minutes</span>.
                Very smooth onboarding.
            </>
        ),
        author: 'Emma Wilson',
        handle: '@emmawilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        platform: 'twitter',
    },
    {
        content: (
            <>
                The easiest solution in its category. Similar platforms are 10x more expensive.{' '}
                <span className="bg-yellow-100 px-0.5 rounded">
                    Every business should consider this
                </span>
                .
            </>
        ),
        author: 'Noah Solomon',
        handle: '@noah_solomon1',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
        platform: 'producthunt',
    },
    {
        content: (
            <>
                Finally made the switch and could not be happier.{' '}
                <span className="bg-yellow-100 px-0.5 rounded">
                    The team built something special
                </span>{' '}
                here.
            </>
        ),
        author: 'Max Richardson',
        handle: '@maxrichardson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
        platform: 'twitter',
    },
]

export const TestimonialsVariant01 = ({
    title = "Trusted by thousands of users. Here's what they are saying.",
    testimonials = defaultTestimonials,
    className,
}: TestimonialsVariant01Props) => {
    return (
        <section
            className={cn('py-24 bg-slate-50 border-y border-slate-200', className)}
            id="testimonials"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {title && (
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 max-w-3xl mx-auto leading-tight">
                            {title}
                        </h2>
                    </div>
                )}

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
                        >
                            {testimonial.image && (
                                <div className="mb-4 rounded-2xl overflow-hidden">
                                    <img
                                        src={testimonial.image}
                                        alt="User result"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex gap-0.5 text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-700 text-[15px] leading-relaxed mb-6 font-medium">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="w-10 h-10 rounded-full bg-slate-100"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 text-sm">
                                            {testimonial.author}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {testimonial.handle}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-slate-400">
                                    {testimonial.platform === 'twitter' ? (
                                        <Twitter className="w-4 h-4 fill-current text-blue-400" />
                                    ) : (
                                        <ProductHuntIcon />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
