import { Link } from "@tanstack/react-router"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Your First Move</h2>
            <p className="text-blue-200 max-w-xs">
              Helping you make the right first move in your journey to find the perfect vehicle.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <Link to="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-blue-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-300 mr-2 mt-0.5" />
                <span className="text-blue-200">123 Car Street, Auto City, AC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-300 mr-2" />
                <a href="tel:+11234567890" className="text-blue-200 hover:text-white">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-300 mr-2" />
                <a href="mailto:info@customer.kentlynn.me" className="text-blue-200 hover:text-white">
                  info@yourfirstmove.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-blue-200 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar with copyright and legal links */}
        <div className="border-t border-blue-800 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Your First Move. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-blue-300 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-300 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-blue-300 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

