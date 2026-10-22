import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Trading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ETF trading preview</CardTitle>
        <CardDescription>
          Investing and redemption are not available yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The portfolio and chart use sample data. This preview does not request
          token approvals or send transactions.
        </p>
        <div className="flex gap-3">
          <Button disabled>Invest unavailable</Button>
          <Button variant="outline" disabled>
            Redeem unavailable
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
