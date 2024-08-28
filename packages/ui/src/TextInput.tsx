"use client"

export function TextInput({
    value,
    type,
    placeholder,
    onChange, 
    label, 
    isReadOnly = false
    } : {
        type : string, 
        placeholder : string, 
        onChange : (value : string) => void, 
        label : string, 
        isReadOnly ?: boolean, 
        value ?: string | number
    }){
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input value={value} readOnly={isReadOnly} onChange={(e) => onChange(e.target.value)} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder}/>
        </div>
    )
}