import RechargeForm from "@/components/recharge-form/recharge-form";
import ModalReceive from "@/components/modal-receive/modal-receive";
import "./recharge.scss";

export default function RechargePage() {
  return (
    <div className="recharge-page common-page">
      <div className="recharge-page-content">
        <RechargeForm />
        <ModalReceive />
      </div>
    </div>
  );
}
