import { MouseEventHandler } from "react";

export interface sidebarItems {
  icon: string;
  name: string;
  href: string;
  onLinkClick: MouseEventHandler<HTMLAnchorElement> | undefined;
}
export interface sideBarSection {
  name: string;
  menue?: sidebarItems[];
}
