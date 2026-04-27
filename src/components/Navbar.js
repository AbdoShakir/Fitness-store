import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../features/products/ProductSlice";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isUserMenuOpen, setisUserMenuOpen] = useState(false);
  const [isBurgerOpen, setisBurgerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.product.searchTerm);


  return (
    <header className="bg-slate-100 text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
      <div className="py-4 bg-slate-100 shadow-md shadow-blue-200/30 border-b border-blue-100">
        <ul className="container mx-auto flex flex-wrap justify-between items-center md:flex-row px-4 md:px-2 relative">
          <button className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden rounded-full bg-slate-900/90 p-2 shadow-lg shadow-slate-950/30">
            <Menu className="text-white" onClick={() => setisBurgerOpen(true)} />
          </button>
          <div
            className={`flex gap-2 md:gap-4 md:w-fit flex-col absolute top-0 left-0 bg-slate-950 md:bg-transparent z-10 transition-all duration-500 ease-in-out md:flex-row md:static w-full px-4 py-4 md:px-0 md:py-0 ${
              isBurgerOpen ? "left-0" : "-left-full"
            } md:left-0 md:top-0 md:w-auto rounded-b-3xl md:rounded-none shadow-2xl md:shadow-none`}
          >
            {navItems.map((item) => (
              <li key={item.path} className="md:px-1">
                <NavLink
                  to={item.path}
                  end
                  onClick={() => setisBurgerOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-black bg-cyan-500/15 border border-cyan-500/30 px-4 py-2 rounded-full"
                      : "font-semibold text-slate-900 hover:text-white hover:bg-slate-800/80 px-4 py-2 rounded-full transition-all duration-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </div>

          {
            <div
              className={`flex flex-col absolute right-4 md:right-4 top-16 z-10 bg-slate-900 text-white p-4 gap-3 rounded-2xl border border-slate-700 shadow-2xl shadow-slate-950/40 transition-all duration-300 ease-in-out ${
                isUserMenuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to={"/"}
                  onClick={() => setisUserMenuOpen(false)}
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  Sign
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  onClick={() => setisUserMenuOpen(false)}
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  My Account
                </Link>
              </li>
            </div>
          }

          <div className="flex items-center gap-3 ml-auto">
            <Link to="/cart" className="rounded-full bg-slate-900/80 p-2 hover:bg-slate-800 transition-all duration-300">
              <ShoppingCart size={28} className="text-white" />
            </Link>
            <User
              size={32}
              className="bg-slate-800 text-white rounded-full transition-all duration-300 cursor-pointer p-2 hover:bg-slate-700 hover:text-cyan-300"
              onClick={() => {
                setisUserMenuOpen(!isUserMenuOpen);
              }}
            />
          </div>
        </ul>
      </div>

      <nav className="flex justify-between items-center container mx-auto md:py-6 py-8 px-2">
        <div className="flex items-center">
          <Link to={"/"} className="py-2 px-4 rounded transition-all duration-300 hover:bg-slate-900">
            <span className="text-black font-extrabold text-3xl tracking-tight">
              Iron<span className="text-cyan-900 text-4xl">Z</span>one
            </span>
          </Link>
        </div>

        <div className="relative">
          {!isSearchOpen ? (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center rounded-full bg-slate-900/80 p-3 hover:bg-slate-800 transition-all duration-300"
            >
              <Search size={28} className="text-white" />
            </button>
          ) : (
            <form className="flex items-center relative">
              <input
                type="text"
                placeholder="Search Product"
                className="bg-slate-900 text-white placeholder-slate-400 rounded-full focus:outline-none py-2 px-4 w-64 pr-10 border border-slate-700"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
