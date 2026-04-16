import { DOCTORS } from "./doctors";

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  displayTime: string;
  status: "Open" | "Booked" | "Busy";
}

export const INITIAL_SLOTS: TimeSlot[] = [];

const todayStr = new Date().toISOString().split("T")[0];
const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

DOCTORS.forEach(doc => {
  times.forEach((t, i) => {
    const [h, m] = t.split(":").map(Number);
    const displayTime = `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
    INITIAL_SLOTS.push({
      id: `slot-${doc.id}-${i}`,
      doctorId: doc.id,
      date: todayStr,
      time: t,
      displayTime,
      status: Math.random() > 0.7 ? "Booked" : Math.random() > 0.8 ? "Busy" : "Open"
    });
  });
});
