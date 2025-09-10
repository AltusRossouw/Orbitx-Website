export type TeamMember = {
  id: string
  name: string
  role: string
  image?: string // optional local path in /public/images/team or external url
}

export const team: TeamMember[] = [
  { id: 'ian-manchip', name: 'Ian Manchip', role: 'Sales Director' },
  { id: 'frans-rossouw', name: 'Frans Rossouw', role: 'Managing Director' },
  { id: 'member-3', name: 'Name Surname', role: 'Engineering Lead' },
  { id: 'member-4', name: 'Name Surname', role: 'Production Manager' },
  { id: 'member-5', name: 'Name Surname', role: 'Quality Assurance' },
  { id: 'member-6', name: 'Name Surname', role: 'Electrical Engineer' },
  { id: 'member-7', name: 'Name Surname', role: 'Mechanical Engineer' },
  { id: 'member-8', name: 'Name Surname', role: 'Procurement' },
  { id: 'member-9', name: 'Name Surname', role: 'Operations' },
  { id: 'member-10', name: 'Name Surname', role: 'Logistics' },
  { id: 'member-11', name: 'Name Surname', role: 'Sales' },
  { id: 'member-12', name: 'Name Surname', role: 'Support' }
]
