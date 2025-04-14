export default function InputV2(props: any) {
  const hasError = !!props.error;

  const classAditional = `peer bg-transparent w-full h-10 rounded-lg text-gray-700 placeholder:opacity-0 px-2
      ring-1 focus:outline-none 
      ${
        hasError
          ? "ring-red-500 focus:ring-red-500"
          : "ring-gray-300 focus:ring-sky-600"
      }`;

  function mask(cb: Function, el: any) {
    if (typeof cb === "function") {
      let mask = cb(el);

      return mask;
    }

    return el;
  }

  return (
    <div className="w-full rounded-lg">
      <div className="relative">
        <input
          type={props.type}
          id={props.name}
          className={classAditional}
          placeholder={props.placeholder}
          {...props.register(props.name)}
          onChange={(e) => {
            if (typeof props?.mask === "function")
              e.target.value = mask(props?.mask, e.target.value);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          defaultValue={props?.value}
        />

        <label
          htmlFor={props.name}
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all bg-white"
        >
          {props.placeholder}
        </label>
        {props.error && (
          <span className="text-red-500 text-xs">{props.error}</span>
        )}
      </div>
    </div>
  );
}
