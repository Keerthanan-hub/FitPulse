import type { User, Activity, UserChallenge, CommunityPost, Notification } from '../types';

const STORAGE_KEYS = {
  USERS: 'fitpulse_users',
  CURRENT_USER_ID: 'fitpulse_current_user_id',
  ACTIVITIES: 'fitpulse_activities',
  USER_CHALLENGES: 'fitpulse_user_challenges',
  COMMUNITY_POSTS: 'fitpulse_community_posts',
  NOTIFICATIONS: 'fitpulse_notifications',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function get<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
}

function set<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage');
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────
export function getUsers(): User[] {
  return get<User[]>(STORAGE_KEYS.USERS) ?? [];
}

export function saveUsers(users: User[]): void {
  set(STORAGE_KEYS.USERS, users);
}

export function getUserById(id: string): User | null {
  return getUsers().find(u => u.id === id) ?? null;
}

export function upsertUser(user: User): void {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  saveUsers(users);
}

export function getCurrentUser(): User | null {
  const id = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  if (!id) return null;
  return getUserById(id);
}

export function setCurrentUser(userId: string): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
}

export function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
}

// ─── Activities ───────────────────────────────────────────────────────────────
export function getActivities(): Activity[] {
  return get<Activity[]>(STORAGE_KEYS.ACTIVITIES) ?? [];
}

export function saveActivities(activities: Activity[]): void {
  set(STORAGE_KEYS.ACTIVITIES, activities);
}

export function getUserActivities(userId: string): Activity[] {
  return getActivities().filter(a => a.userId === userId);
}

export function addActivity(activity: Activity): void {
  const activities = getActivities();
  activities.unshift(activity);
  saveActivities(activities);
}

// ─── Challenges ───────────────────────────────────────────────────────────────
export function getUserChallenges(userId: string): UserChallenge[] {
  const all = get<UserChallenge[]>(STORAGE_KEYS.USER_CHALLENGES) ?? [];
  return all.filter(c => c.userId === userId);
}

export function saveUserChallenge(uc: UserChallenge): void {
  const all = get<UserChallenge[]>(STORAGE_KEYS.USER_CHALLENGES) ?? [];
  const idx = all.findIndex(c => c.challengeId === uc.challengeId && c.userId === uc.userId);
  if (idx >= 0) all[idx] = uc;
  else all.push(uc);
  set(STORAGE_KEYS.USER_CHALLENGES, all);
}

// ─── Community ────────────────────────────────────────────────────────────────
export function getCommunityPosts(): CommunityPost[] {
  return get<CommunityPost[]>(STORAGE_KEYS.COMMUNITY_POSTS) ?? [];
}

export function saveCommunityPosts(posts: CommunityPost[]): void {
  set(STORAGE_KEYS.COMMUNITY_POSTS, posts);
}

export function addCommunityPost(post: CommunityPost): void {
  const posts = getCommunityPosts();
  posts.unshift(post);
  saveCommunityPosts(posts);
}

export function updateCommunityPost(updated: CommunityPost): void {
  const posts = getCommunityPosts();
  const idx = posts.findIndex(p => p.id === updated.id);
  if (idx >= 0) posts[idx] = updated;
  saveCommunityPosts(posts);
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function getNotifications(userId: string): Notification[] {
  const all = get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) ?? [];
  return all.filter(n => n.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addNotification(notification: Notification): void {
  const all = get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) ?? [];
  all.unshift(notification);
  // Keep max 50
  set(STORAGE_KEYS.NOTIFICATIONS, all.slice(0, 50));
}

export function markNotificationRead(id: string): void {
  const all = get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) ?? [];
  const n = all.find(n => n.id === id);
  if (n) {
    n.read = true;
    set(STORAGE_KEYS.NOTIFICATIONS, all);
  }
}

export function markAllNotificationsRead(userId: string): void {
  const all = get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) ?? [];
  all.filter(n => n.userId === userId).forEach(n => { n.read = true; });
  set(STORAGE_KEYS.NOTIFICATIONS, all);
}
