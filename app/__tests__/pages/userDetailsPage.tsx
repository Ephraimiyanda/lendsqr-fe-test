// userDetails.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserDetails from "../../(pages)/dashboard/customers/users/[id]/page"; // Adjust the path based on your project structure
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
//@ts-ignore
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

describe("UserDetails Page", () => {
  const mockUserDetails = {
    id: "123",
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "123456789",
    userTier: 2,
    bankDetails: {
      accountBalance: 500000,
      accountNumber: "123456789",
      bankName: "Test Bank",
    },
    userDetails: {
      uniqueId: "U12345",
      gender: "Male",
      maritalStatus: "Single",
      children: 0,
      typeOfResidence: "Apartment",
      levelOfEducation: "Bachelor's",
      employmentStatus: "Employed",
      sectorOfEmployment: "Tech",
      durationOfEmployment: "5 years",
      officeEmail: "john.office@example.com",
      monthlyIncome: "50000",
      loanRepayment: "10000",
      socials: [{ name: "LinkedIn", link: "https://linkedin.com" }],
      guarantors: [
        {
          fullName: "Jane Doe",
          phoneNumber: "987654321",
          emailAddress: "jane@example.com",
          relationship: "Spouse",
        },
      ],
    },
  };
  // test-utils.ts
  const mockRouter = () => ({
    back: jest.fn(),
    push: jest.fn(),
  });

  const mockSession = (session: any) => ({
    data: session.isAuthenticated
      ? { user: { name: "test" }, expires: "fake-date" }
      : null,
    status: session.isAuthenticated ? "authenticated" : "unauthenticated",
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter());
    (useSession as jest.Mock).mockReturnValue(
      mockSession({ isAuthenticated: true })
    );
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockUserDetails }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    render(<UserDetails params={Promise.resolve({ id: "123" })} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders user details after fetching", async () => {
    render(<UserDetails params={Promise.resolve({ id: "123" })} />);

    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("displays the User’s Tier with stars", async () => {
    render(<UserDetails params={Promise.resolve({ id: "123" })} />);

    await waitFor(() =>
      expect(screen.getByText("User’s Tier")).toBeInTheDocument()
    );
    expect(screen.getByTestId("user-tier-stars")).toBeInTheDocument();
  });

  it("displays bank details correctly", async () => {
    render(<UserDetails params={Promise.resolve({ id: "123" })} />);

    await waitFor(() =>
      expect(screen.getByText("₦500,000")).toBeInTheDocument()
    );
    expect(screen.getByText("123456789/Test Bank")).toBeInTheDocument();
  });

  it("redirects to login page if user is not authenticated", async () => {
    (useSession as jest.Mock).mockReturnValue(
      mockSession({ isAuthenticated: false })
    );

    render(<UserDetails params={Promise.resolve({ id: "123" })} />);

    await waitFor(() => {
      expect(mockRouter().push).toHaveBeenCalledWith("/auth/login");
    });
  });
});
