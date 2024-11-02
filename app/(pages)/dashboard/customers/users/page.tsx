"use client";
import Card from "@/app/components/cards/card";
import { CardWrapper } from "@/app/components/cards/cardWrapper";
import { Chip } from "@/app/components/common/chip";
import { PageHeader } from "@/app/components/headers/pageHeader";
import DashTable from "@/app/components/table/table";
import { user } from "@/app/types/userTypes";
import { useEffect, useState } from "react";
export default function UsersPage() {
  const [data, setData] = useState<user[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetchuser data
  async function fetchUserData() {
    try {
      const data = await fetch("/api/userData");
      const resData = await data.json();
      if (resData) {
        setData(resData.data);
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error("An error has occured :" + error);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

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
        <div>
          <DashTable loading={isLoading} data={data}></DashTable>
        </div>
      </section>
    </div>
  );
}
