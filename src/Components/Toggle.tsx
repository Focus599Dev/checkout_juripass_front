interface Props {
  selected: string;
  setSelected: (selected: string) => void;
  options: Record<string, string>;
}

export const RoleToggle = ({ selected, setSelected, options }: Props) => {
  return (
    <div className="w-fit inline-flex border border-gray-300 rounded-xl overflow-hidden">
      {Object.entries(options).map(([value, label]) => (
        <button
          key={value}
          onClick={() => setSelected(value)}
          className={`px-6 py-3 font-medium transition-colors duration-300 ${
            selected === value
              ? "bg-[#27335E] text-white"
              : "bg-white text-gray-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
