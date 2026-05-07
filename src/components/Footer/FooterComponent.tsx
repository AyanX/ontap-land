import { useState, useEffect } from "react"; 
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Logo from "../../assets/ontap-logo-green.png"; 
import GooglePlayImage from "../../assets/playstore.png";
import AppStoreImage from "../../assets/appstore.png";

const BASE_WEBSITE = "https://ontapke.com"

const API_BASE_URL = "https://main-cms-api.ontapke.com";
const SUBSCRIBE_ENDPOINT = `${API_BASE_URL}/subscribers/api/subscribe/`;
const CHECK_STATUS_ENDPOINT = `${API_BASE_URL}/subscribers/api/check-status/`;

interface SubscribeSuccessResponse { success: boolean; message: string; email: string; status: string; }
interface SubscribeErrorResponse { error?: string; message?: string; }
interface StatusResponse { email: string; status: string; subscribed_at: string; is_active: boolean; }

const footerLinks = {
  Product: [
    { label: "Features", href: `${BASE_WEBSITE}/features` },
    { label: "Pricing", href: `${BASE_WEBSITE}/pricing` },
    { label: "Roadmap", href: `${BASE_WEBSITE}/roadmap` },
    { label: "Updates", href: `${BASE_WEBSITE}/updates` },
    { label: "API", href: `${BASE_WEBSITE}/api` },
  ],
  Solutions: [
    { label: "Enterprise", href: `${BASE_WEBSITE}/solutions/enterprise` },
    { label: "Small Business", href: `${BASE_WEBSITE}/solutions/small-business` },
    { label: "Healthcare", href: `${BASE_WEBSITE}/solutions/healthcare` },
    { label: "Retail", href: `${BASE_WEBSITE}/solutions/retail` },
    { label: "Education", href: `${BASE_WEBSITE}/solutions/education` },
  ],
  Resources: [
    { label: "Documentation", href: `${BASE_WEBSITE}/resources/documentation` },
    { label: "Guides", href: `${BASE_WEBSITE}/resources/guides` },
    { label: "Blog", href: `${BASE_WEBSITE}/resources/blog` },
    { label: "FAQs", href: `${BASE_WEBSITE}/faqs` },
    { label: "Support", href: `${BASE_WEBSITE}/contact` },
  ],
  Company: [
    { label: "About Us", href: `${BASE_WEBSITE}/about` },
    { label: "Careers", href: `${BASE_WEBSITE}/careers` },
    { label: "Press", href: `${BASE_WEBSITE}/press` },
    { label: "Partners", href: `${BASE_WEBSITE}/partners` },
    { label: "Contact", href: `${BASE_WEBSITE}/contact` },
  ],
  Legal: [
    { label: "ODPC Registration", href: `${BASE_WEBSITE}/legal/odpc` },
    { label: "Privacy Policy", href: `${BASE_WEBSITE}/legal/privacy` },
    { label: "Terms of Service", href: `${BASE_WEBSITE}/legal/terms` },
    { label: "Cookie Policy", href: `${BASE_WEBSITE}/legal/cookies` },
    { label: "GDPR", href: `${BASE_WEBSITE}/legal/gdpr` },
    { label: "Compliance", href: `${BASE_WEBSITE}/legal/compliance` },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

const FooterComponent = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const checkSubscriptionStatus = async (emailToCheck: string) => {
    try {
      const res = await fetch(`${CHECK_STATUS_ENDPOINT}?email=${encodeURIComponent(emailToCheck.toLowerCase())}`);
      if (res.ok) { const data: StatusResponse = await res.json(); return data.status === "active"; }
      return false;
    } catch { return false; }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    setIsLoading(true);
    setSubscriptionMessage("");
    try {
      const alreadySubscribed = await checkSubscriptionStatus(email);
      if (alreadySubscribed) {
        setSubscriptionMessage("This email is already subscribed.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
      const data: SubscribeSuccessResponse | SubscribeErrorResponse = await response.json();
      if (response.ok && "success" in data && data.success) {
        setSubscriptionMessage(data.message || "Successfully subscribed!");
        setMessageType("success");
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => { setIsSubscribed(false); setSubscriptionMessage(""); }, 5000);
      } else {
        const msg = "error" in data ? data.error : "message" in data ? data.message : "Failed to subscribe.";
        setSubscriptionMessage(msg || "Failed to subscribe.");
        setMessageType("error");
      }
    } catch {
      setSubscriptionMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{margin:"20px 0 0 0 0 "}}>
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          backgroundColor: "#12ab9b",
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          transform: showScrollTop ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <FaArrowUp className="size-4 text-white" />
      </button>

      <footer className="w-full bg-gray-950 text-gray-400">

        {/* Top bar — newsletter */}
        <div className="border-b border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-sm">
                <h3 className="text-white font-bold text-lg mb-1">Stay in the loop</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Get the latest updates, product news, and HR insights delivered to your inbox.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-72">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#12ab9b]/60 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold whitespace-nowrap transition-all disabled:opacity-60"
                    style={{ backgroundColor: "#12ab9b" }}
                    onMouseEnter={e => { if (!isLoading && !isSubscribed) e.currentTarget.style.backgroundColor = "#f0aa73"; }}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12ab9b")}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </span>
                    ) : isSubscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>

                {subscriptionMessage && (
                  <p className={`mt-2 text-xs ${messageType === "success" ? "text-emerald-400" : "text-red-400"}`}>
                    {subscriptionMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* App download section */}
        <div className="border-b border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Take OnTap with you anywhere</h3>
                <p className="text-sm text-gray-500">Manage your workforce on the go — available soon on iOS and Android.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Google Play */}
                <div className="relative flex items-center gap-4 px-5 py-3.5 rounded-xl bg-gray-800/70 border border-gray-700/60 hover:border-gray-600 transition-all duration-200 cursor-pointer group">
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: "#12ab9b" }}>
                    Coming Soon
                  </span>
                  <img src={GooglePlayImage} alt="Google Play" className="h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Get it on</p>
                    <p className="text-sm font-semibold text-white">Google Play</p>
                  </div>
                </div>

                {/* App Store */}
                <div className="relative flex items-center gap-4 px-5 py-3.5 rounded-xl bg-gray-800/70 border border-gray-700/60 hover:border-gray-600 transition-all duration-200 cursor-pointer group">
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: "#12ab9b" }}>
                    Coming Soon
                  </span>
                  <img src={AppStoreImage} alt="App Store" className="h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Download on the</p>
                    <p className="text-sm font-semibold text-white">App Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main links section */}
        <div className="border-b border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">

              {/* Brand col */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-0 lg:pr-8">
                <img src={Logo} alt="OnTap" className="h-8 mb-5 brightness-0 invert opacity-90" />
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Modern HR operations for forward-thinking organizations.
                </p>

                {/* Contact snippets */}
                <div className="space-y-2.5 text-sm">
                  {[
                    { icon: FaEnvelope, text: "support@belfortech.dev" },
                    { icon: FaPhoneAlt, text: "+254 768 262 704" },
                    { icon: FaMapMarkerAlt, text: "Ngong Road, Nairobi, Kenya" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5 text-gray-500">
                        <Icon className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "#12ab9b" }} />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Socials */}
                <div className="flex gap-2 mt-6">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={i}
                        href={s.href}
                        aria-label={s.label}
                        className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-700 transition-all duration-200"
                      >
                        <Icon className="size-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Link columns */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-white text-sm font-semibold">{category}</h4>
                    {category === "Legal" && (
                      <img src="https://ik.imagekit.io/nal7vhb1y/otap/blue-data%20(1).png?updatedAt=1776886667441" alt="ODPC" className="h-5 opacity-70" />
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                          className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} OnTap by Belfortech. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Status</a>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12ab9b] animate-pulse"></span>
                <span className="text-[#12ab9b]">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default FooterComponent;
