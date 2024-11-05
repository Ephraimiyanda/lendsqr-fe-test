"use client";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/app/components/common/logo/logo";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import signInMan from "../../../../public/images/sign-in-man.svg";
import "../../../styles/pageStyles/loginPageStyles/style.scss";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams?.get("error");

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (error) {
      setLoading(false);
      setErrorMessage("Invalid login details. Please try again.");
    }
  }, [status, error]);

  return (
    <div className="screen-container ">
      <div className="w-full ">
        <div className="center-row-container screen-container ">
          <div className="login-section-container login-section-container-1 shadow ">
            <div className="login-logo-container align-center">
              <Logo />
            </div>

            <div className="login-image-container">
              <Image src={signInMan} alt="sign in man" className="login-img" />
            </div>
          </div>
          <div className="login-section-container justify-center shadow ">
            <div className="login-logo-container login-logo-container-2 align-center">
              <Logo />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                signIn("credentials", {
                  email,
                  password,
                  redirect: true,
                  callbackUrl: "/dashboard",
                }).catch(() => {
                  setLoading(false);
                  setErrorMessage(
                    "Unable to sign in. Please check your credentials."
                  );
                });
              }}
              className="login-form w-full column-container gap-xxl"
            >
              <div className="login-welcome gap-medium">
                <h1>Welcome!</h1>
                <p>Enter details to login</p>
              </div>
              <div className="column-container gap-x-large">
                <div className="column-container gap-large">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  {errorMessage && (
                    <p className="login-error">{errorMessage}</p>
                  )}
                  <Link href="#" className="forgot-password-text">
                    FORGOT PASSWORD?
                  </Link>
                </div>
                <button className="login-button" disabled={loading}>
                  {loading ? "LOGGING IN..." : "LOG IN"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
