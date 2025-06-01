import React from 'react'

export default function FooterDetail() {
  return (
    <footer className="bg-gray-800 text-white w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-m mb-1 md:mb-0">
            © {new Date().getFullYear()} Countries Explorer
          </p>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-s">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-s">Contact</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-s">Privacy</a>
          </div>
        </div>
        <p className="text-gray-500 text-xs text-center mt-1">
          Data from REST Countries API
        </p>
      </div>
    </footer>
  )
}