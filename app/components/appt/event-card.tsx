import { Link } from '@remix-run/react';
import type { Event } from '~/utils/types';
import ToggleSwitch from '../toggle-switch';
import { ExternalLink, Link2, Trash2 } from 'lucide-react';

interface EventCardProps extends Event {
  hidden?: boolean;
}
const EventCard = ({ _id, title, visibility, description }: EventCardProps) => {
  return (
    <div
      className={`shadow-lg w-full rounded-md border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
    >
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
        {/* Left side */}
        <Link to={`${_id}`} className="cursor-pointer">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div>
              <div className="inline-flex font-semibold text-slate-800 dark:text-slate-100">
                {title}
              </div>
              <div className="text-sm subtitle">{description}</div>
            </div>
          </div>
        </Link>
        {/* Right side */}
        <div className="flex items-center justify-center space-x-4 pl-10 md:pl-0">
          {!visibility && (
            <div className="text-sm subtitle italic">No visible</div>
          )}

          <ToggleSwitch checked={visibility as boolean} id={_id} />
          <div className="grid grid-cols-3 divide-x border border-slate-600 divide-slate-600 rounded-lg">
            <Link
              to="ready"
              className="hover:opacity-60 cursor-pointer flex items-center justify-center p-2"
            >
              <ExternalLink size={20} />
            </Link>
            <Link
              to="ready"
              className="hover:opacity-60 cursor-pointer flex items-center justify-center p-2"
            >
              <Link2 size={20} />
            </Link>
            <Link
              to="ready"
              className="hover:opacity-60 cursor-pointer flex items-center justify-center p-2x"
            >
              <Trash2 size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
