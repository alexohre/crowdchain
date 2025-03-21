import Link from 'next/link'

const Footer = () => {
return (
    <footer className="bg-green-950 text-gray-300 py-12 mt-12">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
            <h3 className="text-xl font-bold text-gray-300 mb-4">CrowdChain</h3>
            <p className='text-gray-300'>Empowering innovation through decentralized crowdfunding on StarkNet</p>
        </div>
        
        <div>
            <h4 className="font-bold mb-3 text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300">Explore Projects</a></li>
            <li><a href="#" className="hover:text-green-300">Start a Project</a></li>
            <li><a href="#" className="hover:text-green-300">About Us</a></li>
            <li><a href="#" className="hover:text-green-300">FAQ</a></li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold mb-3 text-gray-300">Resources</h4>
            <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300 text-gray-300">Documentation</a></li>
            <li><a href="#" className="hover:text-green-300 text-gray-300">Help Center</a></li>
            <li><a href="#" className="hover:text-green-300 text-gray-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-green-300 text-gray-300">Privacy Policy</a></li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold mb-3 text-gray-300">Newsletter</h4>
            <p className="mb-3 text-gray-300">Stay updated with the latest projects</p>
            <div className="flex">
            <input 
                type="email" 
                placeholder="Enter your email"
                className="px-3 py-2 text-gray-600 border border-gray-700 rounded-l-lg focus:outline-none w-full"
            />
            <button className="bg-green-700 px-3 py-2 rounded-r-lg hover:bg-green-600">
                →
            </button>
            </div>
        </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <p className='text-gray-300'>© 2025 CrowdChain. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
            </a>
            <a href="#" className="hover:text-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path 
                    d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.211.375-.444.864-.608 1.25-1.844-.276-3.68-.276-5.486 0a13.23 13.23 0 00-.617-1.25.077.077 0 00-.078-.037c-1.699.405-3.32.953-4.882 1.515a.07.07 0 00-.032.028C.533 9.263-.319 14.09.1 18.861a.082.082 0 00.031.056c2.052 1.507 4.053 2.422 6.005 3.027a.078.078 0 00.084-.028c.465-.635.877-1.303 1.226-2.011a.078.078 0 00-.041-.107 12.16 12.16 0 01-1.746-.835.078.078 0 01-.008-.13c.117-.087.234-.18.344-.276a.078.078 0 01.08-.01c3.674 1.677 7.658 1.677 11.303 0a.078.078 0 01.081.009c.11.097.227.19.344.277a.078.078 0 01-.007.13c-.556.338-1.14.631-1.747.834a.078.078 0 00-.04.108c.36.708.772 1.376 1.226 2.01a.078.078 0 00.084.028c1.962-.605 3.963-1.52 6.006-3.027a.078.078 0 00.031-.056c.5-5.178-.83-9.963-3.549-14.464a.06.06 0 00-.031-.028zM8.02 15.865c-1.18 0-2.147-1.08-2.147-2.41s.951-2.41 2.147-2.41c1.197 0 2.147 1.08 2.147 2.41s-.95 2.41-2.147 2.41zm7.974 0c-1.18 0-2.147-1.08-2.147-2.41s.951-2.41 2.147-2.41c1.197 0 2.147 1.08 2.147 2.41s-.95 2.41-2.147 2.41z"
                />
            </svg>
            </a>
            <a href="#" className="hover:text-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.5 3.5L2.5 10.5C1.67 10.83 1.69 11.54 2.4 11.79L7.3 13.5L17.5 6.5C18 6.2 18.5 6.4 18.1 6.8L9 15.5V19C9 19.5 9.4 19.7 9.8 19.5L12.8 17.3L17 19.5C18 20 18.5 19.7 18.7 18.5L22 5.5C22.3 4.3 22 3.7 21.5 3.5Z"></path>
             </svg>
            </a>
            <a href="#" className="hover:text-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
            </a>
        </div>
        </div>
    </div>
    </footer>
)}

export default Footer