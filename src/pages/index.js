import Youtube from "../components/Youtube";
import Blog from "../components/Blog";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Audience Experience</h1>

      <p className="mt-3 text-2xl">Youtube and Blog Contents</p>

      <div className="flex flex-row items-start justify-center min-h-screen py-2">
        <Youtube />
        <Blog />
      </div>
    </div>
  );
}
