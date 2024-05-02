import React from "react";
import AuthorCard from "@components/AuthorCard";
import "@styles/about.css";
import { image } from "d3";
const About = () => {
  const rayan_links = {
    image: "https://i.imgur.com/XHT3ohP.jpeg",
    git: "https://github.com/rayansiingh",
    linkedin: "https://www.linkedin.com/in/rayansiingh/",
    coffee: "",
  };
  const utsav_links = {
    image: "https://avatars.githubusercontent.com/u/64308597?v=4",
    git: "https://github.com/Utsav2505",
    linkedin: "https://www.linkedin.com/in/utsav-maji/",
    coffee: "https://buymeacoffee.com/https://buymeacoffee.com/utsav.maji",
  };
  const kinshuk_links = {
    image: "https://i.imgur.com/fa8EgnQ.jpg",
    git: "",
    linkedin: "https://www.linkedin.com/in/kinshuk-saini-922b90275/",
    coffee: "",
  };
  const nalin_links = {
    image: "",
    git: "",
    linkedin: "",
    coffee: "",
  };
  return (
    <div className="about-container open-sans-400">
      <h1 className="about-head">Designed and Developed by</h1>
      <div className="author-cards">
        <AuthorCard name={"Rayan Singh"} links={rayan_links} />
        <AuthorCard name={"Utsav Maji"} links={utsav_links} />
        <AuthorCard name={"Kinshuk Saini"} links={kinshuk_links} />
        <AuthorCard name={"Kumar Nalin"} links={nalin_links} />
      </div>
    </div>
  );
};

export default About;
