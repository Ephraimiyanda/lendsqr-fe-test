"use client"
import Image from "next/image";
import Link from "next/link";
import { sidebarItems } from "@/app/types/sideBarTypes";
import { usePathname } from "next/navigation";
export function SidebarItem({ name, href, icon, endContent }: sidebarItems) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`sidebar-item ${pathname === href && "active"}`}
    >
      <Image
        src={icon}
        alt={name + " " + "icon"}
        width={100}
        height={100}
        priority={true}
        className="sidebar-item-image"
      ></Image>

      <p>{name}</p>
      {endContent && (
        <Image
          src={endContent}
          alt={name + " " + "icon"}
          width={16}
          height={16}
        ></Image>
      )}
    </Link>
  );
}
