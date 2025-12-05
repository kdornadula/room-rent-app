import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function BookingModal({ room, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    tenantName: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(room.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card w-full max-w-md relative bg-surface">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-text"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Book {room.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tenant Name</label>
            <input
              type="text"
              required
              value={formData.tenantName}
              onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
              className="w-full"
              placeholder="Full Name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Check In</label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check Out</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                min={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                className="w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
