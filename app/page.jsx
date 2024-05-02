"use client";
import React from "react";
import Check from "@components/Check";
import { useState, useEffect } from "react";
import "@styles/global.css";

const page = () => {
  return (
    <div>
      <div className="section-1 passion-one-regular">
        <h1>Browse With</h1>
        <Check defaultUrl="" />
        <h1>Confidence</h1>
      </div>
    </div>
  );
};

export default page;
