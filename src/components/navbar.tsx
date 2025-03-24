import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useAuth } from "@/authContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "./ui/hover-card";
import { motion  } from "framer-motion"

export function NavBar() {
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);
  const [isSignUpDropdownOpen, setIsSignUpDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="z-100 h-auto flex justify-between items-center m-4 bg-transparent bg-opacity-80 px-[10%] absolute top-0 left-0 w-full">
      <div>
      <Button 
        variant="link" 
        className="font-[Kanit]-300 font-bold italic text-gray-800 text-md no-underline hover:no-underline"
      >
        <Link 
          to="/" 
          className="no-underline hover:no-underline focus:no-underline active:no-underline"
          style={{ textDecoration: "none" }} // Ensures inline override
        >
          YOUR FIRST MOVE
        </Link>
      </Button>
      </div>

      {/* Mobile Menu Button - only visible on small screens */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Desktop Navigation - hidden on small screens */}
      <div className="hidden md:relative md:flex md:items-center md:space-x-6">
        <div className="relative flex space-x-2">
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
            <Link to="/">Home</Link>
          </Button>
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
            <Link to="/cars/all">Cars</Link>
          </Button>

          {!isAuthenticated() &&
            <HoverCard openDelay={100} closeDelay={100} onOpenChange={(open) => setIsSignInDropdownOpen(open)}>
              <HoverCardTrigger> 
                <div
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-950 transition"
                >
                  <span>Sign In</span>
                  {isSignInDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>         
              </HoverCardTrigger>
              <HoverCardContent className="w-[200px] p-1">
                  <a href="/signin" className="block px-4 py-2 hover:bg-gray-100">
                    Sign In
                  </a>
                  <hr className="border-gray-300" />
                  <a href="/dealer-signin" className="block px-4 py-2 hover:bg-gray-100">
                    Sign In as Dealer
                  </a>
              </HoverCardContent>
            </HoverCard>   
            }
          {!isAuthenticated() &&
            <HoverCard openDelay={100} closeDelay={100} onOpenChange={(open) => setIsSignUpDropdownOpen(open)}>
              <HoverCardTrigger> 
                <div
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-950 transition"
                >
                  <span>Sign Up</span>
                  {isSignUpDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>         
              </HoverCardTrigger>
              <HoverCardContent className="w-[200px] p-1">
                <a href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                  Sign Up
                </a>
                <hr className="border-gray-300" />
                <a href="/dealer-signup" className="block px-4 py-2 hover:bg-gray-100">
                  Sign Up as Dealer
                </a>
              </HoverCardContent>
            </HoverCard>   
            }
        
          {isAuthenticated() &&
            <Button
              variant="outline"
              onClick={() => {
                logout()
                navigate({
                  to: "/"
                })
              }}
              className="bg-blue-900 text-white px-4 py-2 rounded-3xl shadow-md flex items-center justify-between hover:bg-blue-950 transition"
            >
              <span>Log out</span>
            </Button>
          }
        </div>
      </div>

      {/* Mobile Menu - only visible when toggled on small screens */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} // Animates on close
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`absolute top-16 left-0 right-8 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50 rounded-lg  overflow-hidden ${
            isMobileMenuOpen ? "block" : "hidden"
        }`}
        >
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
            <Link to="/">Home</Link>
          </Button>
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
            <Link to="/cars/all">Cars</Link>
          </Button>
          {!isAuthenticated() &&
            <Button
              onClick={() => setIsSignInDropdownOpen(!isSignInDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-blue-800 text-white rounded-lg"
            >
              <span>Sign In</span>
              {isSignInDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          }
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isSignInDropdownOpen ? 1 : 0, y: isSignInDropdownOpen ? 0 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-gray-100 rounded-lg  overflow-hidden ${
            isSignInDropdownOpen ? "block" : "hidden"
        }`}
        >
              <a href="/signin" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                Sign In
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signin" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">
                Sign In as Dealer
              </a>
          </motion.div>
          {!isAuthenticated() &&
            <Button
              variant="outline"
              onClick={() => setIsSignUpDropdownOpen(!isSignUpDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-blue-800 text-white rounded-lg"
            >
              <span>Sign Up</span>
              {isSignUpDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          }
          {isAuthenticated() &&
            <Button
              variant="outline"
              onClick={() => {
                logout()
                navigate({
                  to: "/"
                })
              }}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-950 transition"
            >
              <span>Log out</span>
            </Button>
          }
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isSignUpDropdownOpen ? 1 : 0, y: isSignUpDropdownOpen ? 0 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-gray-100 rounded-lg  overflow-hidden ${
            isSignUpDropdownOpen ? "block" : "hidden"
        }`}
          > 
            <a href="/signup" className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg">
                Sign Up
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signup" className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg">
                Sign Up as Dealer
            </a>
          </motion.div>
        </motion.div>
        )}
      </div>
   
  );
}
