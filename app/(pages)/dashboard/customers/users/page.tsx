import Card from "@/app/components/cards/card";
import { CardWrapper } from "@/app/components/cards/cardWrapper";
import { Chip } from "@/app/components/common/chip";
import { PageHeader } from "@/app/components/headers/pageHeader";

export default function UsersPage() {
  return (
    <div>
      <section className="page-section">
        <PageHeader name={"Users"}></PageHeader>
        <CardWrapper>
          <Card
            title={"users"}
            icon={"/images/user-icons/users.svg"}
            content={"2,453"}
          ></Card>
          <Card
            title={"Active users"}
            icon={"/images/user-icons/active-users.svg"}
            content={"2,453"}
          ></Card>
          <Card
            title={"users with loans"}
            icon={"/images/user-icons/users-w-loans.svg"}
            content={"12,453"}
          ></Card>
          <Card
            title={"users"}
            icon={"/images/user-icons/users-w-savings.svg"}
            content={"102,453"}
          ></Card>
        </CardWrapper>
      </section>
    </div>
  );
}
