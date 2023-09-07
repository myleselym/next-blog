import Feed from "../components/Feed";
export default function Home() {
  return (
    <main id="home-page" className="">
      <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text p-4 bg-gradient-to-r to-amber-600 from-violet-700">
        Create, share, and enjoy!
      </h1>
      <Feed />
    </main>
  );
}
