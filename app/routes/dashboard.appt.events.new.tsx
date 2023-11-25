import { redirect, type LoaderFunction } from '@remix-run/node';
import { Form, useNavigate } from '@remix-run/react';
import React from 'react';
import ModalBasic from '~/components/modal-basic';
import { createEvent } from '~/utils/api.server';

export const action: LoaderFunction = async ({ request }) => {
  const formData = await request.formData();
  const event = Object.fromEntries(formData);
  const res = await createEvent(request, event as any);

  return redirect('/dashboard/appt/events');
};
const NewEvent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ModalBasic
        isOpen={true}
        setIsOpen={() => navigate('/dashboard/appt/events')}
        title="Crear nuevo evento"
      >
        {/* Modal content */}
        <form method="post">
          <div className="px-5 py-4">
            <div className="text-sm">
              <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                Crea un nuevo tipo de evento para que puedan registrar citas 🙌
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="title"
                >
                  Titulo <span className="text-rose-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  className="form-input w-full px-2 py-1"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="duration"
                >
                  Duracion <span className="text-rose-500">*</span>
                </label>
                <input
                  id="duration"
                  name="duration"
                  className="form-input w-full px-2 py-1"
                  type="number"
                  min={10}
                  defaultValue={15}
                  required
                />
              </div>
              <div>
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
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard/appt/events');
                }}
              >
                Cancelar
              </button>
              <button
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                type="submit"
              >
                Crear
              </button>
            </div>
          </div>
        </form>
      </ModalBasic>
    </div>
  );
};

export default NewEvent;
