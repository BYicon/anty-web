import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Portfolio() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead>Reserve</TableHead>
              <TableHead>Target Weight</TableHead>
              <TableHead className="text-right">Target Value</TableHead>
              <TableHead className="text-right">Market Value</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">WBTC</TableCell>
              <TableCell>100</TableCell>
              <TableCell>20%</TableCell>
              <TableCell className="text-right">$23350.00</TableCell>
              <TableCell className="text-right">$22350.00</TableCell>
              <TableCell className="text-right">$2250.00</TableCell> 
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">WBTC</TableCell>
              <TableCell>100</TableCell>
              <TableCell>20%</TableCell>
              <TableCell className="text-right">$23350.00</TableCell>
              <TableCell className="text-right">$22350.00</TableCell>
              <TableCell className="text-right">$2250.00</TableCell> 
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">WBTC</TableCell>
              <TableCell>100</TableCell>
              <TableCell>20%</TableCell>
              <TableCell className="text-right">$23350.00</TableCell>
              <TableCell className="text-right">$22350.00</TableCell>
              <TableCell className="text-right">$2250.00</TableCell> 
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">WBTC</TableCell>
              <TableCell>100</TableCell>
              <TableCell>20%</TableCell>
              <TableCell className="text-right">$23350.00</TableCell>
              <TableCell className="text-right">$22350.00</TableCell>
              <TableCell className="text-right">$2250.00</TableCell> 
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
