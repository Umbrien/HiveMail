import { Link } from "react-router-dom";
import { SignupForm } from "@wasp/auth/forms/Signup";

export function SignupPage() {
  return (
    <div className="h-full w-full bg-white">
      <div className="flex min-h-[75vh] min-w-full items-center justify-center">
        <div className="h-full w-full max-w-sm bg-white p-5">
          <div>
            <SignupForm
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
            <span className="text-sm font-medium text-gray-900">
              I already have an account (
              <Link to="/login" className="underline">
                go to login
              </Link>
              ).
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
