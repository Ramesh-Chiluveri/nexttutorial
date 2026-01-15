/** Adjust this to match the real API shape */
export interface DataItem {
  name: string;
  id:string;
  language: string;
  bio: string;
  version: string;
}

export interface ListItemProps {
  item: DataItem;
}