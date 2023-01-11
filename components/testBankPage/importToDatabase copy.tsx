import React, {
  ReactElement,
  useRef,
  Fragment,
  useState,
  useCallback,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Dropzone, { useDropzone } from "react-dropzone";
import { BsFillFolderFill } from "react-icons/bs";
import * as XLSX from "xlsx";

interface Props {
  data: any;
}

function ImportToDatabasee({ data }: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [excelFile, setExcelFile] = useState({
    path: "No File Attached, Please select an excel file to be imported",
  });
  const [excelData, setExcelData] = useState(null);

  console.log(excelFile);
  console.log(excelData);

  const inputExcel = async () => {
    //turn excel file into json format
    // if(excelFile!==null){
    // const workbook = XLSX.readFile(excelFile[0].path);
    // const Questions = workbook.SheetNames[0];
    // const QuestionSheet=workbook.Sheets[Questions];
    // const info: any= XLSX.utils.sheet_to_json(QuestionSheet);
    // setExcelData(info);
    //   }
    //   else{
    //     setExcelData(null);
    //   }

    // send the excelFile data as json to the api
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="mr-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setOpen(true)}
        >
          Import to Database
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

                   <div>

                    <div className="mt-3 text-left sm:mt-0 sm:ml-4 ">
                      <form>
                        <div className=" flex w-full items-center justify-center ">
                          <label
                            htmlFor="resume"
                            className="bg-grey-500 dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:bg-black dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <Dropzone
                              onDrop={useCallback((acceptedFiles: any) => {
                                setExcelFile(acceptedFiles[0]);
                              }, [])}
                            >
                              {({
                                getRootProps,
                                getInputProps,
                                acceptedFiles,
                              }) => (
                                <section>
                                  <div
                                    className="flex flex-col items-center justify-center pt-5 pb-6"
                                    {...getRootProps()}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="mb-3 h-10 w-10 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      ></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      ONLY UPLOAD EXCEL FILES (.xlsx)
                                    </p>
                                    <input
                                      {...getInputProps()}
                                      id="resume"
                                      type="file"
                                      name="resume"
                                    />
                                  </div>
                                  <div>
                                    {/* {acceptedFiles.map((file) => (
                                      <div className="flex" key={Math.random()}>
                                        <BsFillFolderFill className="mr-3" />
                                        <p className="">{file.name}</p>
                                      </div>
                                    ))} */}
                                    <div className="flex ">
                                      <BsFillFolderFill className="mr-3" />
                                      <p className="">{excelFile!.path!}</p>
                                    </div>
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </label>
                        </div>
                      </form>
                      
                      
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => inputExcel()}
                    >
                      Submit
                    </button>
                  </div>

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

export default ImportToDatabasee;


// import React, {
//   ReactElement,
//   useRef,
//   Fragment,
//   useState,
//   useCallback,
// } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Dropzone, { useDropzone } from "react-dropzone";
// import { BsFillFolderFill } from "react-icons/bs";
// import * as XLSX from "xlsx";
// import { read, utils } from "xlsx";

// interface Props {
//   data: any;
// }

// function ImportToDatabase({ data }: Props): ReactElement {
//   const [open, setOpen] = useState(false);
//   const cancelButtonRef = useRef(null);

//   const [excelFile, setExcelFile] = useState({
//     path: "No File Attached, Please select an excel file to be imported",
//   });
//   const [excelData, setExcelData] = useState(null);

//   console.log(excelFile);
//   console.log(excelData);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const file = e.currentTarget.file.files[0];

//     const f = await file.arrayBuffer();
//     const wb = read(f);
//     if (wb.SheetNames.length > 2) return;

//     let questions = utils.sheet_to_json(
//       wb.Sheets[wb.SheetNames[0]!]!
//     );
//     const answers = utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]!]!);
//     questions = questions.map((q: any) => {
//       q.Answers = answers.filter((a: any) => a.QuestionId === q.Id);
//       return q;
//     });
//     console.log({ file, questions, answers, f });
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center">
//         <button
//           type="button"
//           className="mr-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           onClick={() => setOpen(true)}
//         >
//           Import to Database
//         </button>
//       </div>
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-10"
//           initialFocus={cancelButtonRef}
//           onClose={setOpen}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-10 overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center mt-20 p-4 text-center sm:items-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                   <div className="grid grid-col-1 items-center">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg font-medium leading-6 text-gray-900 text-center"
//                     >
//                       Select excel file to import into your database
//                     </Dialog.Title>

//                     <div>
//                       <div className="mt-3 text-left sm:mt-0 sm:ml-4 ">
//                         <form onSubmit={handleSubmit}>
//                           <input type="file" name="file" />
//                           <button type="submit">Upload</button>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </div>
//   );
// }

// export default ImportToDatabase;

