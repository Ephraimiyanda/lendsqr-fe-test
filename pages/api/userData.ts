import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { user } from "@/app/types/userTypes";
import data from "@/public/data/users.json";

type ResponseData = {
  message: string;
  data: user[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const filePath = path.join(process.cwd(), "/public/data", "users.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  console.log(filePath);

  // Introduce a 3-second delay before responding to mimick a real api
  setTimeout(() => {
    res.status(200).json({ data, message: "Data retrieved successfully" });
  }, 2000);
}
