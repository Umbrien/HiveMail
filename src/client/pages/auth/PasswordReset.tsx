import { Link } from "react-router-dom";
import { ResetPasswordForm } from "@wasp/auth/forms/ResetPassword";

export function PasswordReset() {
  return (
    <div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>
            <ResetPasswordForm
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
              If everything is okay, <Link to="/login">go to login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
