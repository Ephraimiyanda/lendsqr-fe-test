"use client";
import { PageHeader } from "@/app/components/headers/pageHeader/pageHeader";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import SlidingTabs from "@/app/components/tabs/tabs";
import { use, useEffect, useState } from "react";
import type { UserDetails, user } from "@/app/types/userTypes";
import UserTierStars from "@/app/components/common/tierStars/stars";
import { useSession } from "next-auth/react";
import "../../../../../styles/pageStyles/userPageStyles/style.scss";
export default function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [userData, setUserData] = useState<user>();
  const [isLoading, setIsLoading] = useState(true);
  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];
  const router = useRouter();
  const id = use(params).id;
  const savedUserDetails = localStorage.getItem(`user-${id}`);

  //redirect to login page if not logged in
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  //fetchuser data
  async function fetchUserDetails() {
    try {
      const data = await fetch(`/api/data/userDetails?id=${id}`);
      const resData = await data.json();
      if (resData) {
        setUserData(resData.data);
        localStorage.setItem(`user-${id}`, JSON.stringify(resData.data));
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error("An error has occured :" + error);
    }
  }

  useEffect(() => {
    if (savedUserDetails) {
      setUserData(JSON.parse(savedUserDetails));
      setIsLoading(false);
    } else {
      fetchUserDetails();
    }
  }, []);

  //loading screen
  if (!userData && isLoading) {
    return (
      <div className="row-container justify-center align-center screen-container">
        <p>Loading...</p>
      </div>
    );
  }

  const { phoneNumber, email, uniqueId, userDetails, bankDetails } =
    userData as user;

  const {
    fullName,
    bvn,
    gender,
    maritalStatus,
    children,
    typeOfResidence,
    levelOfEducation,
    employmentStatus,
    sectorOfEmployment,
    durationOfEmployment,
    officeEmail,
    monthlyIncome,
    loanRepayment,
    socials,
    guarantors,
    userTier,
    accountBalance,
  } = userDetails;

  //userDetils tab
  const UserDetailsTab = () => {
    return (
      <div className="user-profile">
        <section className="section">
          <h3 className="section-title">Personal Information</h3>
          <div className="info-grid">
            <div>
              <strong>Full Name</strong>
              <p>{fullName}</p>
            </div>
            <div>
              <strong>Phone Number</strong>
              <p>{phoneNumber}</p>
            </div>
            <div>
              <strong>Email Address</strong>
              <p>{email}</p>
            </div>
            <div>
              <strong>BVN</strong>
              <p>{bvn}</p>
            </div>
            <div>
              <strong>Gender</strong>
              <p>{gender}</p>
            </div>
            <div>
              <strong>Marital Status</strong>
              <p>{maritalStatus}</p>
            </div>
            <div>
              <strong>Children</strong>
              <p>{children}</p>
            </div>
            <div>
              <strong>Type of Residence</strong>
              <p>{typeOfResidence}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Education and Employment</h3>
          <div className="info-grid">
            <div>
              <strong>Level of Education</strong>
              <p>{levelOfEducation}</p>
            </div>
            <div>
              <strong>Employment Status</strong>
              <p>{employmentStatus}</p>
            </div>
            <div>
              <strong>Sector of Employment</strong>
              <p>{sectorOfEmployment}</p>
            </div>
            <div>
              <strong>Duration of Employment</strong>
              <p>{durationOfEmployment}</p>
            </div>
            <div>
              <strong>Office Email</strong>
              <p>{officeEmail}</p>
            </div>
            <div>
              <strong>Monthly Income</strong>
              <p>{monthlyIncome}</p>
            </div>
            <div>
              <strong>Loan Repayment</strong>
              <p>{loanRepayment}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Socials</h3>
          <div className="info-grid">
            {socials?.map((social, index) => (
              <div key={index}>
                <strong>{social.name}</strong>
                <Link href={"#"}>
                  <p>{social.link}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Guarantor</h3>
          {guarantors?.map((guarantor, index) => (
            <section className="section" key={index}>
              <div className="info-grid">
                <div>
                  <strong>Full Name</strong>
                  <p>{guarantor.fullName}</p>
                </div>
                <div>
                  <strong>Phone Number</strong>
                  <p>{guarantor.phoneNumber}</p>
                </div>
                <div>
                  <strong>Email Address</strong>
                  <p>{guarantor.emailAddress}</p>
                </div>
                <div>
                  <strong>Relationship</strong>
                  <p>{guarantor.relationship}</p>
                </div>
              </div>
            </section>
          ))}
        </section>
      </div>
    );
  };

  const content = [
    <div>{UserDetailsTab()}</div>,
    <div className="user-profile">This is the Documents view</div>,
    <div className="user-profile">This is the Bank Details view</div>,
    <div className="user-profile">This is the Loans view</div>,
    <div className="user-profile">This is the Savings view</div>,
    <div className="user-profile">This is the App and System view</div>,
  ];

  return (
    <div>
      <section className="page-section">
        <div>
          <button
            onClick={() => {
              router.back();
            }}
            className="back-button"
          >
            <Image
              src="/images/icons/long-arrow.svg"
              alt="vertical-dots"
              width={30}
              height={30}
            />
            <p>Back to Users</p>
          </button>
        </div>
        <div className="user-details-header">
          <PageHeader name={"User Details"}></PageHeader>
          <div className="user-details-action-buttons">
            <button>Blacklist User</button>
            <button>Activate User</button>
          </div>
        </div>
        <section className="user-details-section">
          <div className="profile-section-container">
            <div className="profile-section row-container gap-medium ">
              <div className="row-container gap-large justify-center align-center info-block">
                <Image
                  src={"/images/no-avatar.png"}
                  alt="avatar"
                  width={100}
                  height={100}
                ></Image>
                <div className="column-container gap-medium profile-block">
                  <p>{fullName}</p>
                  <p className="user-tag">{uniqueId}</p>
                </div>
              </div>
              <div className="column-container justify-center gap-medium profile-block">
                <div>
                  <p>User’s Tier</p>
                  <UserTierStars userTier={userTier ?? 1} />
                </div>
              </div>
              <div className="column-container justify-center gap-medium info-block profile-block">
                <p>{bankDetails.accountBalance.toLocaleString()}</p>
                <p>
                  {bankDetails.accountNumber}/{bankDetails.bankName}
                </p>
              </div>
            </div>
          </div>
          <div className="tabs">
            <SlidingTabs tabs={tabs} content={content} />
          </div>
        </section>
      </section>
    </div>
  );
}
UserDetails.auth = true;
