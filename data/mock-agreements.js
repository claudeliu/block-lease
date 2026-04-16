export const mockAgreements = [
  {
    id: "AGR-101",
    title: "Boston Summer Sublease",
    renter: "Mia Chen",
    landlord: "Alex Rivera",
    property: "Fenway studio near campus",
    deposit: 850,
    currency: "USDC",
    duration: "May 20 - Aug 20",
    scenario: "Student summer sublease",
    status: "Awaiting Deposit",
    notes: "Ideal low-trust case where the renter and sublessor met through a student housing group."
  },
  {
    id: "AGR-102",
    title: "Exchange Student Lease",
    renter: "Luca Meyer",
    landlord: "Harbor Housing",
    property: "Shared apartment in downtown Toronto",
    deposit: 1200,
    currency: "USDC",
    duration: "Sep 1 - Dec 20",
    scenario: "International student arrival",
    status: "Funded",
    notes: "Deposit is already locked in escrow while the renter completes arrival paperwork."
  },
  {
    id: "AGR-103",
    title: "Campus Apartment Renewal",
    renter: "Nina Patel",
    landlord: "Jordan Lee",
    property: "2-bedroom near engineering campus",
    deposit: 950,
    currency: "USDC",
    duration: "Jan 10 - May 15",
    scenario: "Trusted release after move-out",
    status: "Completed",
    notes: "Demo case showing a successful lease end where funds are released to the landlord."
  }
];
