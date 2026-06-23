import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Trash2,
  FileText,
  LayoutDashboard,
  AlertCircle,
  Zap,
  Users,
  Percent,
  Layers,
  Sparkles,
  Calendar,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import {
  fetchReports,
  fetchReportDetail,
  deleteReport,
  fetchStats,
} from "../api";

export default function DashboardView({
  activeReportId,
  setActiveReportId,
  onNavigateToUpload,
}) {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const reportsData = await fetchReports();
      const statsData = await fetchStats();

      setReports(reportsData || []);
      setStats(statsData || null);

      // Determine which report to select
      let targetId = activeReportId;
      if (!targetId && reportsData && reportsData.length > 0) {
        targetId = reportsData[0]._id;
      }

      if (targetId) {
        setActiveReportId(targetId);
        await loadReportDetail(targetId);
      } else {
        setActiveReport(null);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load dashboard data. Make sure the local Express server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadReportDetail = async (id) => {
    setDetailLoading(true);
    try {
      const data = await fetchReportDetail(id);
      setActiveReport(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load report details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSelectReport = async (id) => {
    setActiveReportId(id);
    await loadReportDetail(id);
  };

  // const handleDeleteReport = async (e, id) => {
  //   e.stopPropagation(); // prevent selecting the report
  //   if (!window.confirm("Are you sure you want to delete this report?")) return;

  //   try {
  //     await deleteReport(id);
  //     // Reload reports and stats
  //     const reportsData = await fetchReports();
  //     const statsData = await fetchStats();
  //     setReports(reportsData || []);
  //     setStats(statsData || null);

  //     if (activeReportId === id) {
  //       if (reportsData && reportsData.length > 0) {
  //         const nextId = reportsData[0]._id;
  //         setActiveReportId(nextId);
  //         await loadReportDetail(nextId);
  //       } else {
  //         setActiveReportId(null);
  //         setActiveReport(null);
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete report.");
  //   }
  // };
  const handleDeleteReport = async (e, id) => {
    e.stopPropagation(); // prevent selecting the report
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      // 1. Attempt to tell the server to delete the file
      await deleteReport(id);

      // If you eventually add real authentication, the normal reload logic runs here:
      const reportsData = await fetchReports();
      const statsData = await fetchStats();
      setReports(reportsData || []);
      setStats(statsData || null);

      if (activeReportId === id) {
        if (reportsData && reportsData.length > 0) {
          const nextId = reportsData[0]._id;
          setActiveReportId(nextId);
          await loadReportDetail(nextId);
        } else {
          setActiveReportId(null);
          setActiveReport(null);
        }
      }
    } catch (err) {
      // --- THE NEW DEMO MODE INTERCEPT ---

      // Check if the server explicitly blocked us (Status 403: Forbidden)
      if (err.response && err.response.status === 403) {
        // 1. Alert the recruiter of your security measure
        alert("SORRY NO MODIFICATIONS IN DEMO REVIEWS");

        // // 2. The UI Illusion: Artificially remove it from React's memory so it looks like it deleted
        // const remainingReports = reports.filter((r) => r._id !== id);
        // setReports(remainingReports);

        // // 3. Artificially lower the total report count in the stats header
        // if (stats) {
        //   setStats({ ...stats, totalReports: stats.totalReports - 1 });
        // }

        // // 4. If they deleted the report they were currently reading, seamlessly switch to the next one
        // if (activeReportId === id) {
        //   if (remainingReports.length > 0) {
        //     const nextId = remainingReports[0]._id;
        //     setActiveReportId(nextId);
        //     await loadReportDetail(nextId);
        //   } else {
        //     setActiveReportId(null);
        //     setActiveReport(null);
        //   }
        // }
      } else {
        // If it's a real network error (like the server being offline), show the standard error
        console.error(err);
        alert("Failed to delete report.");
      }
    }
  };

  const getPriority = (count, index) => {
    if (index === 0 || count > 300)
      return {
        label: "Critical",
        color: "var(--error)",
        bg: "rgba(255, 180, 171, 0.1)",
      };
    if (index === 1 || count > 100)
      return { label: "High", color: "#ffb74d", bg: "rgba(255, 183, 77, 0.1)" };
    return {
      label: "Medium",
      color: "#64b5f6",
      bg: "rgba(100, 181, 246, 0.1)",
    };
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div className="spinner" style={{ marginBottom: "16px" }} />
        <p className="text-body-lg" style={{ opacity: 0.8 }}>
          Loading Insights Platform...
        </p>
      </div>
    );
  }

  // Format Date Helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Global Analytics Statistics Header */}
      {stats && (
        <div className="grid-3">
          {/* Card 1: Total Reports */}
          <div
            className="glass-panel hoverable"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(162, 255, 179, 0.1)",
                color: "var(--primary-accent)",
              }}
            >
              <Layers size={24} />
            </div>
            <div>
              <p className="text-label-sm" style={{ opacity: 0.6 }}>
                Total Reports
              </p>
              <h3 className="text-headline-md">{stats.totalReports}</h3>
            </div>
          </div>

          {/* Card 2: Total Reviews */}
          <div
            className="glass-panel hoverable"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(204, 190, 255, 0.1)",
                color: "var(--secondary-accent)",
              }}
            >
              <Users size={24} />
            </div>
            <div>
              <p className="text-label-sm" style={{ opacity: 0.6 }}>
                Reviews Analyzed
              </p>
              <h3 className="text-headline-md">
                {stats.totalReviewsAnalyzed?.toLocaleString() || 0}
              </h3>
            </div>
          </div>

          {/* Card 3: Avg Sentiment */}
          <div
            className="glass-panel hoverable"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(162, 255, 179, 0.1)",
                color: "var(--primary-accent)",
              }}
            >
              <Percent size={24} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <p className="text-label-sm" style={{ opacity: 0.6 }}>
                Avg Sentiment Breakdown
              </p>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <span
                  className="text-headline-md"
                  style={{ color: "var(--primary-accent)", fontSize: "20px" }}
                >
                  {stats.averagePositivePercentage?.toFixed(1)}% Pos
                </span>
                <span style={{ color: "#555" }}>|</span>
                <span
                  className="text-headline-md"
                  style={{ color: "var(--error)", fontSize: "20px" }}
                >
                  {stats.averageNegativePercentage?.toFixed(1)}% Neg
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "rgba(255, 180, 171, 0.08)",
            border: "1px solid var(--error)",
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "var(--error)",
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <p className="text-body-md" style={{ textAlign: "left" }}>
            {error}
          </p>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid-layout">
        {/* Sidebar: Historical Reports List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className="text-label-sm" style={{ opacity: 0.7 }}>
              Report History
            </h3>
            <button
              className="btn btn-secondary"
              style={{ padding: "4px 10px", fontSize: "12px" }}
              onClick={onNavigateToUpload}
            >
              + New
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "680px",
              overflowY: "auto",
              paddingRight: "4px",
            }}
          >
            {reports.length === 0 ? (
              <div
                className="glass-panel"
                style={{ padding: "24px", textAlign: "center", opacity: 0.6 }}
              >
                <FolderOpen
                  size={32}
                  style={{ margin: "0 auto 12px", display: "block" }}
                />
                <p className="text-body-md">No reports found.</p>
              </div>
            ) : (
              reports.map((r) => (
                <div
                  key={r._id}
                  className="glass-panel hoverable"
                  onClick={() => handleSelectReport(r._id)}
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    borderColor:
                      activeReportId === r._id
                        ? "var(--primary-accent)"
                        : "var(--border-glass)",
                    background:
                      activeReportId === r._id
                        ? "rgba(162, 255, 179, 0.03)"
                        : "",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <h4
                        className="text-body-md"
                        style={{
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          color:
                            activeReportId === r._id
                              ? "var(--primary-accent)"
                              : "var(--primary)",
                        }}
                      >
                        {r.filename}
                      </h4>
                      <p
                        className="text-label-sm"
                        style={{
                          fontSize: "13px",
                          textTransform: "none",
                          opacity: 0.6,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "4px",
                        }}
                      >
                        <Calendar size={12} /> {formatDate(r.createdAt)}
                      </p>
                    </div>
                    <button
                      className="btn-danger"
                      onClick={(e) => handleDeleteReport(e, r._id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255, 180, 171, 0.6)",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--error)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255, 180, 171, 0.6)")
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      opacity: 0.8,
                      borderTop: "1px solid rgba(255,255,255,0.03)",
                      paddingTop: "6px",
                    }}
                  >
                    <span>{r.totalReviews} reviews</span>
                    <span style={{ color: "var(--primary-accent)" }}>
                      {r.positivePercentage?.toFixed(0)}% Pos
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Viewport: Active Report Detail */}
        <div style={{ position: "relative" }}>
          {detailLoading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(19, 19, 19, 0.7)",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              }}
            >
              <div className="spinner" />
            </div>
          )}

          {!activeReport ? (
            <div
              className="glass-panel"
              style={{
                padding: "80px 32px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles
                size={48}
                style={{ color: "var(--primary-accent)", marginBottom: "24px" }}
              />
              <h2 className="text-headline-md" style={{ marginBottom: "12px" }}>
                Welcome to FeedbackIQ
              </h2>
              <p
                className="text-body-lg"
                style={{
                  color: "var(--on-surface-variant)",
                  maxWidth: "480px",
                  marginBottom: "24px",
                }}
              >
                Transform raw feedback data into actionable strategy. Start by
                uploading a CSV file of customer reviews.
              </p>
              <button className="btn btn-primary" onClick={onNavigateToUpload}>
                Initiate Analysis
              </button>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Report Header Card */}
              <div
                className="glass-panel"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <div
                  className="ambient-glow glow-mint"
                  style={{
                    width: "250px",
                    height: "250px",
                    top: "-100px",
                    right: "-100px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h2
                      className="text-headline-lg"
                      style={{ fontSize: "32px" }}
                    >
                      Intelligence Report
                    </h2>
                    <p
                      className="text-body-md"
                      style={{
                        color: "var(--on-surface-variant)",
                        marginTop: "4px",
                      }}
                    >
                      AI-distilled insights from{" "}
                      <strong>
                        {activeReport.totalReviews?.toLocaleString()}
                      </strong>{" "}
                      recent user interactions for{" "}
                      <strong>{activeReport.filename}</strong>.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ textAlign: "right" }}>
                      <span
                        className="text-label-sm"
                        style={{
                          opacity: 0.6,
                          display: "block",
                          fontSize: "13px",
                        }}
                      >
                        ANALYSIS TIME
                      </span>
                      <span
                        className="text-body-md"
                        style={{ fontWeight: "600" }}
                      >
                        {formatDate(activeReport.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Distribution bar */}
                <div style={{ marginTop: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      className="text-label-sm"
                      style={{ color: "var(--primary-accent)" }}
                    >
                      Positive ({activeReport.positivePercentage?.toFixed(1)}%)
                    </span>
                    <span
                      className="text-label-sm"
                      style={{ color: "var(--error)" }}
                    >
                      Negative ({activeReport.negativePercentage?.toFixed(1)}%)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "8px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "#2a2a2a",
                    }}
                  >
                    <div
                      style={{
                        width: `${activeReport.positivePercentage}%`,
                        backgroundColor: "var(--primary-accent)",
                      }}
                    />
                    <div
                      style={{
                        width: `${activeReport.negativePercentage}%`,
                        backgroundColor: "var(--error)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      opacity: 0.6,
                      marginTop: "4px",
                    }}
                  >
                    <span>
                      {activeReport.positiveReviews?.toLocaleString()} positive
                      reviews
                    </span>
                    <span>
                      {activeReport.negativeReviews?.toLocaleString()} negative
                      reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Sentiment Narrative */}
              <div className="glass-panel">
                <h3
                  className="text-label-sm"
                  style={{
                    color: "var(--secondary-accent)",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Zap size={16} /> Sentiment Narrative
                </h3>
                <p
                  className="text-body-md"
                  style={{ lineHeight: "1.7", opacity: 0.9 }}
                >
                  The overarching sentiment for{" "}
                  <strong>{activeReport.filename}</strong> is dynamic,
                  consisting of {activeReport.positivePercentage?.toFixed(1)}%
                  positive reception against{" "}
                  {activeReport.negativePercentage?.toFixed(1)}% friction
                  points. Users expressed prominent trends that were extracted
                  by the feedback intelligence model. Below is a structured
                  breakdown of the most vital concerns, positive drivers, and
                  immediate recommendations.
                </p>
              </div>

              {/* Key Strategic Themes (Bento grid from topComplaints) */}
              <div>
                <h3
                  className="text-label-sm"
                  style={{ opacity: 0.7, marginBottom: "16px" }}
                >
                  Key Strategic Themes
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "16px",
                  }}
                >
                  {activeReport.topComplaints &&
                  activeReport.topComplaints.length > 0 ? (
                    activeReport.topComplaints.map((c, i) => {
                      const prio = getPriority(c.count, i);
                      return (
                        <div
                          key={c._id || i}
                          className="glass-panel hoverable"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            padding: "28px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: prio.color,
                                  backgroundColor: prio.bg,
                                  padding: "4px 10px",
                                  borderRadius: "4px",
                                  fontWeight: "700",
                                }}
                              >
                                {prio.label}
                              </span>
                              <h4
                                className="text-headline-md"
                                style={{ fontWeight: "700", fontSize: "21px" }}
                              >
                                {c.theme}
                              </h4>
                            </div>
                            <span
                              className="text-label-sm"
                              style={{ opacity: 0.7 }}
                            >
                              {c.count} mentions
                            </span>
                          </div>

                          <p
                            className="text-body-md"
                            style={{
                              color: "var(--on-surface-variant)",
                              fontSize: "17px",
                              lineHeight: "1.6",
                            }}
                          >
                            {c.summary}
                          </p>

                          <div
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.06)",
                              paddingTop: "14px",
                              marginTop: "8px",
                            }}
                          >
                            <span
                              className="text-label-sm"
                              style={{
                                fontSize: "13px",
                                color: "var(--primary-accent)",
                                display: "block",
                                marginBottom: "6px",
                              }}
                            >
                              Action Item / Recommendation:
                            </span>
                            <p
                              className="text-body-md"
                              style={{
                                fontSize: "16px",
                                fontStyle: "italic",
                                opacity: 0.95,
                                lineHeight: "1.5",
                              }}
                            >
                              {c.recommendation}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="glass-panel"
                      style={{
                        padding: "24px",
                        textAlign: "center",
                        opacity: 0.6,
                      }}
                    >
                      No strategic complaints extracted.
                    </div>
                  )}
                </div>
              </div>

              {/* Immediate Actions Table/Dashboard Section */}
              <div className="glass-panel" style={{ padding: "32px" }}>
                <h3
                  className="text-label-sm"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                  }}
                >
                  <AlertTriangle size={18} style={{ color: "var(--error)" }} />{" "}
                  Immediate Action Plan
                </h3>

                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      minWidth: "500px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--border-glass)",
                        }}
                      >
                        <th
                          style={{ padding: "12px 8px", opacity: 0.6 }}
                          className="text-label-sm"
                        >
                          Priority
                        </th>
                        <th
                          style={{ padding: "12px 8px", opacity: 0.6 }}
                          className="text-label-sm"
                        >
                          Theme
                        </th>
                        <th
                          style={{ padding: "12px 8px", opacity: 0.6 }}
                          className="text-label-sm"
                        >
                          Resolution Path / Recommendation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeReport.topComplaints &&
                        activeReport.topComplaints.map((c, i) => {
                          const prio = getPriority(c.count, i);
                          return (
                            <tr
                              key={c._id || i}
                              style={{
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              <td style={{ padding: "16px 8px" }}>
                                <span
                                  style={{
                                    color: prio.color,
                                    fontSize: "14px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {prio.label}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "16px 8px",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {c.theme}
                              </td>
                              <td
                                style={{
                                  padding: "16px 8px",
                                  opacity: 0.9,
                                  fontSize: "16px",
                                }}
                              >
                                {c.recommendation}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
