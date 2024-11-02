import { sideBarMenu } from "@/app/assets/constants/sidebarMenuData";
import { SidebarItem } from "./sideBarItem";
import { usePathname } from "next/navigation";
import Image from "next/image";
export function Sidebar() {
  return (
    <aside className=" column-container sidebar gap-x-large overflow-auto h-full ">
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
    </aside>
  );
}
