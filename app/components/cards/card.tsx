import Image from "next/image";
interface card {
  title: string;
  icon: string;
  content: string;
}
export default function Card({ title, icon, content }: card) {
  return (
    <div className="card">
      <Image src={icon} alt={title + "icon"} width={100} height={100}></Image>
      <p className="title">{title}</p>
      <p className="content">{content}</p>
    </div>
  );
}
