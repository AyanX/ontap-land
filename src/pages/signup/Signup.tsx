import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import s from "./Signup.module.scss";
import logo from "../../assets/ontap-logo-green.png"


import lock from "../../assets/lock.png";
import mail from "../../assets/mail.png";
import user from "../../assets/person.png";
import building from "../../assets/company.png";
import trendingUp from "../../assets/trending.png";
import users from "../../assets/groups.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast, showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+254",
    companyName: "",
    companyEmail: "",
    password: "",
  });

  const bars = [30, 35, 42, 48, 52, 58, 65, 72, 78, 85, 92];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email address is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim() || formData.phone === "+254") {
      setError("Phone number is required");
      return false;
    }
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!formData.companyEmail.trim()) {
      setError("Company email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      setError("Please enter a valid company email address");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!agreed) {
      setError("You must agree to the Terms & Conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:9000/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      showToast("Account created successfully! Welcome to OnTap.", "success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+254",
        companyName: "",
        companyEmail: "",
        password: "",
      });
      setAgreed(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred during signup";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {/* Left marketing panel */}
      <aside className={s.aside}>
        <div className={`${s.circle} ${s.circleLg}`} />
        <div className={`${s.circle} ${s.circleSm}`} />

        <div className={s.brand}>
          <img src="https://hrms.ontapke.com/images/ontap-logo-white.png" alt="Ontap Logo" />
        </div>

        <div className={s.heroCard}>
          <div className={s.frame}>
            <div className={s.imgWrap}>
              <img src="https://hrms.ontapke.com/images/hero-person.png" alt="Smiling team member at work" loading="lazy" />
              <div className={s.statCard}>
                <div className={s.statIcon}>
                  <img src={users} alt="users" />
                </div>
                <div className={s.statBody}>
                  <div className={s.statHeader}>
                    <p>Team Performance</p>
                    <span className={s.statBadge}>
                      <img src={trendingUp} alt="trending up" /> +15%
                    </span>
                  </div>
                  <p className={s.statSubtitle}>Productivity insights for your workforce</p>
                  <div className={s.bars}>
                    {bars.map((h, i) => (
                      <span key={i} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.tagline}>
          <h2>
            Unified Workforce
            <br />
            Management Platform
          </h2>
          <p>
            Streamline HR operations, manage payroll, track performance, and empower your team—all in one
            powerful platform.
          </p>
        </div>
      </aside>

      {/* Right form panel */}
      <main className={s.main}>
        <div className={s.formWrap}>
          <header className={s.header}>
            <div className={`${s.brand} ${s.brandRight}`}>
               <img src={logo} alt="Ontap Logo" />
            </div> 
          </header>

          <h1 className={s.title}>Start your 30-day free trial.</h1>

          <form className={s.form} onSubmit={handleSubmit}>
            {error && <div className={s.errorMessage}>{error}</div>}
            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label} htmlFor="firstName">First Name</label>
                <div className={s.inputWrap}>
                  <img src={user} alt="user" />
                  <input 
                    id="firstName" 
                    className={s.input} 
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="lastName">Last Name</label>
                <div className={s.inputWrap}>
                  <img src={user} alt="user" />
                  <input 
                    id="lastName" 
                    className={s.input} 
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="email">Email Address</label>
              <div className={s.inputWrap}>
                <img src={mail} alt="mail" />
                <input 
                  id="email" 
                  type="email" 
                  className={s.input} 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="phone">Phone Number</label>
              <div className={s.phone}>
                <button type="button">
                  <span className={s.flag}>🇰🇪</span>
                  <span className={s.caret}>▾</span>
                </button>
                <input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="companyName">Company Name</label>
              <div className={s.inputWrap}>
                <img src={building} alt="building" />
                <input 
                  id="companyName" 
                  className={s.input} 
                  placeholder="e.g KET Limited"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="companyEmail">Company Email</label>
              <div className={s.inputWrap}>
                <img src={mail} alt="mail" />
                <input
                  id="companyEmail"
                  type="email"
                  className={s.input}
                  placeholder="e.g info@company.com"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="password">Password</label>
              <div className={s.inputWrap}>
                <img src={lock} alt="lock" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={s.input}
                  placeholder="Create a Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label className={s.checkRow} htmlFor="showPassword">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>

            <label className={s.checkRow} htmlFor="terms">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the <a href="#">Terms &amp; Conditions</a>
              </span>
            </label>

            <button type="submit" className={s.submit} disabled={!agreed || loading}>
              {loading ? "Creating Account..." : "Get Started"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;