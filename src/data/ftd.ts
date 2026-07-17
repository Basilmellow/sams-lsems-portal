export interface FTDChapter {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export const ftdChapters: FTDChapter[] = [
  {
    id: "ftd-overview",
    title: "FTD Overview",
    icon: "GraduationCap",
    content: `# Field Training Department (FTD)

The Field Training Department is responsible for the training, evaluation, and certification of all SAMS/LSEMS personnel from Student to Paramedic level.

## Mission
To ensure every SAMS/LSEMS member receives comprehensive, standardized training that prepares them for the demands of emergency medical service in San Andreas.

## FTD Structure
- **FTD Head** — Oversees all training operations
- **FTO Commander** — Manages FTO team and curriculum
- **Lead FTO** — Directs field training operations
- **Field Training Officers (FTO)** — Conduct hands-on training and evaluation

## Training Programs
1. **Cadet Academy** — Initial training for new recruits (2 weeks)
2. **Field Training Phase** — Supervised field experience

## Contact
- FTD Office: Pillbox Hill Medical Center
- Radio Channel: Training Channel`,
  },
  {
    id: "ftd-fto-policies",
    title: "FTO Policies",
    icon: "BookOpen",
    content: `# Field Training Officer (FTO) Policies

## FTO Requirements
- Minimum rank: Senior Paramedic
- Minimum **1 month at current rank**
- Clean disciplinary record (no active strikes)
- Command recommendation
- Completion of FTO certification
- Demonstrated leadership and teaching ability

## FTO Responsibilities
1. **Training** — Deliver structured training to trainees
2. **Evaluation** — Conduct fair, objective evaluations
3. **Mentoring** — Provide guidance and support
4. **Documentation** — Maintain detailed training records
5. **Feedback** — Provide constructive, timely feedback

## FTO Code of Conduct
- Maintain professionalism at all times
- Never compromise patient care for training
- Treat trainees with respect and dignity
- Document all interactions honestly
- Report any concerns to FTD Head immediately

## FTO Evaluation Standards
- Evaluations must be completed within 24 hours of training
- All evaluations must be signed by both FTO and trainee
- Disagreements can be escalated to FTD Head
- False evaluations result in FTO decertification`,
  },
  {
    id: "ftd-trainee-progression",
    title: "Trainee Progression",
    icon: "TrendingUp",
    content: `# Trainee Progression

## Cadet Academy (2 Weeks)

### Week 1 — Academy & Core Training
Essential knowledge and practical preparation.
- Department introduction and history
- Chain of command and rank structure
- Radio procedures and codes
- Patient assessment (primary and secondary)
- Vital signs, CPR and AED
- Basic airway management
- Bandaging and splinting
- Station and equipment familiarization

### Week 2 — Field Training Phase
Supervised field training and practical evaluation.
- Shadow experienced Paramedic
- Observe patient assessments
- Assist with treatments
- Lead patient care under FTO supervision
- Complete training scenarios
- Pass practical evaluations

## Evaluation Criteria
| Module | Pass Score | Attempts Allowed |
|--------|-----------|-----------------|
| Written Exam | 80% | 3 |
| Practical Skills | Satisfactory | 2 |
| Scenario Evaluation | Satisfactory | 2 |
| FTO Recommendation | Positive | - |`,
  },
  {
    id: "ftd-evaluations",
    title: "Evaluations",
    icon: "ClipboardCheck",
    content: `# Trainee Evaluations

## Evaluation Types

### Daily Evaluation
- Completed after each training shift
- Assesses performance in key areas
- Provides immediate feedback
- Documents areas for improvement

### Weekly Evaluation
- Comprehensive review of week's performance
- Scored on 1-5 scale across all modules
- Identifies trends in performance
- Sets goals for coming week

### Final Evaluation
- Completed at end of Field Training
- Comprehensive practical examination
- Requires passing all modules
- FTO must provide positive recommendation

## Evaluation Areas
1. **Patient Assessment** — Primary survey, secondary survey, vitals
2. **Treatment Protocols** — Medical, trauma, cardiac
3. **Communication** — Radio, patient, hospital, team
4. **Documentation** — Reports, dispatch, billing
5. **Professionalism** — Appearance, conduct, chain of command
6. **Scene Management** — Safety, triage, coordination
7. **Transport** — Loading, monitoring, handoff

## Grading Scale
| Score | Description |
|-------|-------------|
| 5 | Exceptional - exceeds expectations |
| 4 | Proficient - meets all expectations |
| 3 | Competent - meets basic expectations |
| 2 | Developing - below expectations |
| 1 | Unsatisfactory - significant improvement needed |`,
  },
  {
    id: "ftd-probation",
    title: "Probation Period",
    icon: "Clock",
    content: `# Probationary Period

## Overview
All newly graduated EMTs enter a 30-day probationary period.

## Probation Requirements
1. Minimum 20 duty hours during probation
2. Weekly check-in with assigned mentor
3. Bi-weekly evaluation by Supervisor
4. Zero disciplinary actions
5. Successful completion of all probationary scenarios

## Probation Support
- Assigned mentor (Senior Paramedic or above)
- Priority access to training scenarios
- Additional supervision during initial shifts
- Regular feedback and guidance

## Probation Evaluation
### Week 1-2: Supervised Operations
- Work directly with mentor
- Observe and assist with patient care
- Complete orientation scenarios
- First evaluation at Day 7

### Week 3-4: Independent Operations
- Work independently with FTO oversight
- Lead patient care
- Complete all probationary scenarios
- Final evaluation at Day 30

## Passing Probation
- All evaluations satisfactory
- Zero disciplinary actions
- Mentor recommendation
- Supervisor approval
- Command notification

## Failing Probation
- May be extended up to 30 additional days
- Additional training assigned
- More frequent evaluations
- If still failing: reassignment or separation`,
  },
  {
    id: "ftd-certification",
    title: "FTO Certification",
    icon: "BadgeCheck",
    content: `# FTO Certification

## FTO Certification Requirements

### Eligibility
- Senior Paramedic rank or above
- Minimum **1 month at current rank**
- Clean disciplinary record
- Command recommendation
- Teaching aptitude assessment

### Requirements
- Completion of FTO certification program
- Pass teaching evaluation
- FTD Head approval
- Annual recertification required

### Certification Status
Upon completion, the member is certified as a Field Training Officer and may begin training and evaluating trainees under FTD oversight.`,
  },
];
