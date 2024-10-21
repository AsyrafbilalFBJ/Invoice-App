import Select from "react-select";

function SelectOptions( { label, placeholder, data, onChange }) {
    return ( 
        <div className="mb-3">
            <label htmlFor="" className=''>{label}</label>
            <Select
                options={data}
                placeholder={placeholder}
                isSearchable
                onChange={onChange}
                classNames={{
                    control: (state) =>
                      'border border-5 rounded-5 border-white bg-light shadow-sm',
                  }}
            />
        </div>
     );
}

export default SelectOptions;