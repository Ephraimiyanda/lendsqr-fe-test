"use client";
import { PageHeader } from "@/app/components/headers/pageHeader/pageHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SlidingTabs from "@/app/components/tabs/tabs";
import "../../../../../styles/userPageStyles/style.scss";
export default function UserDetails({ params }: { params: { id: string } }) {
  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];
  const router = useRouter();

  const UserProfile = () => {
    return (
      <div className="user-profile">
        <section className="section">
          <h3 className="section-title">Personal Information</h3>
          <div className="info-grid">
            <div>
              <strong>Full Name</strong>
              <p>Grace Effiom</p>
            </div>
            <div>
              <strong>Phone Number</strong>
              <p>07060780922</p>
            </div>
            <div>
              <strong>Email Address</strong>
              <p>grace@gmail.com</p>
            </div>
            <div>
              <strong>BVN</strong>
              <p>07060780922</p>
            </div>
            <div>
              <strong>Gender</strong>
              <p>Female</p>
            </div>
            <div>
              <strong>Marital Status</strong>
              <p>Single</p>
            </div>
            <div>
              <strong>Children</strong>
              <p>None</p>
            </div>
            <div>
              <strong>Type of Residence</strong>
              <p>Parent's Apartment</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Education and Employment</h3>
          <div className="info-grid">
            <div>
              <strong>Level of Education</strong>
              <p>B.Sc</p>
            </div>
            <div>
              <strong>Employment Status</strong>
              <p>Employed</p>
            </div>
            <div>
              <strong>Sector of Employment</strong>
              <p>FinTech</p>
            </div>
            <div>
              <strong>Duration of Employment</strong>
              <p>2 years</p>
            </div>
            <div>
              <strong>Office Email</strong>
              <p>grace@lendsqr.com</p>
            </div>
            <div>
              <strong>Monthly Income</strong>
              <p>₦200,000.00 - ₦400,000.00</p>
            </div>
            <div>
              <strong>Loan Repayment</strong>
              <p>40,000</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Socials</h3>
          <div className="info-grid">
            <div>
              <strong>Twitter</strong>
              <p>@grace_effiom</p>
            </div>
            <div>
              <strong>Facebook</strong>
              <p>Grace Effiom</p>
            </div>
            <div>
              <strong>Instagram</strong>
              <p>@grace_effiom</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">Guarantor</h3>
          <div className="info-grid">
            <div>
              <strong>Full Name</strong>
              <p>Debby Ogana</p>
            </div>
            <div>
              <strong>Phone Number</strong>
              <p>07060780922</p>
            </div>
            <div>
              <strong>Email Address</strong>
              <p>debby@gmail.com</p>
            </div>
            <div>
              <strong>Relationship</strong>
              <p>Sister</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="info-grid">
            <div>
              <strong>Full Name</strong>
              <p>Debby Ogana</p>
            </div>
            <div>
              <strong>Phone Number</strong>
              <p>07060780922</p>
            </div>
            <div>
              <strong>Email Address</strong>
              <p>debby@gmail.com</p>
            </div>
            <div>
              <strong>Relationship</strong>
              <p>Sister</p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const content = [
    <div>{UserProfile()}</div>,
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
                  <p>Grace Effiom</p>
                  <p>LSQFf587g90</p>
                </div>
              </div>
              <div className="column-container justify-center gap-medium profile-block">
                <div>
                  <p>User’s Tier</p>
                  <div className="row-container gap-small">
                    <Image
                      alt="star"
                      src={"/images/icons/star-filled.svg"}
                      width={16}
                      height={16}
                    ></Image>
                    <Image
                      alt="star"
                      src={"/images/icons/star-outline.svg"}
                      width={16}
                      height={16}
                    ></Image>
                    <Image
                      alt="star"
                      src={"/images/icons/star-outline.svg"}
                      width={16}
                      height={16}
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="column-container justify-center gap-medium info-block profile-block">
                <p>₦200,000.00</p>
                <p>9912345678/Providus Bank</p>
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
