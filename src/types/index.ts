export type FitnessGoal =
  | 'improve_fitness'
  | 'become_active'
  | 'build_strength'
  | 'improve_endurance'
  | 'improve_flexibility'
  | 'participate_sports'
  | 'healthy_habits';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type ActivityType =
  | 'walking'
  | 'running'
  | 'cycling'
  | 'yoga'
  | 'workout'
  | 'sports'
  | 'swimming'
  | 'stretching'
  | 'other';

export type Intensity = 'low' | 'medium' | 'high';

export type SportType =
  | 'badminton'
  | 'cricket'
  | 'football'
  | 'basketball'
  | 'volleyball'
  | 'tennis'
  | 'table_tennis'
  | 'swimming'
  | 'cycling'
  | 'running'
  | 'athletics'
  | 'yoga';

export type BadgeId =
  | 'first_activity'
  | 'streak_7'
  | 'streak_30'
  | 'active_explorer'
  | 'sports_enthusiast'
  | 'challenge_champion'
  | 'consistency_master'
  | 'weekend_warrior'
  | 'early_bird'
  | 'distance_runner'
  | 'step_master';

export type UserLevel = 'Beginner' | 'Active' | 'Fit' | 'Athlete' | 'Fitness Champion';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  college?: string;
  department?: string;
  joinedAt: string;
  onboardingComplete: boolean;
  fitnessGoal?: FitnessGoal;
  fitnessLevel?: FitnessLevel;
  availableTime?: number;
  preferredActivities?: ActivityType[];
  preferredSports?: SportType[];
  preference?: 'indoor' | 'outdoor' | 'both';
  xp: number;
  level: UserLevel;
  streak: number;
  longestStreak: number;
  lastActiveDate?: string;
  badges: BadgeId[];
  totalActivities: number;
  totalDistance: number;
  totalActiveMinutes: number;
  activityScore: number;
  notificationsEnabled: boolean;
  darkMode: boolean;
  steps: number;
  dailyStepsGoal: number;
  dailyMinutesGoal: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  name: string;
  duration: number; // minutes
  distance?: number; // km
  intensity: Intensity;
  xpEarned: number;
  startedAt: string;
  completedAt: string;
  notes?: string;
  sport?: SportType;
}

export interface PlanDay {
  day: string;
  activityName: string;
  activityType: ActivityType;
  duration: number;
  intensity: Intensity;
  notes?: string;
  completed?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  duration: number; // days
  targetValue: number;
  unit: string;
  participants: number;
  reward: number; // XP
  badge?: BadgeId;
  startDate: string;
  endDate: string;
  category: 'steps' | 'activity' | 'consistency' | 'sports' | 'distance';
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
  icon: string;
}

export interface UserChallenge {
  challengeId: string;
  userId: string;
  progress: number;
  joinedAt: string;
  completed: boolean;
  completedAt?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  image?: string;
  likes: string[];
  comments: CommunityComment[];
  createdAt: string;
  activityType?: ActivityType;
  xpEarned?: number;
}

export interface CommunityComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  color: string;
  category: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  level: UserLevel;
  activities: number;
  streak: number;
  avatar?: string;
  college?: string;
  department?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'achievement' | 'challenge' | 'streak' | 'recommendation' | 'community';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  icon?: string;
}

export interface SportCard {
  id: SportType;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  benefits: string[];
  equipment: string[];
  recommendedDuration: string;
  suitableFor: FitnessLevel[];
  isTeam: boolean;
  isOutdoor: boolean;
  isIndoor: boolean;
  calories: string;
  color: string;
  emoji: string;
  description: string;
}

export interface FitnessBuddy {
  id: string;
  name: string;
  level: UserLevel;
  fitnessGoal: FitnessGoal;
  preferredActivities: ActivityType[];
  preferredSports: SportType[];
  preferredTime: string;
  compatibility: number;
  activities: number;
  streak: number;
  xp: number;
  college?: string;
  department?: string;
  bio: string;
  avatar?: string;
}

export interface AppState {
  user: User | null;
  activities: Activity[];
  userChallenges: UserChallenge[];
  communityPosts: CommunityPost[];
  notifications: Notification[];
}
