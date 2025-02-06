import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TvlChart } from "./tvl-chart";

export default function Info() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>
          Showing tvl for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-md font-bold">$100,000.00</p>
            <h3 className="text-sm">TVL</h3>
          </div>
          <div>
            <p className="text-md font-bold">100,000</p>
            <h3 className="text-sm">Total Supply</h3>
          </div>
          <div>
            <p className="text-md font-bold">0.1%</p>
            <h3 className="text-sm">Invest Fee</h3>
          </div>
          <div>
            <p className="text-md font-bold">0.1%</p>
            <h3 className="text-sm">Withdraw Fee</h3>
          </div>
          <div>
            <p className="text-md font-bold">2025-01-01 12:00:00</p>
            <h3 className="text-sm">Last Rebalance Time</h3>
          </div>
          <div>
            <p className="text-md font-bold">7 day</p>
            <h3 className="text-sm">Rebalance Interval</h3>
          </div>
        </div> */}
        <TvlChart />
      </CardContent>
    </Card>
  );
}
