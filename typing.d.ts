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
