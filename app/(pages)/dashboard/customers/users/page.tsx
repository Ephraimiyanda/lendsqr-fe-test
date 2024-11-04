"use client";
import Card from "@/app/components/cards/card";
import { CardWrapper } from "@/app/components/cards/cardWrapper";
import { Chip } from "@/app/components/common/chip/chip";
import { PageHeader } from "@/app/components/headers/pageHeader/pageHeader";
import DashTable from "@/app/components/table/table";
import { user } from "@/app/types/userTypes";
import { useEffect, useState } from "react";
interface response {
  data: user[];
  userCount: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}
export default function UsersPage() {
  const [data, setData] = useState<response>();
  const [isLoading, setIsLoading] = useState(true);

  //fetchuser data
  async function fetchUserData() {
    try {
      const data = await fetch("/api/userData");
      const resData = await data.json();
      if (resData) {
        setData(resData);
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
            content={`${data?.userCount ?? 0}`}
          ></Card>
          <Card
            title={"Active users"}
            icon={"/images/user-icons/active-users.svg"}
            content={`${data?.activeUsers ?? 0}`}
          ></Card>
          <Card
            title={"users with loans"}
            icon={"/images/user-icons/users-w-loans.svg"}
            content={`${data?.usersWithLoans ?? 0}`}
          ></Card>
          <Card
            title={"users with savings"}
            icon={"/images/user-icons/users-w-savings.svg"}
            content={`${data?.usersWithSavings ?? 0}`}
          ></Card>
        </CardWrapper>
        <div>
          <DashTable loading={isLoading} data={data?.data}></DashTable>
        </div>
      </section>
    </div>
  );
}
