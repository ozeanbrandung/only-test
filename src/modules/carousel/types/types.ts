export interface IDataItem {
  title: string;
  from: number;
  to: number;
  items: { date: number; text: string }[];
}
