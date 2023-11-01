import { API_URL } from "~/utils/constants";

const AdminStep0 = ({ id }: { id: string }) => {
//   async function createSchool(formData: FormData) {
//     'use server';
//     const schoolName = formData.get('schoolName');
//     const city = formData.get('city');
//     const address = formData.get('address');
//     console.log(schoolName, city, address, formData);
//     // mutate data

//     await fetch(`${API_URL}/schools/${id}`, {
//       method: 'POST',
//       body: JSON.stringify({
//         name: schoolName,
//         city,
//         address,
//       }),
//     });
//   }
  return (
    <form>
      <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
        Empecemos con la Escuela ✨
      </h1>
      <div className="space-y-4 mb-8">
        {/* Company Name */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="schoolName"
          >
            Nombre <span className="text-rose-500">*</span>
          </label>
          <input
            id="schoolName"
            name="schoolName"
            className="form-input w-full"
            type="text"
          />
        </div>
        {/* City and Postal Code */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              Ciudad <span className="text-rose-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              className="form-input w-full"
              type="text"
            />
          </div>
        </div>
        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Dirección <span className="text-rose-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            className="form-input w-full"
            type="text"
          />
        </div>
        {/* Country */}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto"
          type="submit"
        >
          Siguiente -&gt;
        </button>
      </div>
    </form>
  );
};

export default AdminStep0;
