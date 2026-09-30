// Capabilities describe project scope, not guaranteed business outcomes.
export const departments = [
  {
    id: "it",
    name: "IT Department",
    line: "Build the systems behind your ambition.",
    summary:
      "Websites, applications and connected workflows, designed around the people who use them.",
  },
  {
    id: "digital",
    name: "Digital Marketing",
    line: "Make every channel work together.",
    summary:
      "The complete DC Creative Labs offering: strategy, creative, campaigns and clear reporting.",
  },
];

const capability = (
  id,
  name,
  description,
  includes,
  implementation,
  before,
  after,
) => ({ id, name, description, includes, implementation, before, after });

export const itCapabilities = [
  capability(
    "web-apps",
    "Websites & web applications",
    "A clear, responsive digital experience—from a company website to a custom portal. Plan the user journey, build the right features and make everyday updates straightforward.",
    [
      "Responsive pages & accessible navigation",
      "Forms, dashboards & content management",
      "Performance checks & technical SEO foundations",
    ],
    [
      "Map users, content and the actions they need to take.",
      "Prototype key screens, then build and connect the application.",
      "Test devices, forms and accessibility; document the handover.",
    ],
    [
      "Visitors search across disconnected pages",
      "Enquiries arrive without useful context",
      "Updates depend on manual edits",
    ],
    [
      "Clear journeys guide each visitor",
      "Structured forms capture the right details",
      "A managed publishing workflow keeps content current",
    ],
  ),
  capability(
    "commerce",
    "E-commerce experiences",
    "Connect discovery, product information and checkout in one considered buying journey. Shape the store around your catalogue, operating process and customer needs.",
    [
      "Product catalogue, search & filters",
      "Cart, checkout & payment integration",
      "Order notifications & inventory connections",
    ],
    [
      "Define products, fulfilment rules and the checkout journey.",
      "Build the storefront and connect approved payment and order systems.",
      "Test purchases, edge cases and handover with your team.",
    ],
    [
      "Product details are scattered",
      "Orders are collected in messages",
      "Customers ask for status updates",
    ],
    [
      "A searchable catalogue supports discovery",
      "Checkout creates a structured order",
      "Order notifications keep customers informed",
    ],
  ),
  capability(
    "experience",
    "UI/UX & design systems",
    "Turn complex requirements into understandable screens. A reusable design system keeps the experience consistent as your product grows.",
    [
      "User flows & information architecture",
      "Wireframes & interactive prototypes",
      "Reusable components & accessibility specifications",
    ],
    [
      "Review the current experience and identify the friction points.",
      "Prototype priority journeys and refine them with feedback.",
      "Document components, states and responsive behaviour for development.",
    ],
    [
      "Each screen uses different patterns",
      "Important actions compete for attention",
      "Handoffs leave behaviour unspecified",
    ],
    [
      "A shared component system creates consistency",
      "Clear hierarchy makes the next action obvious",
      "Documented states guide implementation",
    ],
  ),
  capability(
    "integrations",
    "APIs & system integrations",
    "Help your existing tools exchange the right information. Define ownership, permissions and failure handling before connecting the systems.",
    [
      "CRM, forms & business-tool integrations",
      "API connections & webhook workflows",
      "Validation, access controls & error reporting",
    ],
    [
      "Map data fields, permissions and the source of truth.",
      "Build the connection with validation and failure handling.",
      "Test end-to-end, document ownership and monitor exceptions.",
    ],
    [
      "Details are copied between tools",
      "Records use inconsistent fields",
      "Failed transfers go unnoticed",
    ],
    [
      "Approved systems exchange structured data",
      "Field validation protects consistency",
      "Exceptions are visible for review",
    ],
  ),
  capability(
    "ai-workflows",
    "AI & workflow automation",
    "Practical assistance for repetitive work, with human review where it matters. Begin with one bounded workflow and agree how quality will be evaluated.",
    [
      "Enquiry routing & follow-up workflows",
      "AI-assisted content & knowledge retrieval",
      "Human approvals, logs & fallback paths",
    ],
    [
      "Choose a repeatable task and agree data and review boundaries.",
      "Connect the workflow and build a human approval step.",
      "Evaluate representative cases, then refine and document limits.",
    ],
    [
      "Each request needs manual sorting",
      "Drafts start from a blank page",
      "Exceptions have no clear owner",
    ],
    [
      "Rules route requests to the right person",
      "Assisted drafts stay subject to review",
      "Logs and fallbacks make exceptions actionable",
    ],
  ),
  capability(
    "care",
    "Website care & technical support",
    "Keep the handover useful beyond launch. Agree a maintenance scope covering updates, backups, issue triage and the people responsible for each system.",
    [
      "Updates, backups & recovery checks",
      "Performance and availability monitoring setup",
      "Issue triage, documentation & team handover",
    ],
    [
      "Inventory the application, dependencies and operational owners.",
      "Set up the agreed checks, backups and support process.",
      "Review issues, test recovery and keep the documentation current.",
    ],
    [
      "Updates happen reactively",
      "Backup status is uncertain",
      "Support knowledge lives in messages",
    ],
    [
      "An agreed maintenance schedule guides updates",
      "Recovery checks make backups verifiable",
      "A shared runbook supports issue resolution",
    ],
  ),
];

