interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <div className="bg-zinc-800 border border-amber-400/50 w-full p-6 rounded-md h-[200px] flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className="p-3 bg-amber-400/50 text-white rounded-full">
          {icon}
        </div>
        <h3 className="text-xl text-gray-300 font-semibold truncate">
          {title}
        </h3>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-200">{value}</p>
        <p className="text-sm text-gray-100 mt-2 truncate">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
