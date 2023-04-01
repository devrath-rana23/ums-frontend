import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDebounce } from '../../../hooks'

export const SelectWithAutoComplete = ({
  label,
  value = '',
  options = [],
  onChange = () => { },
  onChangeQuery = false,
  addClass = '',
  keyText = '',
  placeholder = '',
  multiple = false,
  required = false,
  optionClass = '',
  optionView,
  useDebounceTime = 1000,
  minChar = 0
}) => {
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => { if (onChangeQuery) { onChangeQuery(query) } }, [useDebounce(query, useDebounceTime)]);

  const filteredOptions =
    query === ''
      ? options :
      (onChangeQuery ? options :
        options.filter((option) =>
          (keyText && option && option[keyText] ? option[keyText] : option || '')
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        ))

  const onChangeOption = (value) => {
    setSelected(value)
    onChange({ target: { value } })
  }

  const onChangeOptionQuery = (value) => {
    setQuery(value)
  }
  
  return (
    <>
      {label && <label className="text-sm mb-1 block leading-5 font-medium">{label}</label>}
      <Combobox
        multiple={multiple}
        value={multiple ? [...value] : value}
        onChange={onChangeOption}
      >
        <div className="relative mt-1 w-full">
          <div className="relative w-full">
            <Combobox.Input
              className={`${value?.length ? 'pr-10' : 'pr-8'} border w-full outline-none text-left text-base leading-6 text-gray-500 font-normal placeholder:mr-3 border-gray-300 p-2 rounded-md ${addClass}`}
              displayValue={(option) => keyText && option && option[keyText] ? option[keyText] : option}
              onChange={(event) => onChangeOptionQuery(event.target.value)}
              placeholder={placeholder}
              required={required}
            />
            {value &&
              <button className="absolute inset-y-0 right-5 flex items-center cursor-pointer" onClick={() => onChangeOption(keyText ? null : '')}>
                <XMarkIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            }
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-1">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {query?.length >= minChar ?
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => onChangeOptionQuery('')}
            >
              <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full max-w-[-webkit-fill-available] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredOptions.length === 0 && query?.length >= minChar ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4` +
                        `${active ? ' text-blueColor bg-blue-100' : ' text-gray-900'}` +
                        `${optionClass ? ` ${optionClass}` : ' '}`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        (
                          optionView ?
                            optionView(keyText, option, selected, active)
                            :
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {keyText && option && option[keyText] ? option[keyText] : option}
                              </span>
                              {selected &&
                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-blueColor bg-blue-100' : ''}`}>
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              }
                            </>
                        )
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition> : <></>}
        </div>
      </Combobox>
    </>
  )
}
