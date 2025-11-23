import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DuaCard from './components/DuaCard';

async function getDuas() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/duas?limit=12`;
  const res = await fetch(url, { cache: 'force-cache' });
  return res.json();
}

export default async function Page() {
  const duas = await getDuas();
  return (
    <main className="flex-1 flex">
      <Sidebar />
      <section className="flex-1 p-6">
        <Header />
        <h1 className="text-3xl font-semibold mt-6">Explore Duas</h1>
        <p className="text-sm text-gray-600 mt-2">
          Based on the design file:{' '}
          <code className="text-xs">{process.env.NEXT_PUBLIC_DESIGN_PDF}</code>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {duas?.map((d: any) => (
            <DuaCard key={d.id} dua={d} />
          ))}
        </div>
      </section>
    </main>
  );
}
