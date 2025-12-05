import React from 'react';
import { differenceInDays, format } from 'date-fns';
import { Calendar, User, CheckCircle, XCircle, Clock, BedDouble } from 'lucide-react';

export default function RoomCard({ room, onBook, onCheckout }) {
  const isOccupied = room.status === 'occupied';
  
  let daysLeft = 0;
  if (isOccupied && room.currentBooking) {
    const today = new Date();
    const end = new Date(room.currentBooking.checkOut);
    daysLeft = differenceInDays(end, today);
  }

  return (
    <div className="card animate-fade-in flex flex-col h-full">
      {/* Header: Icon + Name + Status */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="text-muted">
            <BedDouble size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Room {room.name}</h3>
          </div>
        </div>
        
        <span className={`badge ${isOccupied ? 'badge-danger' : 'badge-success'}`}>
          {isOccupied ? <XCircle size={14} /> : <CheckCircle size={14} />}
          {isOccupied ? 'Booked' : 'Available'}
        </span>
      </div>

      {/* Sub-header: Type */}
      <div className="mb-4 pl-9">
        <p className="text-muted text-sm font-medium">{room.type}</p>
      </div>

      {/* Price */}
      <div className="mb-6 pl-9">
        <p className="text-primary font-bold text-lg">
          $ {room.price} <span className="text-muted text-sm font-normal">/ night</span>
        </p>
      </div>

      {/* Action Area */}
      <div className="mt-auto">
        {isOccupied ? (
          <div className="space-y-3 bg-black/20 p-3 rounded-xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted flex items-center gap-2"><User size={14}/> Tenant</span>
              <span className="font-medium">{room.currentBooking.tenantName}</span>
            </div>
            <div className="flex items-center justify-between text-sm" style={{ color: daysLeft < 2 ? 'var(--danger)' : 'var(--text)' }}>
              <span className="text-muted flex items-center gap-2"><Clock size={14}/> Time Left</span>
              <span className="font-medium">{daysLeft > 0 ? `${daysLeft} days` : 'Due today'}</span>
            </div>
            <button onClick={() => onCheckout(room.id)} className="btn btn-secondary w-full text-sm py-2">
              Check Out
            </button>
          </div>
        ) : (
          <button onClick={() => onBook(room)} className="btn btn-primary w-full py-3">
            <Calendar size={18} className="mr-2" />
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}
