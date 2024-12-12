import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals and small projects',
    features: [
      'Analyze up to 5 repositories',
      'Basic repository summaries',
      'Star count tracking',
      'Limited API calls'
    ]
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'For professionals and growing projects',
    features: [
      'Analyze up to 50 repositories',
      'Advanced repository insights',
      'Detailed star analytics',
      'Important PR tracking',
      'Version update notifications',
      'Increased API call limit'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations and high-volume needs',
    features: [
      'Unlimited repository analysis',
      'Custom integrations',
      'Advanced analytics and reporting',
      'Dedicated support',
      'SLA guarantees',
      'On-premise deployment options'
    ]
  }
]

export default function Pricing() {
  return (
    <section className="py-20 px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                {index === 2 ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

