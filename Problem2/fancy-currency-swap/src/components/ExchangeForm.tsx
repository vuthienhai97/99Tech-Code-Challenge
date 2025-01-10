import React, { useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FaSpinner } from 'react-icons/fa'

// Custom styles for react-select
const customStyles = {
    control: (base: any) => ({
        ...base,
        display: 'flex',
        borderColor: '#d1d5db',
        borderRadius: '0.375rem',
        padding: '0.25rem',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#9ca3af'
        },
        fontSize: '1rem'
    }),
    option: (base: any, state: any) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
        color: state.isSelected ? '#1f2937' : '#374151',
        padding: '0.5rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e5e7eb'
        }
    }),
    singleValue: (base: any) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#374151'
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0
    })
}

interface FormInputs {
    from: string
    to: string
    amount: number
}

interface ExchangeFormProps {
    prices: { currency: string; price: number }[]
}

const CustomOption = (props: any) => {
    const { data, innerRef, innerProps, isFocused } = props
    return (
        <div
            ref={innerRef}
            {...innerProps}
            className={`flex items-center gap-2 p-2 cursor-pointer ${
                isFocused ? 'bg-gray-100' : 'bg-white'
            } hover:bg-gray-200`}
        >
            <img
                src={data.icon}
                alt={data.label}
                className="w-5 h-5 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
                {data.label}
            </span>
        </div>
    )
}

const CustomSingleValue = (props: any) => {
    const { data } = props
    return (
        <div className="flex items-center gap-2">
            <img
                src={data.icon}
                alt={data.label}
                className="w-5 h-5 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
                {data.label}
            </span>
        </div>
    )
}

// Validation schema with Yup
const validationSchema = Yup.object().shape({
    from: Yup.string().required('Please select the "From" currency'),
    to: Yup.string().required('Please select the "To" currency'),
    amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be a positive number')
        .typeError('Amount must be a valid number')
})

const ExchangeForm: React.FC<ExchangeFormProps> = ({ prices }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormInputs>({
        resolver: yupResolver(validationSchema)
    })
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<number | null>(null)

    const options = prices.map((p) => ({
        label: p.currency,
        value: p.currency,
        icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${p.currency}.svg`
    }))

    const onSubmit = (data: FormInputs) => {
        setLoading(true)
        setTimeout(() => {
            const fromToken = prices.find((p) => p.currency === data.from)
            const toToken = prices.find((p) => p.currency === data.to)

            if (fromToken && toToken) {
                const exchangeRate = toToken.price / fromToken.price
                setResult(data.amount * exchangeRate)
            } else {
                setResult(null)
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="max-w-md w-[100%] mx-auto bg-white shadow-lg p-6 rounded-md">
            <h1 className="bg-linear-wipe bg-200% text-transparent bg-clip-text animate-shine font-bold m-0 mt-2 text-3xl leading-[72px]">
                Currency Swap
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="w-[100%]">
                    <label className="block font-medium mb-1">From:</label>
                    <Select
                        options={options}
                        onChange={(selected) =>
                            setValue('from', selected?.value || '')
                        }
                        components={{
                            Option: CustomOption,
                            SingleValue: CustomSingleValue
                        }}
                        styles={customStyles}
                        className="text-black"
                    />
                    {errors.from && (
                        <p className="text-red-500 text-sm">
                            {errors.from.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block font-medium mb-1">To:</label>
                    <Select
                        options={options}
                        onChange={(selected) =>
                            setValue('to', selected?.value || '')
                        }
                        components={{
                            Option: CustomOption,
                            SingleValue: CustomSingleValue
                        }}
                        styles={customStyles}
                        className="text-black"
                    />
                    {errors.to && (
                        <p className="text-red-500 text-sm">
                            {errors.to.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block font-medium mb-1">Amount:</label>
                    <input
                        type="number"
                        {...register('amount')}
                        className="border p-3 rounded w-full"
                        placeholder="Enter amount"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm">
                            {errors.amount.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? (
                        <FaSpinner className="animate-spin inline-block" />
                    ) : (
                        'Swap'
                    )}
                </button>
            </form>
            {result !== null && (
                <p className="mt-4 text-lg font-medium">
                    Result:{' '}
                    <span className="mt-4 text-lg font-medium text-green-500">
                        {result.toFixed(2)}$
                    </span>
                </p>
            )}
        </div>
    )
}

export default ExchangeForm
