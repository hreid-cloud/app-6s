import { Star, GitPullRequest, BarChart, FileText } from 'lucide-react'

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Repository Summaries',
    description: 'Get concise summaries of any GitHub repository at a glance.'
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Star Analytics',
    description: 'Track star growth and analyze popularity trends over time.'
  },
  {
    icon: <GitPullRequest className="h-6 w-6" />,
    title: 'Important PRs',
    description: 'Stay updated on the most impactful pull requests and changes.'
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: 'Version Insights',
    description: 'Analyze version updates and their impact on the project.'
  }
]

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-6 bg-muted">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Powerful Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

