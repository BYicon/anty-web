import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TvlChart } from "./tvl-chart";

export default function Info() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample TVL chart</CardTitle>
        <CardDescription>
          Illustrative data only; these values are not read from the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TvlChart />
      </CardContent>
    </Card>
  );
}
