import InteractiveMap from './components/InteractiveMap';
import { loadBirthdayData } from './utils/loadData';

export default function Home() {
  const data = loadBirthdayData();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-center text-4xl font-bold text-black dark:text-zinc-50">
            Map Test
          </h1>
          <p className="text-center text-lg text-zinc-600 dark:text-zinc-400">
            Testing the interactive map component
          </p>
        </div>

        <InteractiveMap center={data.center} markers={data.markers} />
      </main>
    </div>
  );
}
