import React, { ReactElement } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Combobox, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { suggestedQuestionsAPI } from "../../utils/apiFunctions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { options } from "../../redux/optionsSlice";

interface Props {
  data: any;
}

function TestModal({ data }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(options);
  

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const categories = data.categories;
  const difficulty = data.difficulty;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const initialState = {
    categoryId: `${categories[0].id}`,
    difficultyId: `${difficulty[0].id}`,
    number: 1,
  };

  //formformInputArray
  const [formInput, setFormInput] = useState([initialState]);

  const clearState = () => {
    setFormInput([initialState]);
  };

  // handle input change
  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const list = [...formInput] as any;
    list[index][name] = value;
    setFormInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: any) => {
    const list = [...formInput];
    list.splice(index, 1);
    setFormInput(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setFormInput([
      ...formInput,
      {
        categoryId: `${categories[0].id}`,
        difficultyId: `${difficulty[0].id}`,
        number: 1,
      },
    ]);
  };

  const formSubmit = (formInput: any) => {
    const values = { criteria: formInput, previous: questions };
    console.log(values);
    suggestedQuestionsAPI(dispatch, values).then(clearState); //pass dispatch too !
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setOpen(true)}
        >
          Find Questions
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
                        {formInput.map((x, i) => {
                          return (
                            <div className="mt-2 grid md:grid-cols-4 grid-cols-1 border p-2 rounded-xl">
                              <div className="p-2 col-span-4">
                                <label htmlFor="categoryId">Category</label>
                                <select
                                  className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-4  text-black focus:border-black focus:ring-black sm:text-sm"
                                  placeholder="Select a category"
                                  name="categoryId"
                                  id="categoryId"
                                  value={x.categoryId}
                                  onChange={(e) => handleInputChange(e, i)}
                                >
                                  {categories.map((category: any) => (
                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="p-2 col-span-2">
                                <label htmlFor="difficultyId">difficulty</label>
                                <select
                                  className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-4  text-black focus:border-black focus:ring-black sm:text-sm"
                                  placeholder="Select a category"
                                  name="difficultyId"
                                  id="difficultyId"
                                  value={x.difficultyId}
                                  onChange={(e) => handleInputChange(e, i)}
                                >
                                  {difficulty.map((level: any) => (
                                    <option key={level.name} value={level.id}>
                                      {level.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="p-2 col-span-2">
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

                              {formInput.length !== 1 && (
                                <button
                                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </button>
                              )}
                              {formInput.length - 1 === i && (
                                <button
                                  className="inline-flex col-start-4 items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => formSubmit(formInput)}
                    >
                      Submit
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
