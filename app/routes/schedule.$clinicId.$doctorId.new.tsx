import { useNavigate } from '@remix-run/react';
import ModalBasic from '~/components/modal-basic';

const DoctorSchedule = () => {
  const navigate = useNavigate();
  return (
    <ModalBasic
      isOpen={true}
      setIsOpen={() => navigate(-1)}
      title="Confirma tus detalles"
    >
      <form method="post">
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
              Crea un nuevo tipo de evento para que puedan registrar citas 🙌
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nombre <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                className="form-input w-full px-2 py-1"
                type="text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Telefono
              </label>
              <input
                id="phone"
                name="phone"
                className="form-input w-full px-2 py-1"
                type="number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-input w-full px-2 py-1"
                type="email"
              />
            </div>
            {/* TODO: add notes to the event */}
            {/* <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Descripcion <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                className="form-textarea w-full px-2 py-1"
                rows={4}
                name="description"
                required
              ></textarea>
            </div> */}
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancelar
            </button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              type="submit"
            >
              Agendar
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
};

export default DoctorSchedule;
