import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import UserDetails from "../../(pages)/dashboard/customers/users/[id]/page";
import { useRouter } from "next/router";

global.fetch = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("UserDetails Component", () => {
  const mockUser = {
    id: "1",
    name: "John Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    uniqueId: "USER123",
    userDetails: {
      fullName: "John Doe",
      bvn: "12345678901",
      gender: "Male",
      maritalStatus: "Single",
      children: "2",
      typeOfResidence: "Apartment",
      levelOfEducation: "Bachelor’s",
      employmentStatus: "Employed",
      sectorOfEmployment: "Technology",
      durationOfEmployment: "5 years",
      officeEmail: "john.doe@company.com",
      monthlyIncome: "500,000",
      loanRepayment: "20,000",
      socials: [{ name: "LinkedIn", link: "https://linkedin.com/johndoe" }],
      guarantors: [
        {
          fullName: "Jane Smith",
          phoneNumber: "0987654321",
          emailAddress: "jane.smith@example.com",
          relationship: "Friend",
        },
      ],
      userTier: 2,
      accountBalance: 100000,
    },
    bankDetails: {
      accountBalance: 100000,
      accountNumber: "1234567890",
      bankName: "XYZ Bank",
    },
  };

  const mockRouter = {
    back: jest.fn(),
    query: { id: "1" },
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    localStorage.clear();
    fetch.mockClear();
  });

  // Positive Scenario: Load data from local storage if present
  it("loads user data from local storage if available", async () => {
    localStorage.setItem(`user-${mockUser.id}`, JSON.stringify(mockUser));
    useSession.mockReturnValue({
      data: { user: { name: "John" } },
      status: "authenticated",
    });

    render(<UserDetails params={{ id: "1" }} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText("Email: john.doe@example.com")
      ).toBeInTheDocument();
      expect(screen.getByText("USER123")).toBeInTheDocument();
    });
  });

  // Positive Scenario: Fetches user data from the API if not in local storage
  it("fetches user data from API if not in local storage", async () => {
    useSession.mockReturnValue({
      data: { user: { name: "John" } },
      status: "authenticated",
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({ data: mockUser }),
    });

    render(<UserDetails params={{ id: "1" }} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText("Email: john.doe@example.com")
      ).toBeInTheDocument();
    });
  });

  // Negative Scenario: Displays an error if API request fails
  it("displays an error message if the API request fails", async () => {
    useSession.mockReturnValue({
      data: { user: { name: "John" } },
      status: "authenticated",
    });
    fetch.mockRejectedValueOnce(new Error("API error"));

    render(<UserDetails params={{ id: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText(/An error has occured/i)).toBeInTheDocument();
    });
  });

  // Negative Scenario: Redirects to login page if user is not authenticated
  it("redirects to login page if user is not authenticated", () => {
    const redirect = jest.fn();
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<UserDetails params={{ id: "1" }} />);

    expect(redirect).toHaveBeenCalledWith("/auth/login");
  });

  // Negative Scenario: Handles malformed local storage data gracefully
  it("handles malformed data in local storage gracefully", async () => {
    localStorage.setItem(`user-${mockUser.id}`, "{ malformed JSON }");
    useSession.mockReturnValue({
      data: { user: { name: "John" } },
      status: "authenticated",
    });

    render(<UserDetails params={{ id: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled(); // Fallbacks to fetch if local storage data is invalid
    });
  });
});
