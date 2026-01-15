import React from "react";
import { ListItemProps } from "@/app/models/appmodel";



const ListItem = React.memo(function ListItem({
  item,
}: ListItemProps) {
  return <li>{String(item.name)} - {item.id}</li>;
});

export default ListItem;
