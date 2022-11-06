import React, { ReactElement } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Combobox, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props {
  data: any;
}

function TestModal({ data }: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const categories = data.categories;
  const difficulty = data.difficulty;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  //categories combobox
  const [query, setQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   console.log(selectedCategory);
  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category: any) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });
  //difficulty combobox
  const [diff, setDiff] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  //   console.log(selectedDifficulty);
  const filteredDifficulties =
    diff === ""
      ? difficulty
      : difficulty.filter((difficulty: any) => {
          return difficulty.name.includes(diff);
        });

  //formValuesArray
  const [inputList, setInputList] = useState([
    { category: "", difficulty: "", number: "" },
  ]);
  // handle input change
  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle Comboinput change
  const handleComboInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { category: "", difficulty: "", number: "" }]);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setOpen(true)}
        >
          Create New
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center mt-20 p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="grid grid-col-1 items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 text-center"
                    >
                      Select criteria for new test
                    </Dialog.Title>

                    <div className="mt-3 text-left sm:mt-0 sm:ml-4 ">
                      <form>
                        {inputList.map((x, i) => {
                          return (
                            <div className="mt-2 grid md:grid-cols-2 grid-cols-1 border p-2 rounded-xl">
                              <div className="p-2">
                                <label htmlFor="category">Category</label>
                                <select
                                  className="block w-full rounded-full border-gray-300 bg-gray-50 pl-4  text-black focus:border-black focus:ring-black sm:text-sm"
                                  placeholder="Select a category"
                                  name="category"
                                  id="category"
                                  value={x.category}
                                  onChange={(e) => handleInputChange(e, i)}
                                >
                                  {categories.map((category: any) => (
                                    <option
                                      key={category.name}
                                      value={category.name}
                                      
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="p-2">
                                <label
                                  htmlFor="number"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Number of Questions
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="number"
                                    name="number"
                                    id="number"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="1"
                                    value={x.number}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                </div>
                              </div>

                              {inputList.length !== 1 && (
                                <button
                                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </button>
                              )}
                              {inputList.length - 1 === i && (
                                <button
                                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={handleAddClick}
                                >
                                  Add another Category
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </form>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default TestModal;

// <Combobox
// as="div"
// name="selectedCategory"
// value={selectedCategory}
// onChange={() => {
//   setSelectedCategory;
//   // handleInputChange(selectedCategory, i);
// }}
// className="col-span-2 p-2"
// >
// <Combobox.Label className="block text-sm font-medium text-gray-700">
//   Category
// </Combobox.Label>
// <div className=" mt-1">
//   <div className="relative mt-1 ">
//     <Combobox.Input
//       className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//       name="selectedCategory"
//       // value={x.selectedCategory}
//       onChange={(e) => {
//         setQuery(e.target.value);
//         //   handleInputChange(e, i);
//       }}
//       displayValue={(category: any) =>
//         category?.name
//       }
//     />

//     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//       <ChevronUpDownIcon
//         className="h-5 w-5 text-gray-400"
//         aria-hidden="true"
//       />
//     </Combobox.Button>
//   </div>

//   {filteredCategories.length > 0 && (
//     <Combobox.Options className=" z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//       {filteredCategories.map(
//         (category: any) => (
//           <Combobox.Option
//             key={category.id}
//             value={category}
//             className={({ active }) =>
//               classNames(
//                 "relative cursor-default select-none py-2 pl-8 pr-4",
//                 active
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-900"
//               )
//             }
//           >
//             {({ active, selected }) => (
//               <>
//                 <span
//                   className={classNames(
//                     "block truncate",
//                     selected && "font-semibold"
//                   )}
//                 >
//                   {category.name}
//                 </span>

//                 {selected && (
//                   <span
//                     className={classNames(
//                       "absolute inset-y-0 left-0 flex items-center pl-1.5",
//                       active
//                         ? "text-white"
//                         : "text-indigo-600"
//                     )}
//                   >
//                     <CheckIcon
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                   </span>
//                 )}
//               </>
//             )}
//           </Combobox.Option>
//         )
//       )}
//     </Combobox.Options>
//   )}
// </div>
// </Combobox>

// <Combobox
// as="div"
// name="difficulty"
// value={selectedDifficulty}
// onChange={setSelectedDifficulty}

// className="p-2"
// >
// <Combobox.Label className="block text-sm font-medium text-gray-700">
//   Difficulty
// </Combobox.Label>
// <div className=" mt-1">
//   <div className="relative mt-1 ">
//     <Combobox.Input
//       className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//       name="difficulty"
//       onChange={(event) => {
//         setDiff(event.target.value);

//         // handleInputChange(event, i);
//       }}
//       displayValue={(difficulty: any) =>
//         difficulty?.name
//       }
//     />

//     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//       <ChevronUpDownIcon
//         className="h-5 w-5 text-gray-400"
//         aria-hidden="true"
//       />
//     </Combobox.Button>
//   </div>

//   {filteredDifficulties.length > 0 && (
//     <Combobox.Options className=" z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//       {filteredDifficulties.map(
//         (difficulty: any) => (
//           <Combobox.Option
//             key={difficulty.id}
//             value={difficulty}
//             className={({ active }) =>
//               classNames(
//                 "relative cursor-default select-none py-2 pl-8 pr-4",
//                 active
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-900"
//               )
//             }
//           >
//             {({ active, selected }) => (
//               <>
//                 <span
//                   className={classNames(
//                     "block truncate",
//                     selected && "font-semibold"
//                   )}
//                 >
//                   {difficulty.name}
//                 </span>

//                 {selected && (
//                   <span
//                     className={classNames(
//                       "absolute inset-y-0 left-0 flex items-center pl-1.5",
//                       active
//                         ? "text-white"
//                         : "text-indigo-600"
//                     )}
//                   >
//                     <CheckIcon
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                   </span>
//                 )}
//               </>
//             )}
//           </Combobox.Option>
//         )
//       )}
//     </Combobox.Options>
//   )}
// </div>
// </Combobox>
