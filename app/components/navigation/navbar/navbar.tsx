"use client";
import Link from "next/link";
import { Logo } from "../../common/logo/logo";
import Image from "next/image";
import { useState } from "react";
import { Sidebar } from "../sidebar/sideBar";
import "../navbar/navbarStyles.scss";
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar align-center">
        <div className="flex-1">
          <Logo></Logo>
        </div>
        <div className="flex-1">
          <form action="" className="navbar-searchbar">
            <input type="text" placeholder="Search for anything" />
            <button type="submit">
              <Image
                src={"/images/icons/search.svg"}
                alt={"search icon"}
                width={14}
                height={14}
              ></Image>
            </button>
          </form>
        </div>
        <div className="flex-1">
          <div className="row-container justify-end  align-center gap-xx-large nav-content">
            <Link className="nav-link" href={"#"}>
              Docs
            </Link>
            <div className="row-container navbar-end-item align-center gap-medium">
              <button className="navbar-notification-button">
                <Image
                  src={"/images/icons/notification.svg"}
                  alt={"notification"}
                  width={26}
                  height={26}
                ></Image>
              </button>
              <button className="navbar-button-group">
                <Image
                  src={"/images/avatar.png"}
                  alt={"avatar"}
                  width={48}
                  height={48}
                  className="avatar"
                ></Image>
                <p>Adedeji</p>
                <Image
                  src={"/images/icons/arrow-down-filled.svg"}
                  alt="arrow down"
                  width={20}
                  height={20}
                ></Image>
              </button>
            </div>
            <button
              className="navbar-notification-button menu-button"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <Image
                src={
                  isMenuOpen
                    ? "/images/icons/close.svg"
                    : "/images/icons/hamburger.svg"
                }
                alt={"menu"}
                width={30}
                height={30}
              ></Image>
            </button>
          </div>
        </div>
      </div>
      <div className={`menu ${isMenuOpen ? "open" : "close"}`}>
        <Sidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        ></Sidebar>
      </div>
    </div>
  );
}
