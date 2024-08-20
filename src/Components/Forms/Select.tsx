export default function Select(
    props: any
) { 

    let classAditional = ' peer bg-transparent w-full h-10 rounded-lg text-gray-200 placeholder:opacity-0 ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600';

    let optionList = props.options.map((option: any) => {
        return (
            <option value={option.value} key={option.value}>{option.name}</option>
        )
    })

    return (
        <div className="w-full rounded-lg">
            <div className="relative">
                <label htmlFor={props.name} className="cursor-text text-sm text-gray-500 bg-inherit mx-1 px-1">{props.placeholder}</label>

                <select id={props.id} className={classAditional} defaultValue={props.selectedItem}  {...props.register(props.name)}>
                    {optionList}
                </select>

            </div>
        </div>
    )
}