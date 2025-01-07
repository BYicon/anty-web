import RechargeForm from "./recharge-form";
import ModalReceive from "@/components/modal-receive/modal-receive";
import "./recharge.scss";
import SnowScreen from "@/components/snow-screen/snow-screen";

export default function RechargePage() {
  return (
    <div className="recharge-page common-page">
      <SnowScreen
        count={25}
        minSize={0.5}
        maxSize={1.5}
      />
      <div className="recharge-page-content relative z-10">
        <RechargeForm />
        <ModalReceive />
      </div>
    </div>
  );
}
