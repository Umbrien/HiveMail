import { Link } from "react-router-dom";
import { LoginForm } from "@wasp/auth/forms/Login";

export function LoginPage() {
  return (
    <div className="h-full w-full bg-white">
      <div className="flex min-h-[75vh] min-w-full items-center justify-center">
        <div className="h-full w-full max-w-sm bg-white p-5">
          <div>
            <LoginForm
              logo="/waspLogo.png"
              appearance={{
                colors: {
                  brand: "var(--auth-form-brand)",
                  brandAccent: "var(--auth-form-brand-accent)",
                  submitButtonText: "var(--auth-form-submit-button-text-color)",
                },
              }}
            />
            <br />
            <span className="text-sm font-medium text-gray-500">
              Dont have an account yet?{" "}
              <Link to="/signup" className="underline">
                go to signup
              </Link>
              .
            </span>
            <br />
            <span className="text-sm font-medium text-gray-500">
              Forgot your password?{" "}
              <Link to="/password-reset" className="underline">
                reset it
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
