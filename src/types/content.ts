export interface Profile {
  name: string
  role: string
  tagline: string
  bio: string[]
  location: string
  availableForWork: boolean
}

export interface TechItem {
  name: string
  icon: string
  years?: number
}

export interface Skill {
  name: string
  level: number
  description: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location?: string
  description: string
  highlights: string[]
  stack?: string[]
}

export interface Expectation {
  title: string
  description: string
  icon: string
}

export type ContactType = 'email' | 'telegram' | 'github' | 'linkedin' | 'phone'

export interface Contact {
  type: ContactType
  label: string
  value: string
  href: string
  icon: string
}

export interface FunFact {
  title: string
  description: string
  icon: string
}

export interface Achievement {
  title: string
  value: string
  description: string
  icon: string
  color: string
}
