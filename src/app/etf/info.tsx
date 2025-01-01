import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Info() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>$100,000.00</p>
            <h3>TVL</h3>
          </div>
          <div>
            <p>100,000</p>
            <h3>Total Supply</h3>
          </div>
          <div>
            <p>0.1%</p>
            <h3>Invest Fee</h3>
          </div>
          <div>
            <p>0.1%</p>
            <h3>Withdraw Fee</h3>
          </div>
          <div>
            <p>2025-01-01 12:00:00</p>
            <h3>Last Rebalance Time</h3>
          </div>
          <div>
            <p>5 day</p>
            <h3>Rebalance Interval</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
