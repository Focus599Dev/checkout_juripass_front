export default function DependentCardItem({
  name,
  parentesco,
  cpf,
  id,
  onRemoveDependent,
  onEditDependent,
}: any) {
  return (
    <div className="max-w-sm p-3 bg-[#edf4fc] rounded-lg">
      <div className="flex justify-end mb-2 gap-4">
        <button
          className=""
          onClick={() => {
            onEditDependent(id);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9374 2.32182C15.2861 1.67048 14.2301 1.67048 13.5787 2.32182L2.32054 13.58C2.00775 13.8928 1.83203 14.317 1.83203 14.7594V17.2493C1.83203 17.7559 2.24273 18.1666 2.74936 18.1666H5.23932C5.68167 18.1666 6.1059 17.9909 6.41869 17.6781L17.6769 6.41997C18.3282 5.76863 18.3282 4.71259 17.6769 4.06124L15.9374 2.32182ZM12.9596 5.29969L14.7581 3.50119L16.4975 5.24061L14.699 7.03911L12.9596 5.29969ZM11.8302 6.42905L3.49991 14.7594V16.4988H5.23932L13.5696 8.16847L11.8302 6.42905Z"
              fill="#4A4C52"
            />
          </svg>
        </button>

        <button
          className="text-[#cf0101]"
          onClick={() => {
            onRemoveDependent(id);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.5886 4.4107C5.26317 4.08527 4.73553 4.08527 4.41009 4.4107C4.08466 4.73614 4.08466 5.26378 4.41009 5.58922L8.82084 9.99996L4.41009 14.4107C4.08466 14.7361 4.08466 15.2638 4.41009 15.5892C4.73553 15.9147 5.26317 15.9147 5.5886 15.5892L9.99935 11.1785L14.4101 15.5892C14.7355 15.9147 15.2632 15.9147 15.5886 15.5892C15.914 15.2638 15.914 14.7361 15.5886 14.4107L11.1779 9.99996L15.5886 5.58922C15.914 5.26378 15.914 4.73614 15.5886 4.4107C15.2632 4.08527 14.7355 4.08527 14.4101 4.4107L9.99935 8.82145L5.5886 4.4107Z"
              fill="#4A4C52"
            />
          </svg>
        </button>
      </div>

      <div>
        <p className="mb-2 text font-semibold tracking-tight text-gray-700">
          {name}
        </p>
        <p className="mb-1 text-gray-700">Parentesco: {parentesco}</p>
        <p className="mb-1 text-gray-700">CPF: {cpf}</p>
      </div>
    </div>
  );
}
