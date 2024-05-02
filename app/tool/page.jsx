"use client";
import React from "react";
import Check from "@components/Check";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@styles/Tool.css";
import LoaderSTD from "@components/Loader_std";
import { set } from "mongoose";
import StarRating from "@components/StarRating";
import Report from "@components/Report";

const Tool = () => {
  // let created = "";
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  // loaders
  const [domain_analysis_loading, setdomain_analysis_loading] = useState(true);
  const [blacklist_loading, setblacklist_loading] = useState(true);
  const [prediction_loading, setPrediction_loading] = useState(true);

  // domain analysis hooks
  const [created, setCreated] = useState("none");
  const [domain, setDomain] = useState("none");
  const [domain_age, setDomainAge] = useState(0);
  const [https, setHttps] = useState("none");
  const [csp_headers, setCspHeaders] = useState("none");
  const [hsts_enabled, setHstsEnabled] = useState("none");
  const [security_headers, setSecurityHeaders] = useState(0);
  //database check hooks
  const [blacklisted, setBlacklisted] = useState("NO");
  //prediction hooks
  const [prediction, setPrediction] = useState("NO");
  //domain analysis score hooks
  const [domain_analysis_score, setDomainAnalysisScore] = useState(0);
  // Final Result
  const [final_result, setFinalResult] = useState("Safe");
  const [threat_level, setThreatLevel] = useState("Low");
  //report form
  const [showReport, setShowReport] = useState(false);

  //fetch server
  //domain analysis
  async function analyzeUrl(url) {
    try {
      const response = await fetch(
        "https://911ffd65-9b3d-4410-92f5-30e4f454e604-00-3s0w6hmdx3ojm.pike.replit.dev/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error analyzing URL:", error);
      // Handle error appropriately
      return { error: "An error occurred while analyzing the URL." };
    }
  }

  //blacklist check
  async function blacklist_check(url) {
    try {
      const response = await fetch(
        "https://911ffd65-9b3d-4410-92f5-30e4f454e604-00-3s0w6hmdx3ojm.pike.replit.dev/database_search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error analyzing URL:", error);
      // Handle error appropriately
      return { error: "An error occurred while analyzing the URL." };
    }
  }
  //prediction
  async function algo_check(url) {
    try {
      const response = await fetch(
        "https://911ffd65-9b3d-4410-92f5-30e4f454e604-00-3s0w6hmdx3ojm.pike.replit.dev/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error analyzing URL:", error);
      // Handle error appropriately
      return { error: "An error occurred while analyzing the URL." };
    }
  }
  useEffect(() => {
    if (url) {
      analyzeUrl(url)
        .then((result) => {
          let score = 0;
          console.log("Analysis result:", result);
          setdomain_analysis_loading(false);
          setCreated(result["creation_date"]);
          setDomain(result["domain"]);
          let age = result["domain_age_in_days"];
          if (age < 200) {
            score += 1;
          }
          setDomainAge(age);
          if (result["uses_https"]) {
            score += 1;
          }
          setHttps(result["uses_https"] ? "YES" : "NO");
          if (result["has_csp_header"] == "YES") {
            score += 1;
          }
          setCspHeaders(result["has_csp_header"]);
          if (result["has_hsts"]) {
            score += 1;
          }
          setHstsEnabled(result["has_hsts"]);
          let security_headers =
            (result["has_x_content_type_options"] === "YES" ? 1 : 0) +
            (result["has_x_frame_options"] === "YES" ? 1 : 0);
          if (security_headers === 2) {
            score += 1;
          } else if (security_headers === 1) {
            score += 0.5;
          }
          setSecurityHeaders(security_headers);
          setDomainAnalysisScore(score);

          // Do something with the result
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      blacklist_check(url)
        .then((result) => {
          setblacklist_loading(false);
          console.log("Blacklist result:", result);
          if (result["found_in_database"]) {
            console.log("Blacklisted");
            setBlacklisted("YES");
          } else {
            setBlacklisted("NO");
          }
          // Do something with the result
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      algo_check(url)
        .then((result) => {
          setPrediction_loading(false);
          // console.log("Blacklist result:", result);
          if (result["algo_check"] == "['bad']") {
            console.log("Blacklisted");
            setPrediction("Suspicious");
          } else {
            setPrediction("Safe");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("URL not available.");
    }
  }, [url]);

  useEffect(() => {
    if (blacklisted == "YES") {
      setFinalResult("Unsafe");
      setThreatLevel("High");
    } else if (
      blacklisted == "NO" &&
      prediction == "Suspicious" &&
      domain_analysis_score < 3
    ) {
      setFinalResult("Unsafe");
      setThreatLevel("High");
    } else if (
      blacklisted == "NO" &&
      prediction == "Suspicious" &&
      domain_analysis_score >= 3
    ) {
      setFinalResult("Safe");
      setThreatLevel("Medium");
    } else if (
      blacklisted == "NO" &&
      prediction == "Safe" &&
      domain_analysis_score >= 3
    ) {
      setFinalResult("Safe");
      setThreatLevel("Low");
    } else {
      setFinalResult("Safe");
      setThreatLevel("Low");
    }
  }, [blacklisted, prediction, domain_analysis_score]);
  function isValidURL(url) {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return urlPattern.test(url);
  }

  useEffect(() => {
    if (searchParams.get("url")) {
      setUrl(searchParams.get("url"));
      console.log("URL:", searchParams.get("url"));
    } else {
      setUrl("");
    }
  }, []);

  const router = useRouter();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // router.refresh();
    setUrl(searchParams.get("url"));
    console.log("URL:", searchParams.get("url"));
  };

  return (
    <>
      <div className="section-1-tool" onChange={handleSearchSubmit}>
        <Check defaultUrl={url} onChange={handleSearchSubmit} />
      </div>
      {showReport ? (
        <div className="report-bkgrnd">
          <div className="report-container">
            <div className="close-btn" onClick={() => setShowReport(false)}>
              <i class="fa-solid fa-xmark" style={{ color: "#59e32a" }}></i>
            </div>
            <h1>Report</h1>

            <div className="url-box open-sans-200">
              <div className="url-label">URL :</div>
              <div className="url-to-report">{url}</div>
            </div>
            <div></div>
          </div>
        </div>
      ) : null}
      {url !== "" ? (
        <div className="section-2 open-sans-200">
          <div className="checklist">
            <div className="check-1">
              BlackList
              {blacklist_loading ? (
                <div className="checklist-loader">
                  <LoaderSTD />
                </div>
              ) : (
                <div
                  className={
                    blacklisted == "YES"
                      ? "side-tags unsafe open-sans-400"
                      : "side-tags safe open-sans-400"
                  }
                >
                  {blacklisted}
                </div>
              )}
            </div>
            <div className="check-1">
              Prediction
              {prediction_loading ? (
                <div className="checklist-loader">
                  <LoaderSTD />
                </div>
              ) : (
                <div
                  className={
                    prediction == "Safe"
                      ? "side-tags safe open-sans-400"
                      : "side-tags suspicious open-sans-400"
                  }
                >
                  {prediction}
                </div>
              )}
            </div>

            <div className="check-2">
              <div>
                Domain Analysis
                {domain_analysis_loading ? (
                  <div className="checklist-loader">
                    <LoaderSTD />
                  </div>
                ) : (
                  <div
                    className={
                      domain_analysis_score <= 3
                        ? "side-tags unsafe open-sans-400"
                        : "side-tags safe open-sans-400"
                    }
                  >
                    {domain_analysis_score + "/5"}
                  </div>
                )}
              </div>
              <div>
                <table>
                  <tr>
                    <td>Domain :</td>
                    <td>{!domain_analysis_loading ? domain : "-"}</td>
                  </tr>
                  <tr>
                    <td>Created :</td>
                    <td>{!domain_analysis_loading ? created : "-"}</td>
                  </tr>
                  <tr>
                    <td>Domain Age :</td>
                    <td>{!domain_analysis_loading ? domain_age : "-"}</td>
                  </tr>
                  <tr>
                    <td>HTTPS :</td>
                    <td>{!domain_analysis_loading ? https : "-"}</td>
                  </tr>
                  <tr>
                    <td>CSP Headers :</td>
                    <td>{!domain_analysis_loading ? csp_headers : "-"}</td>
                  </tr>
                  <tr>
                    <td>HSTS Enabled :</td>
                    <td>{!domain_analysis_loading ? hsts_enabled : "-"}</td>
                  </tr>
                  <tr>
                    <td>Security Headers :</td>
                    <td>
                      {!domain_analysis_loading ? security_headers + "/2" : "-"}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="final-result">
            {!domain_analysis_loading &&
            !blacklist_loading &&
            !prediction_loading ? (
              <div className="final-result-container open-sans-400">
                {final_result == "Safe" ? (
                  <div className="indicator-out indicator-safe open-sans-500">
                    <div className="indicator-in indicator-safe">Safe</div>
                  </div>
                ) : (
                  <div className="indicator-out indicator-unsafe open-sans-500">
                    <div className="indicator-in indicator-unsafe">Unsafe</div>
                  </div>
                )}
                <div className="threat">
                  <div>Threat Level :</div>
                  {threat_level == "Low" ? (
                    <div className="threat-tags safe">Low</div>
                  ) : threat_level == "Medium" ? (
                    <div className="threat-tags medium">Medium</div>
                  ) : (
                    <div className="threat-tags unsafe">High</div>
                  )}
                </div>
                <div className="threat">
                  <div>Still Suspicious?</div>
                  <div
                    className="threat-tags unsafe"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowReport(true)}
                  >
                    Report
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "-1vw" }}>
                  <div style={{ transform: "translateY(50%)" }}>Rate us!</div>
                  <StarRating />
                </div>
              </div>
            ) : (
              <div className="checklist-loader ">
                <LoaderSTD />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-text open-sans-500">Enter a URL</div>
      )}
    </>
  );
};

export default Tool;
