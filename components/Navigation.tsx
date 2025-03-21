// app/components/Navigation.tsx
import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-green-800">
            <div>
              <span className='text-black'>Crowd</span>
              <span className='text-green-800'>Chain</span>
            </div>
          </Link>          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-green-700">Home</Link>
            <Link href="/campaigns" className="hover:text-green-700">Campaigns</Link>
            <Link href="/faqs" className="hover:text-green-700">Faqs</Link>
            <Link href="/campaign/new" className="hover:text-green-700">new campaign</Link>
            <Link href="/dashboard" className="hover:text-green-700">Dashboard</Link>
          </div>
          
          <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation