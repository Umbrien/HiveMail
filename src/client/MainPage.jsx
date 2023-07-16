import "./Main.css";
import { MainLayout } from "./layouts/MainLayout";

const MainPage = () => {
  return (
    <MainLayout>
      <div className="container">
        <main>
          <div className="logo">
            <img src="/waspLogo.png" alt="wasp" />
          </div>

          <h2 className="welcome-title">
            {" "}
            Welcome to Wasp - you just started a new app!{" "}
          </h2>
          <h3 className="welcome-subtitle">
            This is page <code>MainPage</code> located at route <code>/</code>.
            Open <code>src/client/MainPage.jsx</code> to edit it.
          </h3>

          <div className="buttons">
            <a
              className="button button-filled"
              href="https://wasp-lang.dev/docs/tutorials/todo-app"
              target="_blank"
              rel="noreferrer noopener"
            >
              Take the Tutorial
            </a>
            <a
              className="button button-outline"
              href="https://discord.com/invite/rzdnErX"
              target="_blank"
              rel="noreferrer noopener"
            >
              Chat on Discord
            </a>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
export default MainPage;
