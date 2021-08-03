import React from "react";

import { TableRow, TableColumn } from "react-md/src/js/DataTables";

interface ContentRowProps {
  buttons: JSX.Element[] | JSX.Element;
  label: string;
}

const ContentRow = ({ buttons, label }: ContentRowProps) => (
  <TableRow className="content-entry" selectable={false}>
    <TableColumn numeric adjusted={false}>
      {buttons}
    </TableColumn>
    <TableColumn>{label}</TableColumn>
  </TableRow>
);

export default ContentRow;
