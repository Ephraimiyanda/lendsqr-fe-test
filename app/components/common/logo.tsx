import Image from "next/image";
import logo from "../../../public/images/logo.svg";
export function Logo({ size }: { size?: number }) {
  return (
    <Image src={logo} alt="logo" width={size ? size : 173} height={36}></Image>
  );
}
