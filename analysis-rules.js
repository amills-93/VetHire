// fake AI, but deterministic
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VetHire = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const MILITARY_ACRONYMS = [
    {
      term: 'NCOIC',
      matchPattern: /\bNCOIC\b/gi,
      definition: 'Non-Commissioned Officer in Charge',
      civilian: 'Operations Supervisor',
      alternatives: ['Operations Supervisor', 'Team Lead', 'Shift Supervisor', 'Department Manager'],
      context: 'Civilian hiring managers do not know NCO ranks. Use functional leadership titles.'
    },
    {
      term: 'OIC',
      matchPattern: /\bOIC\b/gi,
      definition: 'Officer in Charge',
      civilian: 'Program Manager',
      alternatives: ['Program Manager', 'Director of Operations', 'Department Head', 'Project Director'],
      context: 'Highlights end-to-end program or unit management authority.'
    },
    {
      term: 'OCONUS',
      matchPattern: /\bOCONUS\b/gi,
      definition: 'Outside Continental United States',
      civilian: 'International Operations',
      alternatives: ['International Operations', 'Global Deployments', 'Overseas Assignments', 'Global Logistics'],
      context: 'Emphasize cross-cultural leadership, international logistics, and global compliance.'
    },
    {
      term: 'CONUS',
      matchPattern: /\bCONUS\b/gi,
      definition: 'Continental United States',
      civilian: 'Domestic Operations',
      alternatives: ['Domestic Operations', 'US-based Facilities', 'Nationwide Projects'],
      context: 'Clarifies domestic operational scope.'
    },
    {
      term: 'TDY',
      matchPattern: /\bTDY\b/gi,
      definition: 'Temporary Duty',
      civilian: 'Business Travel',
      alternatives: ['Business Travel', 'Temporary Project Assignment', 'On-Site Field Consulting'],
      context: 'Translates military travel orders to corporate travel and agile project deployment.'
    },
    {
      term: 'TAD',
      matchPattern: /\bTAD\b/gi,
      definition: 'Temporary Additional Duty (Navy / USMC)',
      civilian: 'Temporary Project Assignment',
      alternatives: ['Temporary Project Assignment', 'Business Travel', 'Special Project Deployment'],
      context: 'Translates military temporary orders to corporate project travel.'
    },
    {
      term: 'PCS',
      matchPattern: /\bPCS\b/gi,
      definition: 'Permanent Change of Station',
      civilian: 'Corporate Relocation',
      alternatives: ['Corporate Relocation', 'Organizational Transfer', 'Regional Reassignment'],
      context: 'Demonstrates adaptability to new teams, regions, and organizational structures.'
    },
    {
      term: 'OPORD',
      matchPattern: /\bOPORDs?\b/gi,
      definition: 'Operations Order',
      civilian: 'Operational Plan',
      alternatives: ['Operational Plan', 'Project Directive', 'Strategic Roadmap', 'Standard Operating Plan'],
      context: 'Represents comprehensive project management, milestone planning, and risk mitigation.'
    },
    {
      term: 'FRAGO',
      matchPattern: /\bFRAGOs?\b/gi,
      definition: 'Fragmentary Order',
      civilian: 'Project Scope Adjustment',
      alternatives: ['Project Scope Adjustment', 'Agile Sprint Change', 'Operational Update Directive'],
      context: 'Shows responsiveness to changing conditions and agile requirements.'
    },
    {
      term: 'WARNO',
      matchPattern: /\bWARNOs?\b/gi,
      definition: 'Warning Order',
      civilian: 'Preliminary Project Briefing',
      alternatives: ['Preliminary Project Briefing', 'Advance Project Notice', 'Kickoff Advisory'],
      context: 'Advance project scoping and stakeholder heads-up.'
    },
    {
      term: 'MOS',
      matchPattern: /\bMOS\b/gi,
      definition: 'Military Occupational Specialty (Army / USMC)',
      civilian: 'Career Field',
      alternatives: ['Career Field', 'Job Specialty', 'Technical Discipline', 'Role'],
      context: 'Never leave raw codes like "11B" or "0311" without translating to civilian job functions.'
    },
    {
      term: 'AFSC',
      matchPattern: /\bAFSC\b/gi,
      definition: 'Air Force Specialty Code',
      civilian: 'Technical Specialty',
      alternatives: ['Technical Specialty', 'Career Discipline', 'Functional Role'],
      context: 'Translate AFSC code into standard civilian tech/engineering/operations title.'
    },
    {
      term: 'Rating / NEC',
      matchPattern: /\b(Rating|NEC)\b/g,
      definition: 'Navy Enlisted Classification / Rating',
      civilian: 'Technical Specialization',
      alternatives: ['Technical Specialization', 'Professional Discipline', 'Core Skillset'],
      context: 'Translate Navy rates (e.g., IT, ET, HM, LS) to corporate titles.'
    },
    {
      term: 'S-1 / G-1',
      matchPattern: /\b[SG]-1\b/gi,
      definition: 'Personnel / Administration Branch',
      civilian: 'Human Resources & Talent Management',
      alternatives: ['Human Resources & Talent Management', 'Personnel Administration', 'Workforce Operations'],
      context: 'Encompasses onboarding, personnel records, evaluations, and benefits administration.'
    },
    {
      term: 'S-2 / G-2',
      matchPattern: /\b[SG]-2\b/gi,
      definition: 'Intelligence / Security Branch',
      civilian: 'Risk Assessment & Security Analysis',
      alternatives: ['Risk Assessment & Security Analysis', 'Threat Intelligence', 'Information Security & Compliance'],
      context: 'Civilian equivalents focus on risk analysis, audits, and physical/cyber safety.'
    },
    {
      term: 'S-3 / G-3',
      matchPattern: /\b[SG]-3\b/gi,
      definition: 'Operations & Training Branch',
      civilian: 'Operations Planning & Training',
      alternatives: ['Operations Planning & Training', 'Program Management', 'Strategic Execution'],
      context: 'Corresponds to chief of operations, project schedule management, and corporate training.'
    },
    {
      term: 'S-4 / G-4',
      matchPattern: /\b[SG]-4\b/gi,
      definition: 'Logistics & Supply Branch',
      civilian: 'Supply Chain & Logistics Management',
      alternatives: ['Supply Chain & Logistics Management', 'Procurement & Asset Management', 'Material Management'],
      context: 'Covers inventory control, warehousing, vendor procurement, and distribution.'
    },
    {
      term: 'S-6 / G-6',
      matchPattern: /\b[SG]-6\b/gi,
      definition: 'Signal & Communications Branch',
      civilian: 'Information Technology (IT) & Telecommunications',
      alternatives: ['Information Technology (IT) & Telecommunications', 'Enterprise Networking', 'Infrastructure Systems'],
      context: 'Directly maps to enterprise networking, systems administration, and IT helpdesk.'
    },
    {
      term: 'BDE',
      matchPattern: /\bBDE\b/gi,
      definition: 'Brigade (~3,000–5,000 personnel)',
      civilian: 'Enterprise Business Unit',
      alternatives: ['Enterprise Business Unit', 'Regional Division', 'Corporate Division'],
      context: 'Explain organizational size (e.g., "Led division operations for 3,500+ personnel").'
    },
    {
      term: 'BN',
      matchPattern: /\bBN\b/g,
      definition: 'Battalion / Squadron (~500–800 personnel)',
      civilian: 'Regional Department',
      alternatives: ['Regional Department', 'Mid-Sized Business Unit', 'Operations Facility'],
      context: 'Frame as a corporate department or regional facility.'
    },
    {
      term: 'PLT',
      matchPattern: /\bPLT\b/gi,
      definition: 'Platoon (~30–45 personnel)',
      civilian: 'Cross-Functional Team',
      alternatives: ['Cross-Functional Team', 'Operational Crew', 'Workgroup'],
      context: 'Corresponds to a team of 30–45 direct and indirect reports.'
    },
    {
      term: 'CIF',
      matchPattern: /\bCIF\b/gi,
      definition: 'Central Issue Facility',
      civilian: 'Central Equipment Depot',
      alternatives: ['Central Equipment Depot', 'Asset Warehouse', 'Central Inventory Facility'],
      context: 'Focus on inventory auditing, asset tracking, and capital equipment custody.'
    },
    {
      term: 'NCOER / OER / FITREP / EPR',
      matchPattern: /\b(NCOER|OER|FITREP|EPR)s?\b/gi,
      definition: 'Military Evaluation Reports',
      civilian: 'Annual Performance Review',
      alternatives: ['Annual Performance Review', 'Employee Performance Appraisal', 'KPI Evaluation'],
      context: 'Describe as conducting performance reviews, KPI setting, and talent mentoring.'
    },
    {
      term: 'AAR',
      matchPattern: /\bAARs?\b/gi,
      definition: 'After Action Review',
      civilian: 'Post-Mortem Retrospective',
      alternatives: ['Post-Mortem Retrospective', 'Root-Cause Analysis', 'Lessons-Learned Audit'],
      context: 'Industry standards (Agile, Six Sigma, ITIL) use post-mortems and retrospectives.'
    },
    {
      term: 'COA',
      matchPattern: /\bCOAs?\b/gi,
      definition: 'Course of Action',
      civilian: 'Strategic Proposal',
      alternatives: ['Strategic Proposal', 'Business Alternative', 'Contingency Plan', 'Action Plan'],
      context: 'Frame as analyzing business alternatives, ROI projections, and contingency scenarios.'
    },
    {
      term: 'CONOP',
      matchPattern: /\bCONOPs?\b/gi,
      definition: 'Concept of Operations',
      civilian: 'Project Operating Concept',
      alternatives: ['Project Operating Concept', 'Operational Blueprint', 'Execution Strategy'],
      context: 'Translates to system or project architecture and operational blueprints.'
    },
    {
      term: 'METL',
      matchPattern: /\bMETL\b/gi,
      definition: 'Mission Essential Task List',
      civilian: 'Key Performance Indicators (KPIs)',
      alternatives: ['Key Performance Indicators (KPIs)', 'Core Operational Objectives', 'Performance Metrics'],
      context: 'Translate military task lists to enterprise OKRs and KPIs.'
    },
    {
      term: 'SOP',
      matchPattern: /\bSOPs?\b/gi,
      definition: 'Standard Operating Procedure',
      civilian: 'Standard Operating Procedure (SOP)',
      alternatives: ['Standard Operating Procedure (SOP)', 'Quality Guidelines', 'Process Documentation'],
      context: 'Civilian companies recognize SOP, but highlight creating or standardizing workflows.'
    },
    {
      term: 'FOB / COP',
      matchPattern: /\b(FOB|COP)s?\b/g,
      definition: 'Forward Operating Base / Combat Outpost',
      civilian: 'Remote Operations Site',
      alternatives: ['Remote Operations Site', 'Satellite Facility', 'Forward Field Office'],
      context: 'Focus on managing infrastructure and supply chains in austere or remote environments.'
    },
    {
      term: 'PMCS',
      matchPattern: /\bPMCS\b/gi,
      definition: 'Preventive Maintenance Checks and Services',
      civilian: 'Preventative Maintenance & Quality Assurance',
      alternatives: ['Preventative Maintenance & Quality Assurance', 'Routine Equipment Inspection', 'Asset Auditing'],
      context: 'Highlight equipment reliability, safety compliance, and zero downtime.'
    },
    {
      term: 'ROE',
      matchPattern: /\bROE\b/g,
      definition: 'Rules of Engagement',
      civilian: 'Compliance Protocols',
      alternatives: ['Compliance Protocols', 'Standard Operating Guidelines', 'Regulatory Governance'],
      context: 'Emphasize risk governance, strict adherence to policy, and decision-making under stress.'
    },
    {
      term: 'AO / AOR',
      matchPattern: /\b(AO|AOR)\b/g,
      definition: 'Area of Operations / Area of Responsibility',
      civilian: 'Regional Territory',
      alternatives: ['Regional Territory', 'Assigned Market Area', 'Operational Zone'],
      context: 'Translates to regional management or geographical project territory.'
    },
    {
      term: 'MEDEVAC / CASEVAC',
      matchPattern: /\b(MEDEVAC|CASEVAC)\b/gi,
      definition: 'Medical Evacuation / Casualty Evacuation',
      civilian: 'Emergency Medical Logistics',
      alternatives: ['Emergency Medical Logistics', 'Crisis Medical Response', 'Critical Transport Coordination'],
      context: 'Highlight emergency management, crisis response, and high-stakes logistics.'
    },
    {
      term: 'EOD',
      matchPattern: /\bEOD\b/gi,
      definition: 'Explosive Ordnance Disposal',
      civilian: 'Hazardous Materials (HAZMAT) Management',
      alternatives: ['Hazardous Materials (HAZMAT) Management', 'High-Risk Safety Operations', 'Safety Engineering'],
      context: 'Focus on rigorous safety protocols, technical diagnostic skills, and risk control.'
    },
    {
      term: 'SIPR / NIPR / JWICS',
      matchPattern: /\b(SIPR|NIPR|JWICS|SIPRNET|NIPRNET)\b/gi,
      definition: 'DoD Secure Communication Networks',
      civilian: 'Classified & Secure Enterprise Networks',
      alternatives: ['Classified & Secure Enterprise Networks', 'Segregated Intranet Infrastructure', 'Secure Data Systems'],
      context: 'Highlight strict cybersecurity posture, air-gapped system maintenance, and protocol compliance.'
    },
    {
      term: 'TOC / COC',
      matchPattern: /\b(TOC|COC)\b/g,
      definition: 'Tactical Operations Center / Combat Operations Center',
      civilian: 'Central Operations Command Hub',
      alternatives: ['Central Operations Command Hub', 'Emergency Operations Center (EOC)', 'Mission Control Center'],
      context: 'Highlights multi-channel communications, incident management, and data feeds.'
    },
    {
      term: 'DD-214',
      matchPattern: /\bDD-?214\b/gi,
      definition: 'Certificate of Release or Discharge from Active Duty',
      civilian: 'Military Discharge Records (Produce only upon request)',
      alternatives: ['Veteran Documentation'],
      context: 'Keep off the resume body; produce only during formal background checks.'
    },
    {
      term: 'POV / GOV',
      matchPattern: /\b(POV|GOV)\b/g,
      definition: 'Privately Owned Vehicle / Government Owned Vehicle',
      civilian: 'Fleet Vehicle',
      alternatives: ['Fleet Vehicle', 'Company Vehicle', 'Corporate Transportation'],
      context: 'Mention fleet management or transportation logistics rather than military acronyms.'
    },
    {
      term: 'MRE',
      matchPattern: /\bMREs?\b/gi,
      definition: 'Meals Ready to Eat',
      civilian: 'Emergency Sustenance Provisions',
      alternatives: ['Emergency Sustenance Provisions', 'Field Rations', 'Shelf-Stable Inventory'],
      context: 'Frame under supply chain and emergency relief logistics.'
    },
    {
      term: 'C4ISR',
      matchPattern: /\bC4ISR\b/gi,
      definition: 'Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance',
      civilian: 'Integrated Situational Awareness Systems',
      alternatives: ['Integrated Situational Awareness Systems', 'Enterprise Communications Systems', 'Mission-Critical IT'],
      context: 'Break down into cybersecurity, enterprise infrastructure, and analytics.'
    }
  ];

  const MILITARY_RANKS = [
    {
      term: 'Command Sergeant Major / CSM / SGM',
      matchPattern: /\b(Command Sergeant Major|CSM|Sergeant Major|SGM)\b/gi,
      civilian: 'Executive Director of Operations',
      alternatives: ['Executive Director of Operations', 'Vice President of Operations', 'Senior Operations Advisor'],
      scope: 'Managed personnel, policy, and operations for organizations of 1,000 to 5,000+ members.',
      tip: 'Highlight executive decision-making, strategic workforce planning, and organizational culture.'
    },
    {
      term: 'First Sergeant / 1SG',
      matchPattern: /\b(First Sergeant|1SG)\b/gi,
      civilian: 'Director of Human Resources & Operations',
      alternatives: ['Director of Human Resources & Operations', 'General Manager', 'Senior Operations Manager'],
      scope: 'Directed morale, administration, training, and welfare for 100–200 staff.',
      tip: 'Emphasize conflict resolution, daily operations, safety protocols, and talent development.'
    },
    {
      term: 'Master Sergeant / MSG / MSgt',
      matchPattern: /\b(Master Sergeant|MSG|MSgt)\b/gi,
      civilian: 'Senior Operations Manager',
      alternatives: ['Senior Operations Manager', 'Principal Technical Specialist', 'Program Supervisor'],
      scope: 'Led complex division operations, logistics coordination, and training programs.',
      tip: 'Demonstrate subject matter authority and cross-departmental project management.'
    },
    {
      term: 'Gunnery Sergeant / GySgt (USMC)',
      matchPattern: /\b(Gunnery Sergeant|GySgt)\b/gi,
      civilian: 'Senior Operations & Logistics Manager',
      alternatives: ['Senior Operations & Logistics Manager', 'Operations Director', 'Team Lead'],
      scope: 'Oversaw operational logistics, personnel management, and high-tempo execution.',
      tip: 'Focus on multi-stream operational readiness, team training, and accountability.'
    },
    {
      term: 'Platoon Sergeant / SFC',
      matchPattern: /\b(Platoon Sergeant|Sergeant First Class|SFC)\b/gi,
      civilian: 'Assistant Operations Manager',
      alternatives: ['Assistant Operations Manager', 'Operations Supervisor', 'Senior Project Lead'],
      scope: 'Supervised 30–50 personnel and managed $5M–$20M in inventory and capital assets.',
      tip: 'Focus on day-to-day team leadership, resource allocation, and accountability.'
    },
    {
      term: 'Staff Sergeant / SSG / SSgt',
      matchPattern: /\b(Staff Sergeant|SSG|SSgt)\b/gi,
      civilian: 'Operations Supervisor',
      alternatives: ['Operations Supervisor', 'Team Manager', 'Department Lead'],
      scope: 'Directly led and evaluated 8–15 technicians and operational staff.',
      tip: 'Showcase direct performance management, quality assurance, and on-the-job training.'
    },
    {
      term: 'Technical Sergeant / TSgt (USAF)',
      matchPattern: /\b(Technical Sergeant|TSgt)\b/gi,
      civilian: 'Technical Lead & Supervisor',
      alternatives: ['Technical Lead & Supervisor', 'Systems Specialist', 'Operations Coordinator'],
      scope: 'Supervised technical teams and maintenance operations.',
      tip: 'Emphasize technical mastery, process optimization, and team guidance.'
    },
    {
      term: 'Sergeant / SGT',
      matchPattern: /\b(Sergeant|SGT)\b/g,
      civilian: 'Team Lead',
      alternatives: ['Team Lead', 'Shift Supervisor', 'Field Coordinator'],
      scope: 'Supervised frontline crew of 4–8 specialists.',
      tip: 'Demonstrate frontline execution, safety compliance, and team mentoring.'
    },
    {
      term: 'Squad Leader',
      matchPattern: /\bSquad Leader\b/gi,
      civilian: 'Frontline Team Lead',
      alternatives: ['Frontline Team Lead', 'Project Supervisor', 'Crew Chief'],
      scope: 'Directly led 8–12 personnel in dynamic environments.',
      tip: 'Highlight team synchronization, safety protocols, and daily milestone delivery.'
    },
    {
      term: 'Petty Officer / CPO / SCPO / MCPO (Navy/USCG)',
      matchPattern: /\b(Chief Petty Officer|Senior Chief Petty Officer|Master Chief Petty Officer|Petty Officer(\s+(First|Second|Third|\d(st|nd|rd))?\s+Class)?|CPO|SCPO|MCPO)\b/gi,
      civilian: 'Senior Technical Lead',
      alternatives: ['Senior Technical Lead', 'Quality Assurance Manager', 'Operations Supervisor', 'Department Head'],
      scope: 'Direct technical management and team mentorship in maritime and technical environments.',
      tip: 'Highlight technical troubleshooting, maritime safety, and high-pressure leadership.'
    },
    {
      term: 'Chief Warrant Officer / Warrant Officer',
      matchPattern: /\b(Chief Warrant Officer(\s+[1-5])?|Warrant Officer|CW[2-5]|WO1)\b/gi,
      civilian: 'Senior Technical SME / Solutions Architect',
      alternatives: ['Senior Technical SME', 'Solutions Architect', 'Principal Technical Advisor', 'Staff Engineer'],
      scope: 'Recognized technical authority overseeing mission-critical technology, aviation, or logistics.',
      tip: 'Highlight technical depth, systems integration, and advising executive leadership.'
    },
    {
      term: 'Colonel / COL / O-6',
      matchPattern: /\b(Colonel|COL)\b/g,
      civilian: 'Vice President of Operations',
      alternatives: ['Vice President of Operations', 'Executive Director', 'General Manager'],
      scope: 'Oversaw multi-million dollar budgets and 3,000+ personnel.',
      tip: 'Translate to P&L responsibility, organizational transformation, and stakeholder relations.'
    },
    {
      term: 'Lieutenant Colonel / LTC / O-5',
      matchPattern: /\b(Lieutenant Colonel|LTC)\b/gi,
      civilian: 'Director of Operations',
      alternatives: ['Director of Operations', 'Regional Vice President', 'Program Executive'],
      scope: 'Directed 500–1,000 personnel and managed multi-facility programs.',
      tip: 'Focus on enterprise resource planning, risk mitigation, and executive leadership.'
    },
    {
      term: 'Major / MAJ / O-4',
      matchPattern: /\b(Major|MAJ)\b/g,
      civilian: 'Senior Program Manager',
      alternatives: ['Senior Program Manager', 'Chief of Staff', 'Operations Director'],
      scope: 'Coordinated large-scale operational plans, logistics, and multi-team initiatives.',
      tip: 'Highlight strategic cross-functional coordination and continuous improvement.'
    },
    {
      term: 'Captain / CPT / O-3',
      matchPattern: /\b(Captain|CPT)\b/g,
      civilian: 'Operations Manager',
      alternatives: ['Operations Manager', 'Department Head', 'Program Lead'],
      scope: 'Led an operational unit of 100–150 personnel with full accountability for results.',
      tip: 'Showcase operational autonomy, budget tracking, and talent development.'
    },
    {
      term: 'Lieutenant / 1LT / 2LT / O-1 / O-2',
      matchPattern: /\b(1st Lieutenant|2nd Lieutenant|First Lieutenant|Second Lieutenant|1LT|2LT)\b/gi,
      civilian: 'Project Coordinator / Assistant Operations Manager',
      alternatives: ['Project Coordinator', 'Assistant Operations Manager', 'Associate Operations Lead'],
      scope: 'Directly led a 30–45 person unit through project execution.',
      tip: 'Emphasize early leadership accountability, analytical ability, and adaptability.'
    },
    {
      term: 'Junior Enlisted (SPC / CPL / PFC / PVT / LCpl / Airman / Seaman)',
      matchPattern: /\b(Corporal|Specialist|Private First Class|PFC|SPC|Lance Corporal|CPL|Airman|Seaman|PVT|PV2)\b/gi,
      civilian: 'Operations Specialist',
      alternatives: ['Operations Specialist', 'Field Technician', 'Associate Analyst', 'Logistics Coordinator'],
      scope: 'Individual contributor executing specialized technical and operational tasks.',
      tip: 'Focus on technical certifications, task reliability, initiative, and team collaboration.'
    }
  ];

  const TONE_AND_VERBS = [
    {
      phrase: 'Commanded / Commanded a',
      matchPattern: /\bcommanded(\s+a)?\b/gi,
      originalText: 'Commanded',
      civilian: 'Directed',
      alternatives: ['Directed', 'Orchestrated', 'Guided', 'Spearheaded', 'Oversaw'],
      rationale: '"Commanded" sounds authoritarian in corporate cultures. Use collaborative leadership verbs.'
    },
    {
      phrase: 'Subordinates / Subordinate',
      matchPattern: /\bsubordinates?\b/gi,
      originalText: 'subordinates',
      civilian: 'direct reports',
      alternatives: ['direct reports', 'team members', 'personnel', 'staff'],
      rationale: 'Corporate managers refer to team members as "direct reports" or "staff".'
    },
    {
      phrase: 'Lethality / Combat readiness',
      matchPattern: /\b(lethality|combat readiness)\b/gi,
      originalText: 'lethality',
      civilian: 'operational efficacy',
      alternatives: ['operational efficacy', 'performance readiness', 'mission capability', 'system reliability'],
      rationale: 'Violent or combative terminology alarms corporate recruiters and automated filters.'
    },
    {
      phrase: 'Warfighter / Warfighters',
      matchPattern: /\bwarfighters?\b/gi,
      originalText: 'warfighters',
      civilian: 'end-users',
      alternatives: ['end-users', 'front-line personnel', 'clients', 'field teams'],
      rationale: 'Translate to standard customer/end-user terminology.'
    },
    {
      phrase: 'Combat / Battlefield / Battlespace',
      matchPattern: /\b(combat|battlefield|battlespace)\b/gi,
      originalText: 'combat',
      civilian: 'high-tempo environment',
      alternatives: ['high-tempo environment', 'dynamic workplace', 'austere field conditions', 'critical operations'],
      rationale: 'Demonstrates agility, composure, and resilience without combat connotations.'
    },
    {
      phrase: 'Neutralized / Eliminated',
      matchPattern: /\b(neutralized|eliminated threats?)\b/gi,
      originalText: 'neutralized',
      civilian: 'resolved',
      alternatives: ['resolved', 'mitigated', 'de-escalated', 'overcame', 'managed'],
      rationale: 'Reframe destructive actions into constructive problem-solving.'
    },
    {
      phrase: 'Enforced discipline',
      matchPattern: /\benforced discipline\b/gi,
      originalText: 'enforced discipline',
      civilian: 'maintained regulatory compliance',
      alternatives: ['maintained regulatory compliance', 'upheld quality standards', 'fostered accountability'],
      rationale: 'Sounds punitive; reframe as compliance, accountability, and standards.'
    },
    {
      phrase: 'Hand receipt',
      matchPattern: /\bhand receipts?\b/gi,
      originalText: 'hand receipt',
      civilian: 'asset inventory ledger',
      alternatives: ['asset inventory ledger', 'capital property log', 'equipment tracking registry'],
      rationale: 'Translate military supply accountability to corporate asset management.'
    },
    {
      phrase: 'Counseled / Counseling',
      matchPattern: /\b(counseled|counselings?)\b/gi,
      originalText: 'counseled',
      civilian: 'mentored and coached',
      alternatives: ['mentored and coached', 'provided professional development', 'conducted performance reviews'],
      rationale: 'Military "counseling" implies disciplinary action; reframe as coaching and development.'
    },
    {
      phrase: 'Supervised troops / Led soldiers',
      matchPattern: /\b(supervised|led)\s+(troops|soldiers|sailors|airmen|marines)\b/gi,
      originalText: 'supervised troops',
      civilian: 'led cross-functional teams',
      alternatives: ['led cross-functional teams', 'managed technical personnel', 'directed operational staff'],
      rationale: 'Clearly quantify team size and focus on personnel management.'
    },
    {
      phrase: 'Weapons / Arms / Ammunition',
      matchPattern: /\b(weapons?|arms|ammunition|ammo)\b/gi,
      originalText: 'weapons',
      civilian: 'high-value equipment',
      alternatives: ['high-value equipment', 'sensitive assets', 'regulated inventory'],
      rationale: 'Highlight strict inventory control, security standards, and zero loss rate.'
    }
  ];

  const WEAK_OPENINGS = [
    {
      phrase: 'Responsible for',
      regex: /^(\s*[-*•]?\s*)responsible for\b/i,
      tip: 'Avoid "Responsible for". Start with an active verb showing what you accomplished (e.g., "Led", "Optimized", "Architected", "Engineered").'
    },
    {
      phrase: 'Duties included',
      regex: /^(\s*[-*•]?\s*)duties included\b/i,
      tip: 'Do not list job duties. State your achievements using the formula: Action Verb + Context + Measurable Result.'
    },
    {
      phrase: 'Assisted with / Helped to',
      regex: /^(\s*[-*•]?\s*)(assisted with|helped to|helped)\b/i,
      tip: 'Weak opening. Specify your exact role (e.g., "Co-managed", "Facilitated", "Collaborated on", "Produced").'
    },
    {
      phrase: 'Tasked with',
      regex: /^(\s*[-*•]?\s*)tasked with\b/i,
      tip: 'Sounds passive. Instead of "Tasked with inventory", write "Conducted comprehensive asset audits across 5 facilities".'
    },
    {
      phrase: 'Worked on',
      regex: /^(\s*[-*•]?\s*)worked on\b/i,
      tip: 'Vague opening. What specifically did you design, build, deliver, or optimize?'
    }
  ];

  const OPSEC_AND_CLEARANCE_RULES = [
    {
      term: 'Security Clearance Identified',
      regex: /\b(Top Secret(\/SCI)?|Secret|TS\/SCI|SCI Eligible|Interim Secret|Confidential Clearance)\b/gi,
      advice: 'Clearance detected! Feature this prominently at the top of your resume header (e.g., "Security Clearance: Active Top Secret / SCI Eligible"). It is a major competitive advantage for defense contractors, government agencies, and aerospace/tech employers.'
    },
    {
      term: 'OPSEC & Classification Notice',
      regex: /\b(classified|crypto|TS-SCI|sensitive compartmented|special access program|SAP)\b/gi,
      advice: 'OPSEC Notice: Double-check that no classified project codenames, secret technology specs, target locations, or mission tactics are revealed. State your high-level functional responsibility without disclosing classified details.'
    }
  ];

  function hasQuantifiableMetric(bulletText) {
    const metricPattern = /(\$?\d+([.,]\d+)?\s*(%|k|m|b|million|billion|thousand|hrs?|hours?|days?|months?|years?|personnel|soldiers|sailors|airmen|staff|members|direct reports|vehicles|pieces|assets|units|facilities)?|\b(zero|hundreds?|thousands?|millions?)\b)/i;
    const clean = bulletText.replace(/^[-*•\d.)\s]+/, '').trim();
    return metricPattern.test(clean);
  }

  function analyzeResume(resumeText) {
    if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
      return {
        isEmpty: true,
        score: 0,
        scoreRating: 'Empty Resume',
        stats: { wordCount: 0, bulletCount: 0, issuesCount: 0, metricPercent: 0 },
        acronyms: [],
        ranks: [],
        tone: [],
        bulletAudit: [],
        opsec: []
      };
    }

    const text = resumeText;
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // 1. Acronym Detection
    const detectedAcronyms = [];
    for (const item of MILITARY_ACRONYMS) {
      const matches = text.match(item.matchPattern);
      if (matches && matches.length > 0) {
        detectedAcronyms.push({
          term: item.term,
          rawMatches: matches,
          count: matches.length,
          definition: item.definition,
          civilian: item.civilian,
          alternatives: item.alternatives || [item.civilian],
          context: item.context
        });
      }
    }

    // 2. Rank & Title Detection
    const detectedRanks = [];
    for (const item of MILITARY_RANKS) {
      const matches = text.match(item.matchPattern);
      if (matches && matches.length > 0) {
        detectedRanks.push({
          term: item.term,
          rawMatches: matches,
          count: matches.length,
          civilian: item.civilian,
          alternatives: item.alternatives || [item.civilian],
          scope: item.scope,
          tip: item.tip
        });
      }
    }

    // 3. Tone & Verb Detection
    const detectedTone = [];
    for (const item of TONE_AND_VERBS) {
      const matches = text.match(item.matchPattern);
      if (matches && matches.length > 0) {
        detectedTone.push({
          phrase: item.phrase,
          originalText: item.originalText,
          rawMatches: matches,
          count: matches.length,
          civilian: item.civilian,
          alternatives: item.alternatives || [item.civilian],
          rationale: item.rationale
        });
      }
    }

    // 4. Bullet Point Parsing & Audit
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const bullets = [];
    for (const line of lines) {
      const isBulletMarker = /^[-*•·–—]|\d+[.)]/.test(line);
      const isActionLine = /^[A-Z][a-z]+ed\b|^[A-Z][a-z]+ing\b|^Responsible for\b|^Duties\b|^Led\b|^Managed\b|^Coordinated\b/i.test(line);
      if (isBulletMarker || (isActionLine && line.length > 25)) {
        bullets.push(line);
      }
    }

    const bulletAudit = [];
    let bulletsWithMetrics = 0;

    for (const bullet of bullets) {
      const issues = [];
      const suggestions = [];

      for (const opening of WEAK_OPENINGS) {
        if (opening.regex.test(bullet)) {
          issues.push(`Weak opening: "${opening.phrase}"`);
          suggestions.push(opening.tip);
        }
      }

      const hasMetric = hasQuantifiableMetric(bullet);
      if (hasMetric) {
        bulletsWithMetrics++;
      } else {
        issues.push('Missing quantifiable metrics / scope');
        suggestions.push('Add measurable data: team size, budget, dollar value of equipment managed, or percentage of improvement achieved.');
      }

      const bWords = bullet.split(/\s+/).length;
      if (bWords < 6) {
        issues.push('Too brief');
        suggestions.push('Expand this bullet into an accomplishment using the STAR method: Situation, Task, Action, Result.');
      } else if (bWords > 55) {
        issues.push('Potentially over-length / dense run-on');
        suggestions.push('Break into two concise, punchy bullets focused on discrete outcomes.');
      }

      if (issues.length > 0) {
        bulletAudit.push({
          bullet,
          issues,
          suggestions
        });
      }
    }

    // 5. OPSEC & Clearance Audit
    const opsecResults = [];
    for (const rule of OPSEC_AND_CLEARANCE_RULES) {
      const matches = text.match(rule.regex);
      if (matches && matches.length > 0) {
        opsecResults.push({
          term: rule.term,
          matches: Array.from(new Set(matches.map(m => m.trim()))),
          advice: rule.advice
        });
      }
    }

    // 6. Score Calculation
    let penalty = 0;
    penalty += Math.min(30, detectedAcronyms.length * 3);
    penalty += Math.min(25, detectedRanks.length * 4);
    penalty += Math.min(20, detectedTone.length * 3);

    const totalBullets = bullets.length;
    const metricPercent = totalBullets > 0 ? Math.round((bulletsWithMetrics / totalBullets) * 100) : 0;
    if (totalBullets > 0) {
      const unquantifiedCount = totalBullets - bulletsWithMetrics;
      const unquantifiedPenalty = Math.min(25, Math.round((unquantifiedCount / totalBullets) * 25));
      penalty += unquantifiedPenalty;
    }

    const calculatedScore = Math.max(10, Math.min(100, 100 - penalty));

    let scoreRating = 'Needs Significant Translation';
    if (calculatedScore >= 85) {
      scoreRating = 'Corporate Ready';
    } else if (calculatedScore >= 65) {
      scoreRating = 'Moderate Military Jargon';
    }

    const totalIssuesCount = detectedAcronyms.reduce((acc, i) => acc + i.count, 0) +
      detectedRanks.reduce((acc, i) => acc + i.count, 0) +
      detectedTone.reduce((acc, i) => acc + i.count, 0) +
      bulletAudit.length;

    return {
      isEmpty: false,
      score: calculatedScore,
      scoreRating,
      stats: {
        wordCount,
        bulletCount: totalBullets,
        issuesCount: totalIssuesCount,
        metricPercent
      },
      acronyms: detectedAcronyms,
      ranks: detectedRanks,
      tone: detectedTone,
      bulletAudit,
      opsec: opsecResults
    };
  }

  /**
   * Helper to perform a replacement in text for a given term or matched string.
   */
  function replaceTerm(text, fromTerm, toTerm) {
    if (!text || !fromTerm || !toTerm) return text;
    const escaped = fromTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    return text.replace(regex, toTerm);
  }

  return {
    MILITARY_ACRONYMS,
    MILITARY_RANKS,
    TONE_AND_VERBS,
    WEAK_OPENINGS,
    OPSEC_AND_CLEARANCE_RULES,
    hasQuantifiableMetric,
    analyzeResume,
    replaceTerm
  };
});
