import LevelCard from "../../components/levels/page";

const levels = [
  {
    id: "level-1",
    title: "Level 1",
    description: "Easy Reading",
    image: "/levels/1.jpg",
    level: "easy",
  },
  {
    id: "level-2",
    title: "Level 2",
    description: "Intermediate Reading",
    image: "/levels/2.jpg",
    level: "medium",
  },
  {
    id: "level-3",
    title: "Level 3",
    description: "Advanced Reading",
    image: "/levels/3.jpg",
    level: "hard",
  },
  {
    id: "level-4",
    title: "Level 4",
    description: "Professional Reading",
    image: "/levels/4.jpg",
    level: "pro",
  },
];

export default function Levels() {
  return (
    <div className="flex justify-center items-center h-svh gap-6">
      {levels.map((level) => (
        <LevelCard
          key={level.id}
          level={level}
        />
      ))}
    </div>
  );
}