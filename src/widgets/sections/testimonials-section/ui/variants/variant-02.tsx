'use client'

import { motion } from 'motion/react'
import { Testimonial } from '../../model/types'
import { TestimonialsColumn } from '../components/testimonials-column'
import { cn } from '@/shared/lib/css/utils'

interface TestimonialsVariant02Props {
    title?: string
    subtitle?: string
    badge?: string
    testimonials?: Testimonial[]
    className?: string
}

const defaultTestimonials: Testimonial[] = [
    {
        content:
            'This platform revolutionized our operations, streamlining key processes. The cloud-based solution keeps us productive, even remotely.',
        author: 'Briana Patton',
        handle: 'Operations Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Briana',
        platform: 'twitter',
    },
    {
        content:
            'Implementation was smooth and quick. The customizable, user-friendly interface made team training effortless.',
        author: 'Bilal Ahmed',
        handle: 'IT Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal',
        platform: 'twitter',
    },
    {
        content:
            'The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.',
        author: 'Saman Malik',
        handle: 'Customer Support Lead',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saman',
        platform: 'twitter',
    },
    {
        content:
            'Seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.',
        author: 'Omar Raza',
        handle: 'CEO',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
        platform: 'twitter',
    },
    {
        content:
            'Its robust features and quick support have transformed our workflow, making us significantly more efficient.',
        author: 'Zainab Hussain',
        handle: 'Project Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
        platform: 'twitter',
    },
    {
        content:
            'The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.',
        author: 'Aliza Khan',
        handle: 'Business Analyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aliza',
        platform: 'twitter',
    },
    {
        content:
            'Our business functions improved with a user-friendly design and positive customer feedback.',
        author: 'Farhan Siddiqui',
        handle: 'Marketing Director',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan',
        platform: 'twitter',
    },
    {
        content:
            'They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.',
        author: 'Sana Sheikh',
        handle: 'Sales Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sana',
        platform: 'twitter',
    },
    {
        content:
            'Using this platform, our online presence and conversions significantly improved, boosting business performance.',
        author: 'Hassan Ali',
        handle: 'E-commerce Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
        platform: 'twitter',
    },
]

export const TestimonialsVariant02 = ({
    title = 'What our users say',
    subtitle = 'See what our customers have to say about us.',
    badge = 'Testimonials',
    testimonials = defaultTestimonials,
    className,
}: TestimonialsVariant02Props) => {
    const firstColumn = testimonials.slice(0, 3)
    const secondColumn = testimonials.slice(3, 6)
    const thirdColumn = testimonials.slice(6, 9)

    return (
        <section className={cn('bg-background my-20 relative', className)} id="testimonials">
            <div className="container z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                >
                    {badge && (
                        <div className="flex justify-center">
                            <div className="border py-1 px-4 rounded-2xl text-sm font-medium">
                                {badge}
                            </div>
                        </div>
                    )}

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
                        {title}
                    </h2>
                    <p className="text-center mt-5 opacity-75 text-slate-600">{subtitle}</p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn
                        testimonials={secondColumn}
                        className="hidden md:block"
                        duration={19}
                    />
                    <TestimonialsColumn
                        testimonials={thirdColumn}
                        className="hidden lg:block"
                        duration={17}
                    />
                </div>
            </div>
        </section>
    )
}
