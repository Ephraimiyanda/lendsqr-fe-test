import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { user } from "@/app/types/userTypes";

// Define the response structure
type ResponseData = {
  message: string;
  data?: user | user[];
  error?: string;
};

// Main API handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Get the path to the JSON file
  const filePath = path.join(process.cwd(), "/public/data", "users.json");

  try {
    // Read and parse the JSON data
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data: user[] = JSON.parse(jsonData);

    const { id } = req.query; // Get the `id` query parameter if present

    // If `id` is provided, filter the data to find the user with that ID
    if (id) {
      const user = data.find((user) => user._id === id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          error: `No user with id ${id} was found`,
        });
      }

      // Return the specific user with a delay for a more realistic response
      setTimeout(() => {
        res
          .status(200)
          .json({ data: user, message: "User retrieved successfully" });
      }, 2000);
    } else {
      // Return all users with a delay if no `id` is specified
      setTimeout(() => {
        res.status(200).json({ data, message: "Data retrieved successfully" });
      }, 2000);
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    //   @ts-ignore
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
