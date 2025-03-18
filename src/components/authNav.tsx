import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AuthNavBar() {
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);
  const [isSignUpDropdownOpen, setIsSignUpDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-auto flex justify-between items-center m-4 bg-transparent bg-opacity-80 px-[10%] absolute top-0 left-0 w-full">
      <div>
        <span className="font-[Kanit]-300 font-bold italic text-gray-800 text-md">
          YOUR FIRST MOVE
        </span>
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
        <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
          <Link to="/">Home</Link>
        </Button>
        <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition">
          <Link to="/cars/all">Cars</Link>
        </Button>
        <div className="relative flex space-x-2">
          <Button
            onClick={() => setIsSignInDropdownOpen(!isSignInDropdownOpen)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-950 transition"
          >
            <span>Sign In</span>
            {isSignInDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          {isSignInDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 text-gray-900">
              <a href="/signin" className="block px-4 py-2 hover:bg-gray-100">
                Sign In
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signin" className="block px-4 py-2 hover:bg-gray-100">
                Sign In as Dealer
              </a>
            </div>
          )}
          <Button
            onClick={() => setIsSignUpDropdownOpen(!isSignUpDropdownOpen)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-950 transition"
          >
            <span>Sign Up</span>
            {isSignUpDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          {isSignUpDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 text-gray-900">
              <a href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                Sign Up
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signup" className="block px-4 py-2 hover:bg-gray-100">
                Sign Up as Dealer
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - only visible when toggled on small screens */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50">
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition justify-start">
            Home
          </Button>
          <Button variant={"link"} className="text-gray-600 font-semibold hover:text-gray-900 transition justify-start">
            Car Dealer Locations
          </Button>
          <Button
            onClick={() => setIsSignInDropdownOpen(!isSignInDropdownOpen)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-950 transition"
          >
            <span>Sign In</span>
            {isSignInDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          {isSignInDropdownOpen && (
            <div className="bg-gray-100 rounded-lg">
              <a href="/signin" className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg">
                Sign In
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signin" className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg">
                Sign In as Dealer
              </a>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => setIsSignUpDropdownOpen(!isSignUpDropdownOpen)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-950 transition"
          >
            <span>Sign Up</span>
            {isSignUpDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          {isSignUpDropdownOpen && (
            <div className="bg-gray-100 rounded-lg">
              <a href="/signup" className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg">
                Sign Up
              </a>
              <hr className="border-gray-300" />
              <a href="/dealer-signup" className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg">
                Sign Up as Dealer
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
