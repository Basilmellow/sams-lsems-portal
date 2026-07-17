import { SOPChapter } from "./types";

export const sopCategories = ["Administration", "Communications", "Medical", "Operations"];

export const sopChapters: SOPChapter[] = [
  {
    id: "chain-of-command",
    title: "Chain of Command",
    category: "Administration",
    icon: "ArrowUp",
    lastUpdated: "2026-07-12",
    content: `# Chain of Command

The SAMS/LSEMS chain of command ensures clear authority and accountability at every level.

## Hierarchy

1. **Director of SAMS / Chief of LSEMS**
2. **Deputy Chief**
3. **Captain**
4. **Surgeon**
5. **Senior Doctor**
6. **Doctor**
7. **Junior Doctor**
8. **Senior Paramedic**
9. **Paramedic**
10. **Resident**
11. **Advanced EMT**
12. **EMT**
13. **Student**

## Rules of Authority
- Orders flow downward through the chain of command
- If a direct supervisor is unavailable, report to the next level up
- All personnel must follow lawful orders from superiors
- If all High Command agree, they retain full authority for promotions or demotions`,
  },
  {
    id: "rank-structure",
    title: "Rank Structure",
    category: "Administration",
    icon: "Shield",
    lastUpdated: "2026-07-12",
    content: `# SAMS Rank Structure

## 🏥 SAMS Rank Hierarchy

| Emoji | Rank | Category |
|-------|------|----------|
| 👑 | Chief | High Command |
| ⭐ | Deputy Chief | High Command |
| 🛡 | Captain | Medic Command |
| 🩺 | Surgeon | Medic Command |
| 👨‍⚕️ | Senior Doctor | Medic Supervisor |
| 👨‍⚕️ | Doctor | Medic Supervisor |
| 🩺 | Junior Doctor | Medic Supervisor |
| 🚑 | Senior Paramedic | Medic |
| 🚑 | Paramedic | Medic |
| 🩹 | Resident | Medic |
| 💉 | Advanced EMT | Medic |
| 💉 | EMT | Medic |
| 🎓 | Student | Medic in Training |

## Post Positions

| Post | Description |
|------|-------------|
| High Command | Director, Deputy Chief |
| Medic High Command | Captain-level oversight |
| Medic Command | Surgeon-level oversight |
| Medic Supervisor | Senior medical oversight |
| Medic | Active field personnel |
| Medic in Training | Trainees and students`,
  },
  {
    id: "callsigns",
    title: "Callsigns",
    category: "Administration",
    icon: "Hash",
    lastUpdated: "2026-07-12",
    content: `# Callsigns

All SAMS personnel are assigned a unique callsign for radio communications and identification.

## Callsign Assignments

| Rank | Callsigns |
|------|-----------|
| Chief | XE-100 |
| Deputy Chief | XE-101 |
| Captain | CP-250 to CP-251 |
| Surgeon | S-300 to S-301 |
| Senior Doctor | SD-350 to SD-351 |
| Doctor | D-400 to D-402 |
| Junior Doctor | JD-450 to JD-455 |
| Senior Paramedic | SP-500 to SP-504 |
| Paramedic | P-550 to P-558 |
| Resident | R-600 to R-605 |
| Advanced EMT | AE-650 to AE-653 |
| EMT | E-700 to E-706 |
| Student | ST-900 to ST-906 |

## Callsign Rules
- Each member is assigned a permanent callsign upon joining
- Callsigns are displayed on uniforms and vehicles
- Callsigns are used for all radio communications
- Callsigns are required in all incident reports
- Do not share or use another member's callsign
- Duplicate callsign assignments must be avoided`,
  },
  {
    id: "radio-procedures",
    title: "Radio Procedures",
    category: "Communications",
    icon: "Radio",
    lastUpdated: "2026-07-12",
    content: `# Radio Procedures

## Radio Channel

**Primary EMS Radio: Channel 6**

All EMS personnel monitor Channel 6 as the main operational channel.

| Channel | Purpose |
|---------|---------|
| Channel 6 | **Primary EMS Operations** |
| Backup | Secondary / overflow |
| MEDIVAC | Air medical operations |
| Command | Command-level communications |
| Dispatch | Dispatch-to-unit communications |
| Training | Training operations |

## Radio Etiquette

1. **Listen before transmitting** — Ensure the channel is clear
2. **Identify yourself** — Use your callsign at the beginning of each transmission
3. **Keep it brief** — Transmissions should be concise and professional
4. **Use plain language** — Avoid excessive codes during emergency situations
5. **No personal conversations** — Keep the radio clear for official business
6. **Acknowledge receipt** — Confirm you received important messages

## Transmission Format

\`\`\`
[Recipient Callsign], [Your Callsign], [Message]
\`\`\`

**Example:** "Dispatch, SP-500, responding to 10-50 at Vinewood Boulevard"

## Emergency Traffic
1. Say **"EMERGENCY TRAFFIC"** three times
2. All other traffic stops immediately
3. State your emergency
4. Clear when done

## Radio Codes
- **Code 1** — No response needed / Information only
- **Code 2** — Non-emergency response
- **Code 3** — Emergency response (lights and sirens)
- **Code 4** — Scene is safe / Situation is under control
- **Code 7** — Meal break
- **Code 10** — Available for assignment`,
  },
  {
    id: "ten-codes",
    title: "10-Codes",
    category: "Communications",
    icon: "Hash",
    lastUpdated: "2026-07-12",
    content: `# 10-Codes

SAMS uses standardized 10-codes for efficient radio communication.

## Common 10-Codes

| Code | Meaning |
|------|---------|
| 10-1 | Unable to copy / Poor reception |
| 10-2 | Signal good / Clear reception |
| 10-3 | Stop transmitting |
| 10-4 | Acknowledged / OK |
| 10-5 | Relay message |
| 10-6 | Busy / Stand by |
| 10-7 | Out of service |
| 10-8 | In service / Available |
| 10-9 | Repeat message |
| 10-10 | Off duty |
| 10-12 | Stand by (visitors present) |
| 10-15 | Message delivered |
| 10-18 | Complete assignment quickly |
| 10-19 | Return to station |
| 10-20 | Location |
| 10-21 | Call by phone |
| 10-22 | Disregard |
| 10-23 | Arrived at scene |
| 10-27 | License/registration check |
| 10-33 | Emergency — all units stand by |
| 10-34 | Clear / No further assistance needed |
| 10-41 | Beginning tour of duty |
| 10-42 | Ending tour of duty |
| 10-50 | Accident / MVA |
| 10-52 | Ambulance needed |
| 10-55 | Intoxicated driver |
| 10-57 | Hit and run |
| 10-76 | En route |
| 10-78 | Need assistance |
| 10-79 | Notify coroner |
| 10-97 | Check (radio test) |
| 10-98 | Available for assignment |

## EMS-Specific Codes

| Code | Meaning |
|------|---------|
| 980 | EMS Emergency Line |
| 988 | EMS Reception Line |
| EMS-1 | Priority medical emergency |
| EMS-2 | Non-urgent medical call |
| EMS-3 | Medical standby |
| EMS-4 | Mass casualty incident |
| MEDIVAC-1 | Air medical request |`,
  },
  {
    id: "hospital-color-codes",
    title: "Hospital Color Codes",
    category: "Communications",
    icon: "Palette",
    lastUpdated: "2026-07-12",
    content: `# Hospital Color Codes

Hospitals use a color-coded alert system to communicate facility status.

## Color Code System

| Code | Name | Meaning |
|------|------|---------|
| 🟢 Code Green | All Clear | Normal operations |
| 🔵 Code Blue | Cardiac/Medical Emergency | Cardiac arrest or life-threatening emergency |
| 🔴 Code Red | Fire Emergency | Fire or smoke detected |
| 🟡 Code Yellow | Bomb Threat | Suspicious package or bomb threat |
| ⚫ Code Black | Severe Weather | Severe weather approaching |
| 🟣 Code Purple | Combative/Violent Person | Violent behavior detected |
| ⚪ Code Silver | Active Shooter | Active shooter in facility |
| 🟤 Code Brown | Hazardous Spill | Chemical or biological hazard |
| 🟠 Code Orange | Evacuation | Facility evacuation ordered |

## EMS Response by Code

1. **Monitor hospital radio** before arrival
2. If **Code Red, Code Silver, or Code Orange** is active, do NOT enter
3. Divert to alternate hospital if primary is on alert
4. If **Code Blue** is active, proceed to ER with patient

## Currently Active Facility

| Hospital | Location | Status |
|----------|----------|--------|
| Pillbox Hill Medical Center | Pillbox Hill | **Active** |

Additional facilities may be introduced in the future.`,
  },
  {
    id: "medical-protocols",
    title: "Medical Protocols",
    category: "Medical",
    icon: "Heart",
    lastUpdated: "2026-07-14",
    content: `# Medical Protocols

## Patient Assessment

### Scene Size-Up
1. Check for hazards (BSI/PPE)
2. Mechanism of injury / Nature of illness
3. Number of patients
4. Additional resources needed

### Primary Assessment (ABCs)
1. **Airway** — Is the airway open?
2. **Breathing** — Rate, quality, effort
3. **Circulation** — Pulse, skin signs, bleeding control
4. **Disability** — AVPU scale
5. **Exposure** — Full body examination

### Available Vital Checks
- **Pulse**
- **Temperature**

## Available Medical Items

| Item | Use |
|------|-----|
| Tourniquet | Hemorrhage control |
| Blood Bag 250ml | Volume replacement |
| Blood Bag 500ml | Volume replacement |
| Antipyretics | Fever reduction |
| Ointment | Topical treatment |
| Painkillers | Pain management |
| Gauze | Wound dressing |
| Adrenaline | Cardiac emergencies |
| Cyclonamine | Hemorrhage control |
| Disinfectant | Wound cleaning |
| Bandage | Wound dressing |
| Splint | Fracture immobilization |
| Suture Kit | Wound closure |
| Morphine | Severe pain management |

## Operational Equipment

- Medic Bag
- Stretcher
- Wheelchair
- Crutch
- Body Bag

## Treatment Workflow
1. Identify the injury / affected body area
2. Check what treatment and items are required
3. Apply the appropriate available treatment
4. Monitor patient response and adjust as needed`,
  },
  {
    id: "scene-safety",
    title: "Scene Safety",
    category: "Operations",
    icon: "ShieldAlert",
    lastUpdated: "2026-07-12",
    content: `# Scene Safety

## Priority Order
1. Scene safety is always the first priority
2. Never enter an unsafe scene — wait for PD declaration
3. Protect yourself before treating patients
4. If the scene becomes unsafe, withdraw immediately

## Safety Checklist
- BSI/PPE donned
- Scene secured by PD if required
- Hazards identified and avoided
- Exit routes identified
- Communication established with Dispatch

## Threat Level Response
- **No threat** — Standard response, treat and transport
- **Potential threat** — Stage nearby, await PD clearance
- **Active threat** — Full staging, do NOT enter until Code 4`,
  },
  {
    id: "patient-transport",
    title: "Patient Transport",
    category: "Operations",
    icon: "Ambulance",
    lastUpdated: "2026-07-12",
    content: `# Patient Transport

## Loading Protocol
1. Secure the stretcher at the ambulance
2. Load patient carefully, maintaining medical equipment connections
3. Secure patient with restraints
4. Close ambulance doors before moving

## In-Transit Care
- Continue monitoring vitals
- Maintain communication with receiving hospital
- Have someone notify the hospital of arrival

## Destination
The only currently active medical facility is:
**Pillbox Hill Medical Center**

Coordinate with Dispatch for transport destination.`,
  },
  {
    id: "hospital-procedures",
    title: "Hospital Procedures",
    category: "Operations",
    icon: "Building2",
    lastUpdated: "2026-07-12",
    content: `# Hospital Procedures

## Arrival Protocol
1. Notify Dispatch of arrival
2. Bring patient to the appropriate treatment area
3. Provide receiving staff with patient information
4. Complete handoff documentation
5. Restock ambulance supplies
6. Return to service

## Billing
- EMS bills patients using **emscharge**
- Typical charges range from **$200–$500** depending on:
  - Injuries treated
  - Medicines/items used
  - Overall treatment provided
- Billing distribution is handled by the existing system

## Nancy NPC Treatment
- If no doctor or EMS personnel are available on duty, patients can be treated by **Nancy (NPC)**
- Treatment cost: **$500**
- This is a fallback option only`,
  },
  {
    id: "duty-procedures",
    title: "Duty Procedures",
    category: "Operations",
    icon: "Clock",
    lastUpdated: "2026-07-17",
    content: `# Duty Procedures

## Duty Management
EMS personnel can:
- **Go On Duty**
- **Go Off Duty**
- **Change Callsign**

## Duty Shifts

| Shift | Time |
|-------|------|
| Day Shift | 12:00 PM – 7:00 PM |
| Night Shift | 8:00 PM – 3:00 AM |

Server restart occurs around **7:00 PM**, creating the gap between shifts.

## Minimum Weekly Duty Hours
All active personnel must complete a minimum of **8 hours per week**.

Failure to meet the minimum duty hours requirement may result in disciplinary action.`,
  },
  {
    id: "leave-policy",
    title: "Leave Policy",
    category: "Operations",
    icon: "CalendarOff",
    lastUpdated: "2026-07-14",
    content: `# Leave Policy

## Leave of Absence (LOA)

Leave requests must be submitted through **Gov Mail** on Discord.

Navigate to the **SAMS** category and use **#EMS-LOA**.

## LOA Guidelines
- Request LOA at least 24 hours in advance when possible
- Specify expected return date
- Notify your supervisor before going on LOA
- Extended LOA (over 2 weeks) requires Command approval
- Failure to return on time without communication may result in disciplinary action

## During LOA
- Personnel are marked as "LOA" in the roster
- LOA members should not be scheduled for duty
- Any active disciplinary actions are paused during LOA`,
  },
  {
    id: "promotion-policy",
    title: "Promotion Policy",
    category: "Operations",
    icon: "TrendingUp",
    lastUpdated: "2026-07-12",
    content: `# Promotion Policy

## Promotion Requirements
- Must meet minimum time-in-rank requirements
- Must have satisfactory performance record
- Must meet duty hour requirements
- Supervisor recommendation required
- Command approval required

## Promotion Authority
- Promotions are approved by Command or High Command
- All promotions are documented in the roster
- Promotion effective date is recorded

## Demotion
- May occur due to disciplinary action
- Approved by Command or High Command
- Documented with reason and effective date`,
  },
  {
    id: "discipline",
    title: "Discipline",
    category: "Operations",
    icon: "Gavel",
    lastUpdated: "2026-07-17",
    content: `# Disciplinary System

## Progressive Discipline

**Warning → Strike 1 → Strike 2 → Strike 3 → Termination from Department**

## Grounds for Disciplinary Action
- Going on duty primarily to collect a paycheck without performing EMS responsibilities
- Remaining AFK while on duty
- Staying somewhere inactive instead of responding to/treating patients while on duty
- Failing to perform assigned EMS responsibilities
- Extended or unexplained absence without an approved LOA
- Other violations of SAMS/LSEMS SOP or departmental rules

## Consequences
1. **Warning** — Verbal or written notice
2. **Strike 1** — Formal warning documented in personnel file
3. **Strike 2** — Final warning before termination
4. **Strike 3** — **Removal and termination from the department**

## Notes
- Strikes remain on record permanently
- Severe violations may result in immediate termination
- All disciplinary actions are documented in the roster`,
  },
  {
    id: "recruitment-sop",
    title: "Recruitment",
    category: "Operations",
    icon: "UserPlus",
    lastUpdated: "2026-07-14",
    content: `# Recruitment

SAMS/LSEMS recruits through two methods:

## EMS Appointment
- Candidates request or take an EMS appointment through Discord
- Attend an interview
- Receive appropriate starting rank based on interview outcome

## Walk-In Interview
- When SAMS/LSEMS announces a walk-in recruitment session
- Candidates attend and complete an interview
- Receive appropriate starting rank based on interview performance

## Starting Ranks
Starting rank is determined by interview outcome and answers/performance. There is no public recruitment application form on the website.`,
  },
  {
    id: "interview-sop",
    title: "Interview SOP",
    category: "Operations",
    icon: "ClipboardCheck",
    lastUpdated: "2026-07-12",
    content: `# Interview SOP

## Interview Process
1. Candidate identity is verified
2. Basic medical knowledge assessment
3. Scenario-based questions
4. Availability and commitment assessment
5. Final decision by interviewer

## Interviewer Guidelines
- Maintain professionalism throughout
- Document all interview details
- Provide clear next-steps to candidates
- Report results to Command within 24 hours`,
  },
  {
    id: "mdt-guide",
    title: "MDT / Dispatch",
    category: "Operations",
    icon: "Monitor",
    lastUpdated: "2026-07-12",
    content: `# MDT / Dispatch

## Dispatch System

EMS has access to **Dispatch** for incident management.

## Available Dispatch Functions
- **Receive/view incidents** — See incoming calls and incidents
- **Respond to incidents** — Accept and respond to dispatched calls
- **Mark incident waypoint** — Set waypoint to incident location
- **Mark Code 4** — Mark an incident as resolved

## Dispatch Workflow
1. Dispatch receives a call
2. EMS units are notified
3. Unit responds and marks waypoint
4. On arrival, assess and treat
5. Mark Code 4 when resolved
6. Return to service

There is no separate MDT login process beyond the standard duty system.`,
  },
  {
    id: "billing",
    title: "Billing",
    category: "Operations",
    icon: "DollarSign",
    lastUpdated: "2026-07-14",
    content: `# Billing

## EMS Billing
- EMS bills patients using **emscharge**
- Typical EMS charges range from **$200–$500**

## Charge Factors
The final charge depends on:
- Injuries treated
- Medicines/items used
- Overall treatment provided

## Billing Distribution
- The doctor or EMS member receives the applicable cut
- The appropriate portion goes to the society/department account
- Distribution is handled by the existing billing system

## Insurance

| Plan | Cost |
|------|------|
| 1 Month Insurance | $4,000 |
| 7 Days Insurance | $1,000 |`,
  },
  {
    id: "insurance",
    title: "Insurance",
    category: "Operations",
    icon: "ShieldCheck",
    lastUpdated: "2026-07-14",
    content: `# Insurance

## Available Plans

| Plan | Duration | Cost |
|------|----------|------|
| Standard Insurance | 1 Month | $4,000 |
| Short-Term Insurance | 7 Days | $1,000 |

## Information
- Insurance covers applicable medical costs
- Patients without insurance pay out of pocket
- Insurance status is verified during the billing process`,
  },
  {
    id: "general-conduct",
    title: "General Conduct",
    category: "Operations",
    icon: "Scale",
    lastUpdated: "2026-07-12",
    content: `# General Conduct

## Professional Standards
- All personnel must maintain professional conduct at all times
- Treat every patient with dignity and respect regardless of circumstances
- Maintain confidentiality of all patient information
- Follow the chain of command for all operational matters

## On-Duty Conduct
- Respond to all dispatched calls promptly
- Provide appropriate medical care at all times
- Coordinate with other agencies when required
- Complete all required documentation

## Off-Duty Conduct
- Off-duty personnel may assist in emergencies if nearby
- Off-duty personnel are not expected to carry full equipment
- Off-duty personnel should not engage in departmental business`,
  },
  {
    id: "faq",
    title: "FAQ",
    category: "Operations",
    icon: "HelpCircle",
    lastUpdated: "2026-07-12",
    content: `# Frequently Asked Questions

## How do I become a member of SAMS/LSEMS?
Contact department members through Discord or attend a scheduled walk-in recruitment session.

## What are the minimum duty hours?
Active personnel must complete **8 hours per week**.

## What are the duty shifts?
- Day Shift: 12:00 PM – 7:00 PM
- Night Shift: 8:00 PM – 3:00 AM

## How do I request leave?
Submit leave requests through **#EMS-LOA** in the SAMS category on Discord.

## Where is the EMS facility?
**Pillbox Hill Medical Center** — currently the only active medical center.

## How do I contact command?
Use the primary EMS radio on **Channel 6** or reach Command through Discord.`,
  },
];
