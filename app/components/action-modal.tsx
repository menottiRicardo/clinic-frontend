import { Dialog, Transition } from '@headlessui/react';
export interface ActionModalProps {
  action: 'delete' | 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}
const ActionModal = ({
  action,
  isOpen,
  onClose,
  description,
  title,
}: ActionModalProps) => {
  const handleAction = () => {
    switch (action) {
      case 'delete':
        return (
          <div className="p-5 flex space-x-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
              <svg
                className="w-4 h-4 shrink-0 fill-current text-rose-500"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
              </svg>
            </div>
            {/* Content */}
            <div>
              {/* Modal header */}
              <div className="mb-2">
                <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </div>
              </div>
              {/* Modal content */}
              <div className="text-sm mb-10">
                <div className="space-y-2">
                  <p>{description}</p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <form method="post">
                  <button
                    className="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                    type="submit"
                  >
                    Si, eliminar
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
    return null;
  };
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
            {handleAction()}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ActionModal;
