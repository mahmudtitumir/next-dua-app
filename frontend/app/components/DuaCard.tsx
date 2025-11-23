export default function DuaCard({ dua }: { dua: any }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold text-lg">{dua.title}</h3>
      <p className="text-gray-700 mt-2">{dua.translation}</p>
    </div>
  );
}
