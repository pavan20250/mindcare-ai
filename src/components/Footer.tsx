export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mobile-grid gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">MindCare AI</h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              AI-powered platform for behavioral health coordination and care delivery.
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Journey</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clinical Scope</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Benefits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; 2024 MindCare AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

