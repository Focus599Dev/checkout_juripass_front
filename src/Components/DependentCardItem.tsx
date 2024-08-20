export default function DependentCardItem({
    name,
    parentesco,
    cpf,
    id,
    onRemoveDependent
}: any){

    return (
        <div className="max-w-sm p-3 bg-white border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            <button className='text-red absolute right-2 top-2' onClick={() => {onRemoveDependent(id)}}>
                <svg x="0" y="0" width={20} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" />
                </svg>
            </button>
            <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200">{name}</h5>
            </a>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Grau de parentesco: {parentesco}</p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">CPF: {cpf}</p>
        </div>
    )
}