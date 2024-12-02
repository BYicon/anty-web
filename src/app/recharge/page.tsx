"use client";
import RechargeForm from "@/components/recharge-form/recharge-form";
import "./recharge.scss";

export default function RechargePage() {
  return (
    <div className="recharge-page common-page">
      <div className="recharge-page-content">
        <RechargeForm />
      </div>
    </div>
  );
}
