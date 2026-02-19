<script setup lang="ts">
  import { UiChat } from "@/lib";
  import type { UiChatMessage, UiChatTicket } from "@/lib/components/UiChat/types";

  const MY_UUID = "user-001";
  const SUPPORT_UUID = "support-001";

  const emptyUser = (uuid: string) => ({ uuid, avatar: null, telegram: null, email: "", name: null });

  const messages: UiChatMessage[] = [
    {
      id: 1,
      ticket_id: 1,
      message: "Здравствуйте! У меня проблема с оплатой заказа.",
      created_at: "2026-02-15 10:01:00",
      updated_at: "2026-02-15 10:01:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 2,
      ticket_id: 1,
      message: "Добрый день! Подскажите, пожалуйста, номер заказа.",
      created_at: "2026-02-15 10:02:00",
      updated_at: "2026-02-15 10:02:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 3,
      ticket_id: 1,
      message: "Заказ №48291. Оплата не проходит уже второй раз.",
      created_at: "2026-02-15 10:03:00",
      updated_at: "2026-02-15 10:03:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 4,
      ticket_id: 1,
      message: "Спасибо, сейчас проверю. Одну минуту.",
      created_at: "2026-02-15 10:04:00",
      updated_at: "2026-02-15 10:04:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 5,
      ticket_id: 1,
      message: "Проблема была на стороне платёжного шлюза. Попробуйте повторить оплату сейчас.",
      created_at: "2026-02-15 10:12:00",
      updated_at: "2026-02-15 10:12:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 6,
      ticket_id: 1,
      message: "Всё прошло, спасибо!",
      created_at: "2026-02-15 10:14:00",
      updated_at: "2026-02-15 10:14:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 7,
      ticket_id: 1,
      message: "Рад помочь! Если возникнут ещё вопросы — обращайтесь.",
      created_at: "2026-02-15 10:15:00",
      updated_at: "2026-02-15 10:15:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 8,
      ticket_id: 1,
      message: "Добрый день, снова я. Хотел уточнить статус доставки.",
      created_at: "2026-02-16 14:30:00",
      updated_at: "2026-02-16 14:30:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 9,
      ticket_id: 1,
      message: "Здравствуйте! Ваш заказ передан курьеру, ожидайте доставку сегодня до 18:00.",
      created_at: "2026-02-16 14:35:00",
      updated_at: "2026-02-16 14:35:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 10,
      ticket_id: 1,
      message: "Отлично, буду ждать. Спасибо!",
      created_at: "2026-02-16 14:36:00",
      updated_at: "2026-02-16 14:36:00",
      files: ["https://epnnet.dev//storage/converted/69947fadb8b499.42059641.jpg"],
      attachments: [
        {
          uuid: "img-001",
          type: "image/jpeg",
          title: "photo.jpg",
          url: "https://epnnet.dev//storage/converted/6992e2d96541e5.73846050.jpg",
          file_size: 1024
        }
      ],
      user: emptyUser(MY_UUID)
    },
    {
      id: 11,
      ticket_id: 1,
      message: "",
      created_at: "2026-02-16 14:40:00",
      updated_at: "2026-02-16 14:40:00",
      files: [
        "https://epnnet.dev//storage/converted/6992e2d96541e5.73846050.jpg",
        "https://epnnet.dev//storage/converted/69947fadb8b499.42059641.jpg"
      ],
      attachments: [
        {
          uuid: "img-001",
          type: "image/jpeg",
          title: "photo.jpg",
          url: "https://epnnet.dev//storage/converted/6992e2d96541e5.73846050.jpg",
          file_size: 1024
        },
        {
          uuid: "img-002",
          type: "image/jpeg",
          title: "photo222.jpg",
          url: "https://epnnet.dev//storage/converted/69947fadb8b499.42059641.jpg",
          file_size: 1024
        }
      ],
      user: emptyUser(MY_UUID)
    }
  ];

  const ticket: UiChatTicket = {
    id: 83545,
    subject: "Мне необходимо оплатить другим способом",
    status: { name: "Online", value: 3 },
    created_at: "2025-10-12 22:17:45",
    updated_at: "2025-10-13 00:27:12",
    closed_at: null,
    messages_count: 9,
    init_message: messages[0],
    support_name: "Sofia"
  };
</script>

<template>
  <div class="page">
    <h1 class="global-title">Chat</h1>
    <UiChat :ticket="ticket" :messages="messages" :current-user-uuid="MY_UUID" />
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
