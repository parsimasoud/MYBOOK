import Link from "next/link";

export default function LevelCard({ level }) {
  return (
    <Link href={`/levels/${level.id}`}>
      <article className="rounded-2xl p-4">
        <img className="rounded-2xl" src={level.image} alt={level.title} />
        <h2 className=" text-center ">{level.title}</h2>
        <p className=" text-center ">{level.description}</p>
      </article>
    </Link>
  );
}
