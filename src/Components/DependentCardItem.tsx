export default function DependentCardItem({
    name,
    parentesco,
    cpf,
    id,
    onRemoveDependent,
    onEditDependent
}: any){

    return (
        <div className="max-w-sm p-3 bg-white border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            
            <button className='text-red absolute right-10 top-2' onClick={() => {onEditDependent(id)}}>
                <svg x="0" y="0" width={24} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"/>
                </svg>
            </button>

            <button className='text-[#cf0101] absolute right-2 top-2' onClick={() => {onRemoveDependent(id)}}>
                <svg x="0" y="0" width={20} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" />
                </svg>
            </button>

            <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">{name}</h5>
            </a>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Grau de parentesco: {parentesco}</p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">CPF: {cpf}</p>
        </div>
    )
}