const marketingComparisons = {
  seo: [
    [
      "Technical issues are untracked",
      "Pages target unclear search intent",
      "Search performance is reviewed in isolation",
    ],
    [
      "An audit prioritises technical fixes",
      "Page structure follows search intent",
      "Reporting connects queries, pages and enquiries",
    ],
  ],
  "local-seo": [
    [
      "Business details differ by listing",
      "Local pages lack context",
      "Profile activity goes unreviewed",
    ],
    [
      "Core business details are aligned",
      "Location content answers local needs",
      "Profile insights inform regular updates",
    ],
  ],
  "google-ads": [
    [
      "Campaigns mix unrelated search intent",
      "Landing pages give a generic message",
      "Conversion actions are undefined",
    ],
    [
      "Campaign structure follows audience intent",
      "Ads and landing pages share a clear offer",
      "Agreed conversion events support review",
    ],
  ],
  "social-media": [
    [
      "Publishing is reactive",
      "Visual styles change between posts",
      "Audience feedback is disconnected",
    ],
    [
      "An editorial calendar sets direction",
      "Brand templates support consistent creative",
      "Community insights inform the next cycle",
    ],
  ],
  "meta-ads": [
    [
      "Audiences and offers are mixed",
      "Creative tests lack a clear question",
      "Results are reviewed without context",
    ],
    [
      "Campaigns connect audience, offer and objective",
      "A structured creative test compares variations",
      "Reporting explains spend and tracked actions",
    ],
  ],
  linkedin: [
    [
      "Content speaks to everyone",
      "Campaigns lack a role-specific offer",
      "Lead follow-up is disconnected",
    ],
    [
      "Messaging reflects the buyer's role",
      "Targeting and creative support a defined offer",
      "Approved lead capture connects to follow-up",
    ],
  ],
  youtube: [
    [
      "Videos lack a clear opening",
      "Audience intent is not considered",
      "Viewing and response data stay separate",
    ],
    [
      "A planned hook frames the message",
      "Placement and audience choices support the goal",
      "Video and response signals guide iteration",
    ],
  ],
  content: [
    [
      "Topics are chosen ad hoc",
      "Formats tell different stories",
      "Production lacks a review process",
    ],
    [
      "Content pillars connect to audience needs",
      "One narrative travels across formats",
      "Brief, draft and approval stages guide production",
    ],
  ],
  email: [
    [
      "One message goes to every contact",
      "Follow-ups depend on manual reminders",
      "Consent and preferences are unclear",
    ],
    [
      "Agreed segments shape relevant messages",
      "Approved journeys organise follow-ups",
      "Permission and unsubscribe choices stay explicit",
    ],
  ],
  whatsapp: [
    [
      "Messages have no consistent routing",
      "Replies rely on individual memory",
      "Opt-in context is difficult to find",
    ],
    [
      "Enquiries follow a defined routing process",
      "Approved templates support useful replies",
      "Consent records guide when contact is appropriate",
    ],
  ],
  influencer: [
    [
      "Creators are chosen by reach alone",
      "Deliverables remain ambiguous",
      "Results use inconsistent reporting",
    ],
    [
      "Creator fit considers audience and brand",
      "Briefs define content, rights and disclosures",
      "Agreed reporting supports campaign review",
    ],
  ],
  reputation: [
    [
      "Feedback is spread across channels",
      "Responses vary by person",
      "Recurring issues go uncategorised",
    ],
    [
      "A review routine brings feedback together",
      "Response guidelines support appropriate replies",
      "Themes and escalations reach the right team",
    ],
  ],
  cro: [
    [
      "Friction is based on guesswork",
      "Changes lack a test hypothesis",
      "Learning is lost after each update",
    ],
    [
      "Journey evidence identifies likely friction",
      "A clear hypothesis guides each experiment",
      "Documented results inform the next decision",
    ],
  ],
  analytics: [
    [
      "Events use inconsistent definitions",
      "Reports are disconnected from goals",
      "Numbers arrive without explanation",
    ],
    [
      "A measurement plan defines useful events",
      "A focused report follows agreed objectives",
      "Commentary explains context and next questions",
    ],
  ],
};

export function marketingCapabilities(catalog) {
  return catalog.map((service) => ({
    ...service,
    implementation: [
      `Agree the audience, objective and role of ${service.name.toLowerCase()}.`,
      `Plan and implement ${service.includes.map((item) => item.toLowerCase()).join(", ")}.`,
      "Review the available evidence, document learning and agree the next iteration.",
    ],
    before: marketingComparisons[service.id][0],
    after: marketingComparisons[service.id][1],
  }));
}
