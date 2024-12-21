import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui//button";

const ConnectWalletButton = (props: { className?: string }) => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        return (
          <Button
            className={`${props.className}`}
            variant="secondary"
            onClick={openConnectModal}
          >
            Connect Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default ConnectWalletButton;
