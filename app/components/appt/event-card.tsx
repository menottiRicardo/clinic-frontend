import { Link } from '@remix-run/react';
import type { Event } from '~/utils/types';
import { ClockIcon, ExternalLink, Link2, Trash2 } from 'lucide-react';

interface EventCardProps extends Event {
  hidden?: boolean;
}
const EventCard = ({ _id, title, duration, description }: EventCardProps) => {
  return (
    <div
      className={`shadow-lg w-full rounded-md border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
    >
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
        {/* Left side */}
        <Link to={`${_id}`} className="cursor-pointer">
          <div className="flex flex-col items-start space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-100">
              {title}
            </div>
            <div className="text-sm subtitle">{description}</div>
            <div className="bg-slate-600 flex grow-0 text-xs gap-0.5 rounded-md w-12 px-1 py-0.5 items-center justify-center text-white">
              <ClockIcon size={20} /> {duration}m
            </div>
          </div>
        </Link>
        {/* Right side */}
        <div className="flex items-center justify-end space-x-4">
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
              to={`delete?id=${_id}`}
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
