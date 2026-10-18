export type CatalogService = {
  slug: string;
  name: string;
  category: "Core service" | "Add-on assessment";
  icon: string;
  short_description: string;
  scope: string;
  timeline?: string;
  deliverables: string[];
};

export const coreServices: CatalogService[] = [
  { slug: "web-application-vapt", name: "Web Application VAPT", category: "Core service", icon: "⌘", short_description: "Manual and tool-assisted security testing for agreed web applications and APIs.", scope: "OWASP Web Security Testing Guide (WSTG)-aligned assessment.", timeline: "5–7 business days", deliverables: ["Full findings report", "CVSS-scored technical findings", "Remediation guidance and one retest within 30 days"] },
  { slug: "network-vapt", name: "Network VAPT", category: "Core service", icon: "⌘", short_description: "Internal or external testing of authorized network assets and services.", scope: "PTES-aligned assessment within the agreed asset and test scope.", timeline: "5–7 business days", deliverables: ["Full findings report", "CVSS-scored technical findings", "Remediation guidance and one retest within 30 days"] },
  { slug: "secure-configuration-review", name: "Secure Configuration Review", category: "Core service", icon: "▣", short_description: "Review server, operating system and database hardening against suitable CIS Benchmarks.", scope: "Configuration review for the systems agreed during scoping.", timeline: "2–3 business days", deliverables: ["Configuration findings report", "Risk context", "Prioritized hardening guidance"] },
  { slug: "phishing-simulation", name: "Phishing Simulation", category: "Core service", icon: "◉", short_description: "A carefully scoped campaign with awareness and reporting outcomes.", scope: "Campaign objectives, audience, safeguards and schedule agreed in advance.", timeline: "1–2 weeks", deliverables: ["Campaign summary", "Awareness reporting", "Practical recommendations"] },
];

export const addOnServices: CatalogService[] = [
  { slug: "source-code-review", name: "Source Code Review", category: "Add-on assessment", icon: "⌘", short_description: "SAST-assisted manual review of agreed source code.", scope: "Review focused on OWASP Top 10 patterns and the agreed codebase.", deliverables: ["Validated code findings", "Risk context", "Remediation guidance"] },
  { slug: "cloud-security-baseline-audit", name: "Cloud Security Baseline Audit", category: "Add-on assessment", icon: "◈", short_description: "A narrow-scope review of selected cloud security settings.", scope: "For example, AWS S3/IAM or an Azure CIS baseline, with manual validation.", deliverables: ["Baseline observations", "Validated risk findings", "Prioritized recommendations"] },
  { slug: "vendor-risk-management", name: "Vendor Risk Management", category: "Add-on assessment", icon: "◇", short_description: "A focused review of a vendor's security posture and evidence.", scope: "SIG-lite questionnaires, vendor risk scoring and review cadence recommendations.", deliverables: ["Questionnaire review", "Vendor risk summary", "Review cadence recommendations"] },
];

export const serviceCatalog = [...coreServices, ...addOnServices];
