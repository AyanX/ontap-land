import React from "react";
import "./Cards.scss";
import db from "../../assets/database-svgrepo-com.svg";
import user from "../../assets/user-svgrepo-com.svg";

// Define the shape of our card data
interface FeatureCard {
  id: string;
  themeColor: string;
  icon: JSX.Element;
  productCount: string;
  title: string;
  tagline: string;
  features: string[];
}

// SVG Icons Components for pixel-perfect rendering
const IconPayroll = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 640 512"
    height="24px"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"></path>
  </svg>
);

const IconHR = () => (
  <img src={db} alt="HR Operations Icon" width="24" height="24" />
);

const IconTalent = () => (
  <img src={user} alt="Talent & Hiring Icon" width="24" height="24" />
);

const IconPerformance = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconWorkforce = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13.5 4.5L6 12L2.5 8.5" />
  </svg>
);

const IconArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 4L13 8L9 12" />
    <path d="M13 8H3" />
  </svg>
);

const cardsData: FeatureCard[] = [
  {
    id: "payroll",
    themeColor: "#00B37E", // Green
    icon: <IconPayroll />,
    productCount: "6 PRODUCTS",
    title: "Payroll & Global",
    tagline: "Pay anyone, anywhere — compliantly",
    features: [
      "Automated payroll processing",
      "Employer of Record (EOR)",
      "Contractor of Record (COR)",
      "PEO services & benefits",
      "Multi-currency support",
    ],
  },
  {
    id: "hr-ops",
    themeColor: "#8B5CF6", // Purple
    icon: <IconHR />,
    productCount: "5 PRODUCTS",
    title: "HR Operations",
    tagline: "Your people data, perfectly organized",
    features: [
      "HRIS & employee records",
      "Benefits administration",
      "Compensation planning",
      "Equity management",
      "Employee surveys & NPS",
    ],
  },
  {
    id: "talent",
    themeColor: "#3B82F6", // Blue
    icon: <IconTalent />,
    productCount: "5 PRODUCTS",
    title: "Talent & Hiring",
    tagline: "Hire, track, and onboard seamlessly",
    features: [
      "AI recruitment & job board",
      "Talent sourcing (800M+ profiles)",
      "Applicant tracking system",
      "Seamless new hire onboarding",
      "Learning & development",
    ],
  },
  {
    id: "performance",
    themeColor: "#EF4444", // Red
    icon: <IconPerformance />,
    productCount: "4 PRODUCTS",
    title: "Performance & Growth",
    tagline: "Develop talent, drive results",
    features: [
      "OKR & KPI goal frameworks",
      "360° performance reviews",
      "AI performance insights",
      "Performance improvement plans",
      "Calibration & ratings",
    ],
  },
  {
    id: "workforce",
    themeColor: "#F97316", // Orange
    icon: <IconWorkforce />,
    productCount: "5 PRODUCTS",
    title: "Workforce Management",
    tagline: "Every team running at its best",
    features: [
      "Biometric attendance & GPS",
      "Task management & tracking",
      "Unified workforce calendar",
      "Employee self-service portal",
      "Asset management",
    ],
  },
];

const Cards: React.FC = () => {
  return (
    <div className="cards-section">
      <div className="cards-container">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="feature-card"
            style={{ "--theme-color": card.themeColor } as React.CSSProperties}
          >
            <div className="card-top-border" />
            <div className="card-content">
              <div className="icon-wrapper">{card.icon}</div>
              <span className="product-count">{card.productCount}</span>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-tagline">{card.tagline}</p>
              <ul className="feature-list">
                {card.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="check-icon">
                      <IconCheck />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
