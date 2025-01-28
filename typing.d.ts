export type Contact = {
  id: number;
  icon: React.ReactNode;
  text: string;
  link: string;
};

export type SocialMedia = {
  id: number;
  text: string;
  link: string;
};

export type NavigationLinks = {
  id: number;
  text: string;
  routeTo: string;
};

export type DynamicTextProps = {
  subheading: string;
  heading: string;
};

export type AboutUs = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export type FooterColumn = {
  id: number;
  text: string;
  routeTo: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  image: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  role: string;
};

export type UserProfile = User & {
  authSource: "credentials" | "google";
  lastNotificationReadAt: string;
  totalUnreadNotifications: number;
};

type NotificationResult = {
  id: string;
  user: string;
  title: string;
  description: string | null;
  receivedAt: string;
};

type Table = {
  _id: string;
  tag: string;
  attribute: string;
  capacity: number;
  available: boolean;
};

type Booking = {
  _id: string;
  user: UserProfile;
  table: Table;
  startsAt: string;
  endsAt: string;
  isCancelled: boolean;
};
