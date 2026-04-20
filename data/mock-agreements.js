export const mockAgreements = [
  {
    id: "AGR-101",
    title: "Back Bay Summer Sublease",
    renter: "Mia Chen",
    landlord: "Alex Rivera",
    property: "Fenway studio near campus",
    deposit: 850,
    currency: "USDC",
    duration: "May 20 - Aug 20",
    scenario: "Sublease between students",
    status: "Awaiting Deposit",
    notes: "A summer sublease where both sides want commitment before any direct transfer is made.",
    createdAt: "Apr 4, 2026",
    moveInDate: "May 20, 2026",
    dispute: null
  },
  {
    id: "AGR-102",
    title: "Cross-Border Semester Move-In",
    renter: "Luca Meyer",
    landlord: "Harbor Housing",
    property: "Shared apartment in downtown Toronto",
    deposit: 1200,
    currency: "USDC",
    duration: "Sep 1 - Dec 20",
    scenario: "Cross-border move-in",
    status: "Funded",
    notes: "Funds are already in escrow while the renter finalizes arrival timing and move-in details.",
    createdAt: "Apr 8, 2026",
    moveInDate: "Sep 1, 2026",
    dispute: null
  },
  {
    id: "AGR-103",
    title: "North End Room Transfer",
    renter: "Sofia Kim",
    landlord: "Dylan Brooks",
    property: "Furnished room near medical campus",
    deposit: 780,
    currency: "USDC",
    duration: "Jun 1 - Aug 31",
    scenario: "Move-in issue review",
    status: "Under Review",
    notes: "Funds remain locked while both sides review move-in photos and handoff details before the deposit is released.",
    createdAt: "Apr 11, 2026",
    moveInDate: "Jun 1, 2026",
    dispute: {
      caseStatus: "Under Review",
      raisedBy: "Renter",
      issueType: "Property condition",
      summary: "The room condition at move-in did not match the handoff photos shared before funding.",
      reviewStage: "Evidence submitted",
      evidence: [
        {
          id: "EV-201",
          label: "Move-in photos"
        },
        {
          id: "EV-202",
          label: "Chat screenshots"
        }
      ],
      resolution: ""
    }
  },
  {
    id: "AGR-104",
    title: "Campus Lease Takeover",
    renter: "Nina Patel",
    landlord: "Jordan Lee",
    property: "2-bedroom near engineering campus",
    deposit: 950,
    currency: "USDC",
    duration: "Jan 10 - May 15",
    scenario: "Lease takeover",
    status: "Completed",
    notes: "A completed handoff where the deposit was released after the transition terms were satisfied.",
    createdAt: "Mar 28, 2026",
    moveInDate: "Jan 10, 2026",
    dispute: null
  }
];
