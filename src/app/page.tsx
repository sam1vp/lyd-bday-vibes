import HomeContent from './components/HomeContent';
import { loadBirthdayData } from './utils/loadData';

export default function Home() {
  const data = loadBirthdayData();

  return (
    <div className="min-h-screen font-sans relative">
      <HomeContent data={data} />
    </div>
  );
}
