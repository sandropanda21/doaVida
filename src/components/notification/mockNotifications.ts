import { Notification } from "./notificationType";

// Apenas para desenvolvimento — em produção os dados vêm do backend.
// A mensagem NÃO é armazenada aqui; é gerada dinamicamente no NotificationItem
// a partir de bloodType e donorCount.
export const notifications: Notification[] = [
  {
    id: "1",
    type: "BLOOD_REQUEST",
    requestId: "req-001",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // há 5 min
    bloodType: "O+",
  },
  {
    id: "2",
    type: "BLOOD_REQUEST",
    requestId: "req-002",
    read: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // há 45 min
    bloodType: "AB+",
  },
  {
    id: "3",
    type: "DONOR_FOUND",
    requestId: "req-003",
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // há 2h
    donorCount: 3,
  },
];
