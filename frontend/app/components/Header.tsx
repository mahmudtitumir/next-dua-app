export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-medium">Dua Library</h2>
        <p className="text-xs text-gray-500">
          Faithful reproductions — UI from design file
        </p>
      </div>
      <div className="flex items-center gap-3">
        <input
          placeholder="Search duas..."
          className="px-3 py-2 rounded-md border"
        />
        <button className="px-3 py-2 rounded bg-blue-600 text-white">
          Search
        </button>
      </div>
    </header>
  );
}
