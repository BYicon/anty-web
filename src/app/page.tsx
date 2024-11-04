import Footer from "@/components/Footer";
import Nav  from "@/components/Nav";

export default function Home() {

  return (
    <main className="min-h-screen p-x-4 flex flex-col">
      <Nav />
      <div className="flex flex-1 flex-col items-center justify-center"></div>
      <Footer />
    </main>
  );
}
