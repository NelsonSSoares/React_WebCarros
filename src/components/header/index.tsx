import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";

export function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow-md mb-4">
      <header className="flex w-full items-center justify-between max-w-7xl px-4 mx-auto">
        <Link to="/">
          <img src={LogoImg} alt="Logo" />
        </Link>
        {!loadingAuth && signed ? (
          <Link to="/dashboard">
            <div className="rounded-full border-2 p-1">
              <FiUser size={22} color="#000" />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="rounded-full border-2 p-1">
              <FiLogIn size={22} color="#000" />
            </div>
          </Link>
        )}
      </header>
    </div>
  );
}
