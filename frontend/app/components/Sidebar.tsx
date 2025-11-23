import Link from 'next/link';

async function getCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
  const res = await fetch(url, { cache: 'force-cache' });
  return res.json();
}

export default async function Sidebar() {
  const categories = await getCategories();
  return (
    <aside className="w-80 border-r bg-white min-h-screen p-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Categories</h3>
        <p className="text-xs text-gray-500 mt-1">
          From design:{' '}
          <span className="font-mono text-xs">
            {/* {process.env.NEXT_PUBLIC_DESIGN_PDF} */}
          </span>
        </p>
      </div>

      <ul className="space-y-2">
        {categories?.map((cat: any) => (
          <li key={cat.id} className="py-2 px-3 hover:bg-gray-50 rounded">
            <Link href={`/?category=${cat.id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-sm text-gray-500">
        <h4 className="font-semibold mb-2">About</h4>
        <p>
          This is a sample sidebar component built with Next.js and TypeScript.
          It fetches categories from an API and displays them as links.
        </p>
      </div>
    </aside>
  );
}
