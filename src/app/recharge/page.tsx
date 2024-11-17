"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Recharge() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <div className="common-section">
      <div className="flex flex-col items-center justify-center p-14">
        <input
          className="w-full max-w-md h-10 border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Enter amount"
        />
      </div>
      <>
        <div>
          <h2>Account</h2>

          <div>
            status: {account.status}
            <br />
            addresses: {JSON.stringify(account.addresses)}
            <br />
            chainId: {account.chainId}
          </div>

          {account.status === "connected" && (
            <button type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>

        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      </>
    </div>
  );
}
