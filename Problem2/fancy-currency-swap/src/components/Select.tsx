interface SelectProps {
    options: string[]
    value: string
    onChange: (value: string) => void
    label: string
}

const Select = ({ options, value, onChange, label }: SelectProps) => (
    <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">{label}</label>
        <select
            className="border p-3 rounded w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Select a currency</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
)

export default Select
