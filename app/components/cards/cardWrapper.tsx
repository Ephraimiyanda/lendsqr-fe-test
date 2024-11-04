import "../cards/cardStyles.scss";
import { ReactNode } from "react";

export function CardWrapper({ children }: { children: ReactNode }) {
  return <div className="card-wrapper">{children}</div>;
}
