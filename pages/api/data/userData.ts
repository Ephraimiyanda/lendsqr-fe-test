import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { user } from "@/app/types/userTypes";

type ResponseData = {
  message: string;
  data: user[];
  userCount: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const filePath = path.join(process.cwd(), "/public/data", "users.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data: user[] = JSON.parse(jsonData);

  // Calculate the additional counts
  const userCount = data.length;
  const activeUsers = data.filter(
    (user) => user.status.toLocaleLowerCase() === "active"
  ).length;
  const usersWithLoans = data.filter((user) => user.withLoan).length; // Assuming hasLoan is a boolean property in user data
  const usersWithSavings = data.filter((user) => user.withSavings).length; // Assuming hasSavings is a boolean property in user data

  // Introduce a 3-second delay before responding to mimic a real API
  setTimeout(() => {
    res.status(200).json({
      data,
      message: "Data retrieved successfully",
      userCount,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    });
  }, 2000);
}
