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
