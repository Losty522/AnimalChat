import { FaSignOutAlt, FaHome, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-green-600 text-white">
      <nav className="w-11/12 mx-auto flex justify-between p-4">
        <div>
          <a href="/">
            <FaHome size={24} />
          </a>
        </div>
        <div className="flex space-x-7">
          <a href="/user">
            <FaUser size={24} />
          </a>
          <a href="/logout">
            <FaSignOutAlt size={24} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
