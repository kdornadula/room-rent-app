import React, { useState, useEffect } from 'react';
import { LayoutGrid, Calendar, Home } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import RoomCard from './components/RoomCard';
import AddRoomForm from './components/AddRoomForm';
import BookingModal from './components/BookingModal';
import logo from './assets/logo.png';

function App() {
  const [rooms, setRooms] = useState([]);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates
    const q = query(collection(db, 'rooms'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(roomData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addRoom = async (roomData) => {
    try {
      await addDoc(collection(db, 'rooms'), {
        ...roomData,
        status: 'available',
        currentBooking: null,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room");
    }
  };

  const handleBook = (room) => {
    setBookingRoom(room);
  };

  const confirmBooking = async (roomId, bookingData) => {
    try {
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        status: 'occupied',
        currentBooking: bookingData
      });
      setBookingRoom(null);
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Failed to book room");
    }
  };

  const handleCheckout = async (roomId) => {
    if (window.confirm('Are you sure you want to check out this tenant?')) {
      try {
        const roomRef = doc(db, 'rooms', roomId);
        await updateDoc(roomRef, {
          status: 'available',
          currentBooking: null
        });
      } catch (error) {
        console.error("Error checking out:", error);
        alert("Failed to check out");
      }
    }
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="bg-surface border-b border-white/5 py-6 mb-8">
        <div className="container flex items-center justify-center gap-6">
          <img src={logo} alt="Logo" className="h-24 w-24 object-contain rounded-xl" />
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Room Rent Management System
          </h1>
        </div>
      </header>

      <div className="container">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Rooms Card */}
          <div className="card flex flex-col justify-between h-32">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Total Rooms</p>
              <h2 className="text-4xl font-bold text-white">{stats.total}</h2>
            </div>
            <div className="text-primary/50">
              <LayoutGrid size={24} />
            </div>
          </div>

          {/* Available Now Card */}
          <div className="card flex flex-col justify-between h-32">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Available Now</p>
              <h2 className="text-4xl font-bold text-success">{stats.available}</h2>
            </div>
            <div className="text-success/50">
              <Calendar size={24} />
            </div>
          </div>

          {/* Booked Card */}
          <div className="card flex flex-col justify-between h-32">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Booked</p>
              <h2 className="text-4xl font-bold text-danger">{stats.occupied}</h2>
            </div>
            <div className="text-danger/50">
              <Home size={24} />
            </div>
          </div>
        </div>

        {/* Main Content Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">All Rooms</h2>
          <AddRoomForm onAdd={addRoom} />
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted">
              Loading rooms...
            </div>
          ) : rooms.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted">
              No rooms found. Add one to get started!
            </div>
          ) : (
            rooms.map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onBook={handleBook}
                onCheckout={handleCheckout}
              />
            ))
          )}
        </div>
      </div>

      {bookingRoom && (
        <BookingModal 
          room={bookingRoom} 
          onClose={() => setBookingRoom(null)} 
          onConfirm={confirmBooking} 
        />
      )}
    </div>
  );
}

export default App;
