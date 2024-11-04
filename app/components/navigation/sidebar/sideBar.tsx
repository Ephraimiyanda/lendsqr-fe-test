import { sideBarMenu } from "@/app/assets/constants/sidebarMenuData";
import { SidebarItem } from "./sideBarItem";
import { usePathname } from "next/navigation";
import "../sidebar/sidebarStyles.scss";
import Image from "next/image";
export function Sidebar() {
  return (
    <aside className=" column-container sidebar gap-x-large overflow-auto h-full ">
      <div className="row-container navbar-end-item align-center gap-large">
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
      <div className="sidebar-select-container">
        <div className="row-container gap-small align-center ">
          <Image
            src={"/images/icons/briefcase.svg"}
            alt={"briefcase"}
            width={16}
            height={16}
          ></Image>
          <select name="Switch Organisation" className="sidebar-select">
            <option
              value="Switch Organisation"
              defaultValue={"Switch Organisation"}
            >
              Switch Organisation
            </option>
            <option value="learnSqr">learnSqr</option>
          </select>
        </div>
      </div>
      <div className="sidebar-section">
        <SidebarItem
          icon={"/images/icons/briefcase.svg"}
          name={"Dashboard"}
          href={"/dashboard"}
        />
      </div>
      {sideBarMenu.map((section) => (
        <div key={section.name} className="sidebar-section">
          <p className="header">{section.name}</p>
          {section.menu.map((menu, index: number) => (
            <SidebarItem
              key={index}
              icon={menu.icon}
              name={menu.name}
              href={menu.href}
            />
          ))}
        </div>
      ))}
      <div className="logout-container">
        <button className="logout-button">
          <Image
            src={"/images/icons/log-out.svg"}
            alt={"logout"}
            width={16}
            height={16}
          />
          <p>Logout</p>
        </button>

        <p className="version-text">v1.2.0</p>
      </div>
    </aside>
  );
}
