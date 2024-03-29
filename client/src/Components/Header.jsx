import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  // Log the currentUser and its avatar to the console
  console.log(currentUser);
  console.log(currentUser && currentUser.avatar);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Estate</span>
            <span className='text-slate-700'>Finder</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center '>
          <input
            type='text'
            placeholder='Search....'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className="text-slate-700" />
        </form>

        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              currentUser.avatar && (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full w-8 h-8 object-cover"
                />
              )
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
