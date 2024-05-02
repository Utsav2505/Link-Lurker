"use client";
import React, { useState, useEffect } from "react";
import "@styles/Navbar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const [services, setServices] = useState(false);
  const [serviceHovered, setServiceHovered] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-links")) {
        setServices(false);
      }
      if (!event.target.closest(".nav-profile")) {
        setProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setProfile(!services);
  };

  const handleProfileOver = () => {
    setProfileHover(true);
  };

  const handleProfileLeave = () => {
    setProfileHover(false);
  };
  const toggleServices = () => {
    setServices(!services);
  };

  const handleMouseOver = () => {
    setServiceHovered(true);
  };

  const handleMouseLeave = () => {
    setServiceHovered(false);
  };
  const router = useRouter();

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => router.push("/")}>
        <img src="./Logo.svg" />
      </div>
      <div className="navbar-links open-sans-500">
        <Link href="/">Home</Link>
        <a
          onClick={toggleServices}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          Services{" "}
          <img
            src="./expand.svg"
            className={serviceHovered ? "arrow-hover" : "arrow"}
          />
        </a>
        <Link href="/about">About us</Link>
      </div>
      {(services || serviceHovered) && (
        <div className="services-menu open-sans-400">
          <Link href="/tool"> Tool </Link>
          <Link href="/"> Extension </Link>
        </div>
      )}
      {!session ? (
        <Link href="/api/auth/signin" className="signin-btn open-sans-500">
          <p>Sign In</p>
        </Link>
      ) : (
        <div
          className="nav-profile"
          onClick={toggleProfile}
          onMouseOver={handleProfileOver}
          onMouseLeave={handleProfileLeave}
        >
          <img src={session.user.image} />
        </div>
      )}
      {profile || profileHover ? (
        <div className="profile-menu open-sans-400">
          <Link href="/dash">Dashboard</Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
