import Image from "next/image";
import pic from "../../public/cover.svg"

export default function EmptyState({
  title = "چیزی پیدا نشد",
  description = "هنوز اطلاعاتی برای نمایش وجود ندارد.",
  description1="???????????",
  image = "/empty-book.svg",
  action,
}) {
  return (
    <div className="flex min-h-6 flex-col items-center justify-center text-center px-6">
      
      <div className="mb-6 h-40 w-40">
        <Image
          src={pic}
          alt="empty state"
          width={160}
          height={160}
          className="object-contain"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description1}
      </p>

      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>


      {action && (
        <button
          onClick={action.onClick}
          className="
          mt-6 rounded-xl 
          bg-blue-600 px-5 py-2.5
          text-sm font-medium text-white
          hover:bg-blue-700 transition
          "
        >
          {action.label}
        </button>
      )}

    </div>
  );
}