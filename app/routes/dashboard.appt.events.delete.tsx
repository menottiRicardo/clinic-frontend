import { redirect, type LoaderFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ActionModal from '~/components/action-modal';
import { getSession } from '~/sessions';
import { APPT_API_URL } from '~/utils/constants';

export const action: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  try {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('accessToken');
    const res = await fetch(`${APPT_API_URL}/events/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: 'delete',
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    if (data.deletedCount === 1) {
      return redirect('/dashboard/appt/events');
    }
    return null;
  } catch (error) {
    console.log('step6', error);
    return null;
  }
};
const NewEvent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ActionModal
        isOpen={true}
        onClose={() => navigate('/dashboard/appt/events')}
        title="Eliminar evento"
        description="¿Estas seguro que quieres eliminar este evento?"
        action="delete"
      />
    </div>
  );
};

export default NewEvent;
