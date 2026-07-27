export interface MedivacChapter {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export const medivacChapters: MedivacChapter[] = [
  {
    id: "medivac-intro",
    title: "Introduction to MEDIVAC",
    icon: "Plane",
    content: `# MEDIVAC Division

The MEDIVAC division is SAMS/LSEMS's air medical transport unit, providing rapid emergency medical transport for critically injured or ill patients throughout San Andreas.

## Mission
To provide timely, safe, and effective air medical transport services, ensuring the highest level of patient care during flight operations.

## Capabilities
- Scene response for trauma and medical emergencies
- Inter-facility transfers
- Mass casualty incident support
- Remote area access
- Night operations (with qualified crew)

## Fleet
| Aircraft | Designation | Capability |
|----------|------------|------------|
| Frogger | MEDIVAC-1 | Primary transport |
| Maverick | MEDIVAC-2 | Secondary transport |

## Operating Hours
- **Primary**: 24/7 availability
- **Staffing**: Minimum 1 pilot + 1 flight medic required
- **Weather minimums**: As specified in pilot SOP`,
  },
  {
    id: "medivac-pilot-sop",
    title: "Pilot SOP",
    icon: "Plane",
    content: `# MEDIVAC Pilot Standard Operating Procedures

## Requirements

- Valid Pilot License
- Minimum **50 Flight Hours**
- Completion of MEDIVAC Pilot Training
- Annual proficiency check
- Night flight certification
- Personnel authorized by the **High Command** with a valid MEDIVAC certification may be exempt from the minimum requirement.

## Pre-Flight Checklist

Every pilot must complete inspection before every deployment.

### MDT Vehicle Check
Confirm:
- Vehicle Status
- Fuel Level
- Damage Status
- Availability

### Exterior Inspection
- Main Rotor
- Tail Rotor
- Landing Skids
- Doors
- Windows

### Interior Inspection
- Medical Kit
- Oxygen Supply
- Stretcher
- Radio
- Fuel Gauge

### Fuel Check
- Refuel the aircraft before deployment if required.
- Aircraft should not depart with insufficient fuel.

### Dispatch Check

Example Radio Call:

"MEDIVAC One to Dispatch, aircraft inspected, operational, taking off."

## Flight Rules

1. Always complete the Pre-Flight Inspection before takeoff.
2. A qualified **Co-Pilot/Flight Medic is mandatory** for all MEDIVAC flights.
3. The co-pilot is responsible for navigation, communication, and operating the helicopter camera.
4. Maintain an operational cruising altitude between **1000–1200 ft** unless operationally required otherwise.
5. Hover briefly before landing to assess the landing zone.
6. Hover briefly after takeoff before departing the area.
7. No MEDIVAC flights are permitted during severe or unsafe weather conditions.
8. Visually inspect and confirm the landing zone is safe before landing.
9. Follow all Dispatch instructions during the mission.

## Landing Zone Procedures

1. Survey the landing zone from altitude.
2. Hover above the landing zone before descent.
3. Confirm the landing zone is clear of vehicles, pedestrians and obstacles.
4. The co-pilot should assist using the helicopter camera.
5. Land only after confirming the area is safe.
6. Maintain rotor awareness during patient loading and unloading.

## Emergency Procedures
- Engine failure: Autorotate to nearest safe area
- System failure: Follow emergency checklist
- Weather deterioration: Divert or return to base
- Communication loss: Follow last known instructions`,
  },
  {
    id: "medivac-medic-sop",
    title: "Flight Medic SOP",
    icon: "HeartPulse",
    content: `# Flight Medic Standard Operating Procedures

## Requirements
- Senior Paramedic or above
- Minimum **100 field hours**
- Completion of flight medic course
- Altitude physiology certification
- Annual recertification

## Pre-Mission Checklist
1. Verify all flight medical equipment
2. Check oxygen supply levels
3. Confirm medication inventory
4. Review patient information (if available)
5. Ensure personal gear is ready

## In-Flight Responsibilities
1. Patient monitoring and care
2. Communication with ground units
3. Medication administration as needed
4. Documentation of all treatments
5. Coordination with receiving facility

## Equipment Requirements
- Portable cardiac monitor/defibrillator
- Advanced airway kit
- IV/IO supplies
- Medication kit
- Trauma kit
- Portable suction
- Flight helmet and communication equipment`,
  },
  {
    id: "medivac-aircraft",
    title: "Aircraft Procedures",
    icon: "Helicopter",
    content: `# Aircraft Procedures

## Loading Procedures
1. Approach helicopter only when rotor speed is confirmed safe
2. Load patient from the appropriate side (as directed by pilot)
3. Secure stretcher to aircraft mount
4. Connect monitoring equipment
5. Verify all loose items are secured

## In-Flight Care
- Maintain patient stability during turbulence
- Adjust treatments as altitude changes
- Monitor for altitude-related complications
- Communicate changes to receiving facility

## Post-Flight
1. Assist patient offload
2. Clean and restock aircraft
3. Complete post-flight checklist
4. Report any maintenance needs
5. Document flight time and fuel usage`,
  },
  {
    id: "medivac-landing-zones",
    title: "Landing Zone Requirements",
    icon: "Crosshair",
    content: `# Landing Zone Requirements

## Minimum Requirements
- **Size**: 100ft x 100ft minimum (larger preferred)
- **Surface**: Flat, firm, free of loose debris
- **Clearance**: No overhead obstructions within 50ft height
- **Lighting**: Adequate lighting for night operations (flares/cars)

## Landing Zone Preparation
1. Clear all loose objects (trash, debris, equipment)
2. Establish wind indicator (flag, smoke, dust)
3. Position ground guides at corners
4. Establish crowd control perimeter (min 100ft)
5. Have fire extinguisher nearby

## Night Operations LZ
- Position vehicles with headlights facing away from LZ
- Use road flares to mark perimeter (not landing area)
- Ensure no whiteout conditions
- Extra ground guides recommended

## LZ Selection Priority
1. Hospital helipad (preferred)
2. Large parking lot
3. Open field (confirmed flat and firm)
4. Wide roadway (emergency only)

## Prohibited LZ Conditions
- Overhead power lines within approach path
- Slope greater than 5 degrees
- Soft/wet/muddy ground
- Active traffic
- Dense tree coverage`,
  },
  {
    id: "medivac-emergency-procedures",
    title: "Emergency Procedures",
    icon: "AlertTriangle",
    content: `# MEDIVAC Emergency Procedures

## In-Flight Medical Emergency
1. Ensure pilot awareness of patient status
2. Request diversion if patient condition deteriorates
3. Continue treatment per protocol
4. Communicate with receiving facility
5. Document all changes

## Aircraft Emergency
- Follow pilot instructions immediately
- Secure loose equipment
- Brace for landing if instructed
- Assist with evacuation after landing
- Report status to Dispatch

## Communication Failure
- Switch to backup radio
- Use visual signals if needed
- Return to base if unable to communicate
- Maintain standard flight path

## Lost Communication with Ground
- Continue to destination if close
- Divert to nearest hospital if appropriate
- Land at nearest safe location if needed
- Attempt to re-establish communication`,
  },
  {
    id: "medivac-certifications",
    title: "MEDIVAC Certifications",
    icon: "Award",
    content: `# MEDIVAC Certifications

## Flight Medic Certification
### Requirements
- Minimum Senior Paramedic rank
- **100+ field duty hours**
- Completion of flight medic course
- Pass written examination
- Pass practical evaluation
- Annual recertification required

## Pilot Certification
### Requirements
- Valid pilot's license
- **50+ flight hours**
- MEDIVAC-specific training
- Emergency procedure proficiency
- Annual check ride

## Certification Renewal
- Both pilot and medic certifications expire annually
- Renewal requires:
  - Proficiency demonstration
  - Written exam (passing score 80%+)
  - Skills evaluation
  - Current medical clearance`,
  },
];
