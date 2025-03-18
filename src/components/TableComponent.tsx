import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { NearEarthObject } from '../store/visualisation/types';
import { columns } from '../utils/columns';

interface TableProps {
  data: NearEarthObject[];
}

const VirtuosoTableComponents: TableComponents<NearEarthObject> = {
  Scroller: React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props: any) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement, any>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement, any>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow sx={{ backgroundColor: 'primary.main' }}>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        variant="head"
        align={column.numeric ? 'right' : 'left'}
        sx={{ color: 'white', width: column.width }}
      >
        {column.label}
      </TableCell>
    ))}
  </TableRow>
  );
}

function rowContent(_index: number, row: NearEarthObject) {
  return (
    <React.Fragment>
      <TableCell>{_index + 1}.</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">{row.estimated_diameter_min}</TableCell>
      <TableCell align="right">{row.estimated_diameter_max}</TableCell>
    </React.Fragment>
  );
}

const TableComponent = ({ data }: TableProps) => {
  if (data.length === 0) {
    return (
      <Paper style={{ height: 400, width: '80%', margin: 'auto' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ padding: 3 }}>
                <Typography variant="h6" color="textSecondary">
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return (
    <Paper style={{ height: 400, width: '80%', margin: 'auto' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default TableComponent;
