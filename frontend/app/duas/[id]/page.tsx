// import DuaCard from '../../components/DuaCard'

async function getDua(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/duas/${id}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch dua');
  return res.json();
}

export default async function DuaPage({ params }: { params: { id: string } }) {
  const dua = await getDua(params.id);
  return (
    <main className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">{dua.title}</h1>
        <p className="mt-4 whitespace-pre-wrap">{dua.arabic}</p>
        <p className="mt-4 text-gray-700">{dua.transliteration}</p>
        <p className="mt-4 text-gray-800">{dua.translation}</p>
        <p className="mt-3 text-sm text-gray-500">{dua.reference}</p>
      </div>
    </main>
  );
}
