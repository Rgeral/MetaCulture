import React, { useState, useEffect, useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Circles } from 'react-loader-spinner'

export default function MintNFT() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch('YOUR_PHOTO_URL_HERE');
        const data = await response.blob();
        setPhoto(URL.createObjectURL(data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setLoading(false);
      }
    };

    fetchPhoto();

    // Clean up URL object to avoid memory leaks
    return () => URL.revokeObjectURL(photo);
  }, []);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-lg">
              <div className="bg-indigo-100 px-2 pb-3 pt-3 sm:p-3 sm:pb-2">
                <div className="sm:flex  place-content-center">
                  <div>
                  </div>
                  <div className="mt-3 text-center sm:ml-0 sm:mt-0">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className='place-content-center'>
                        <div>
                          <img src={photo} alt="Server photo" className="inline-block ring-2 ring-white" />
                          <p className="text-indigo-600 text-m">You win a NFT!</p>
                        </div>
                        <div className="bg-indigo-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="inline-flex w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 sm:ml-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                          >
                            Super
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const Spinner = () => {
  return <Circles
    height="110"
    width="110"
    color="#4F46E5"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />;
};
