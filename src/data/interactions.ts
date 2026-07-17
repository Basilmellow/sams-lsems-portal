export interface InteractionScenario {
  id: string;
  title: string;
  icon: string;
  category: string;
  content: string;
}

export const interactionScenarios: InteractionScenario[] = [
  {
    id: "pd-crime-scene",
    title: "Crime Scene Response",
    icon: "Shield",
    category: "Police Department",
    content: `# Crime Scene Response

When responding to a crime scene, EMS personnel must coordinate closely with law enforcement.

## Protocol
1. **Stage safely** — Do not enter the scene until PD declares it safe
2. **Maintain awareness** — Be alert for potential threats
3. **Preserve evidence** — Do not touch or move evidence
4. **Document everything** — Note anything you touch or move to assist a patient

## Key Rules
- Do NOT destroy evidence at any time
- Only move objects if required to save a life
- Inform PD of everything touched or moved
- Stay within areas designated by PD
- Leave the scene as undisturbed as possible

## Patient Care at Crime Scenes
- Prioritize patient life over evidence preservation
- Document any evidence disturbed during treatment
- Collect and preserve any medical items that may be evidence
- Coordinate with detectives if patient is a suspect or victim

## After the Scene
- Complete incident report noting all evidence interactions
- Provide PD with any information about patient condition
- Maintain confidentiality of patient information`,
  },
  {
    id: "pd-active-shootout",
    title: "Active Shootout",
    icon: "Siren",
    category: "Police Department",
    content: `# Active Shootout Response

## Immediate Response
1. **Stage nearby** — Set up staging area at safe distance from active scene
2. **Do NOT enter** — Never enter an active shootout
3. **Wait for Code 4** — Scene must be declared safe before entry
4. **Prepare equipment** — Have trauma supplies ready

## During Active Scene
- Maintain radio silence unless contacted by command
- Monitor radio for scene updates
- Prepare triage area at staging point
- Have ambulances positioned for rapid evacuation

## After Scene is Secure
- PD escorts EMS to the scene
- Treat officers first if requested by Incident Commander
- Conduct rapid triage
- Prioritize critical patients for immediate transport
- Treat gunshot wounds per trauma protocol

## Communication
- Only Command or designated liaison communicates with PD
- Maintain professional radio discipline
- Report patient count and severity to Dispatch`,
  },
  {
    id: "pd-traffic-accident",
    title: "Traffic Accident / MVA",
    icon: "Car",
    category: "Police Department",
    content: `# Traffic Accident / Motor Vehicle Accident Response

## Arrival Protocol
1. **Never stop inside the active traffic stop area**
2. Position ambulance at safe distance
3. Wait until officer requests assistance
4. Approach scene from the protected side

## Patient Assessment
1. Assess all vehicle occupants
2. Check for ejection
3. Assess for spinal injuries
4. Apply C-spine precautions as indicated
5. Stabilize all patients before transport

## Scene Management
- Coordinate with PD for traffic control
- Use fire department for extrication if needed
- Document all injuries and mechanisms
- Photograph scene if permitted by PD

## Transport Considerations
- Multiple patients may require multiple ambulances
- Prioritize by injury severity
- Request additional units early for mass casualty MVAs`,
  },
  {
    id: "pd-hostage",
    title: "Hostage Incident",
    icon: "UserX",
    category: "Police Department",
    content: `# Hostage Incident Response

## Critical Rules
1. **Remain at staging** — Do not approach the scene
2. **Maintain radio silence** unless contacted
3. **Never negotiate** — This is solely PD's responsibility
4. **Prepare for casualties** — Have trauma supplies ready

## Staging Requirements
- Set up medical staging at safe distance
- Position ambulances for rapid response
- Prepare multiple stretchers if hostages reported
- Coordinate with PD tactical teams

## After Resolution
- Enter only when PD declares Code 4
- Be prepared for multiple casualties
- Triage and treat per protocol
- Expect both gunshot wounds and other injuries
- Coordinate transport to appropriate facilities`,
  },
  {
    id: "pd-disaster-response",
    title: "Disaster Response",
    icon: "AlertTriangle",
    category: "Police Department",
    content: `# Disaster Response Protocol

## Types of Disasters
- Mass Casualty Incidents (MCI)
- Natural Disasters (earthquake, flood)
- Industrial Accidents
- Building Collapse
- Vehicle Mass Casualty

## MCI Activation
1. First arriving unit calls MCI
2. Dispatch activates MCI protocol
3. Command structure established
4. Triage area established
5. Mutual aid requested as needed

## Triage Protocol (START)
- **Red** — Immediate (Life-threatening)
- **Yellow** — Delayed (Serious but stable)
- **Green** — Minor (Walking wounded)
- **Black** — Deceased / Expectant

## Resource Management
- Request additional ambulances early
- Establish landing zones for MEDIVAC
- Coordinate with Fire and PD
- Set up field treatment areas`,
  },
  {
    id: "doj-medical-reports",
    title: "Medical Reports & Court",
    icon: "FileText",
    category: "Department of Justice",
    content: `# Department of Justice Interactions

## Medical Reports
- All medical reports must be factual and objective
- Reports may be used as evidence in court
- Maintain chain of custody for all documentation
- Do not include opinions, only observations and facts

## Court Subpoenas
- Respond to all court subpoenas promptly
- Coordinate with Command before testifying
- Bring all relevant documentation
- Maintain professionalism in court

## Medical Confidentiality
- Patient information is protected by law
- Release information only through proper legal channels
- Document all information requests
- Consult Command if unsure about disclosure

## Evidence Requests
- All evidence requests must go through proper legal channels
- Maintain documentation of all evidence transfers
- Do not release information without proper authorization

## Death Certificates
- Complete death certificates for all confirmed deaths
- Coordinate with coroner's office
- Document time of death and circumstances
- Preserve any evidence on the deceased`,
  },
];

export const interactionCategories = [
  "Police Department",
  "Department of Justice",
];
