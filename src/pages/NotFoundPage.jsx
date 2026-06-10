import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, ArrowRight } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | CarbonWise AI'
  }, [])

  return (
    <div className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4">
      <GlassCard className="max-w-md w-full text-center p-8 sm:p-10 animate-fade-in flex flex-col items-center">
        <div className="inline-flex p-5 rounded-2xl bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-warning)_15%,transparent)] mb-6">
          <FileQuestion className="w-12 h-12 text-[var(--color-warning)]" aria-hidden="true" />
        </div>
        
        <h1 className="heading-xl mb-3">404 - Page Not Found</h1>
        
        <p className="body-sm text-muted mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </p>
        
        <Link to="/" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto">
            Back to Home
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Button>
        </Link>
      </GlassCard>
    </div>
  )
}
