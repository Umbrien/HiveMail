import { Link, useHistory } from "react-router-dom";
import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";
import { IconAt } from "@tabler/icons-react";
import "../Main.css";

function HeaderLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={to}>
      <h1 className="text-xl2 hover:underline">{children}</h1>
    </Link>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  const { data: user } = useAuth();

  const logoutAndGoHome = async () => {
    await logout();
    history.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex flex-col gap-4 md:flex-row justify-between">
          <Link to="/" className="flex w-min">
            <IconAt />
            <h1 className="text-xl2 font-semibold hover:underline">HiveMail</h1>
          </Link>
          <div className="flex flex-col md:flex-row w-fit gap-2">
            {user && <HeaderLink to="/your-messages">Your messages</HeaderLink>}
            <HeaderLink to="/public-messages">Public messages</HeaderLink>
          </div>
          {user ? (
            <span>
              Hi, {user.email}!{" "}
              <button onClick={logoutAndGoHome} className="text-xl2 underline">
                (Log out)
              </button>
            </span>
          ) : (
            <Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </Link>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow">{children}</main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            HiveMail ~ Powered by{" "}
            <a
              href="https://wasp-lang.dev"
              target="_blank"
              className="text-primary-600"
            >
              Wasp ={"}"}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
