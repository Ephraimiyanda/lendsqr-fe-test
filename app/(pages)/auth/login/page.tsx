import Link from "next/link";
import "../../../styles/loginPageStyles/style.scss";
import Image from "next/image";
import { Logo } from "@/app/components/common/logo/logo";
import signInMan from "../../../../public/images/sign-in-man.svg";
export default function Page() {
  return (
    <div className="screen-container ">
      <div className="w-full ">
        <div className="center-row-container screen-container ">
          <div className="login-section-container login-section-container-1 shadow ">
            <div className="login-logo-container align-center">
              <Logo></Logo>
            </div>

            <div className="login-image-container">
              <Image src={signInMan} alt="sign in man" className="login-img" />
            </div>
          </div>
          <div className="login-section-container justify-center shadow ">
            <div className="login-logo-container login-logo-container-2 align-center">
              <Logo></Logo>
            </div>
            <form
              action=""
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
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                  />
                  <Link
                    rel="stylesheet"
                    href="#"
                    className="forgot-password-text"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </div>
                <button className="login-button">LOG IN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
