import XLink from "@/components/x-link/x-link";
import SlideText from "@/components/slide-text/slide-text";
import LivingWords from "@/components/living-words/living-words";

const HeaderSection = () => {
  const xLinks = [
    "https://x.com/elonmusk",
    "https://x.com/VitalikButerin",
    "https://x.com/solana",
  ];

  return (
    <div className='header-section-container common-bg header-section-bg'
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="page-title"> Mirror NFT</h1>
          <SlideText />
          <p
            className={`mt-8 text-pretty text-lg font-medium text-gray-900 dark:text-gray-400`}
          >
            Built with Next.js, wagmi, shadcn/ui, and RainbowKit, integrates wallet interactions, token and NFT functionalities, and a random pixel art generator. The generated images are uploaded to IPFS and used as TokenURIs, combining Web3 technologies with creative and decentralized solutions.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-gray-900 dark:text-gray-400">React</dt>
              <dd className="text-4xl font-semibold tracking-tight">NextJs</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-gray-900 dark:text-gray-400">
              Shadcn
              </dt>
              <dd className="text-4xl font-semibold tracking-tight">Shadcn-UI</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-gray-900 dark:text-gray-400">Viem</dt>
              <dd className="text-4xl font-semibold tracking-tight">Wagmi</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-gray-900 dark:text-gray-400">IPFS</dt>
              <dd className="text-4xl font-semibold tracking-tight">
              Pinata
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <XLink />
      <LivingWords />
    </div>
  );
};
export default HeaderSection;
