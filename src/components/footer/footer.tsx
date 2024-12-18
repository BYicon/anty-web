const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <div>
          <a href="https://github.com/BYicon" target="_blank">
            <span className="iconfont icon-github font-bold text-4xl"></span>
          </a>
        </div>
        <h3
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
     md:w-2/5"
        >
          <span className="text-teal-400 text-sm line-height-1">
            If you don’t have any Sepolia ETH, you can send me an email to
            get some.
          </span>
          <br />
          <span className="text-teal-400 text-sm">
            Please make sure to include your wallet address in the email.
          </span>
          <br />
          <span className="text-teal-400 text-md">📮 wagmix@163.com</span>
        </h3>
      </div>
      {/* <ItemsContainer /> */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
  text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© {new Date().getFullYear()}. Public Domain.</span>
        <span>京ICP备17044463号</span>
        {/* <SocialIcons Icons={Icons} /> */}
      </div>
    </footer>
  );
};
export default Footer;
