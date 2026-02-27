<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import { UiChat } from "@/lib";
  import type { UiChatMessage, UiChatTicket } from "@/lib/components/UiChat/types";

  const MY_UUID = "user-001";
  const TICKET_UUID = "uuid";
  const SUPPORT_UUID = "support-001";
  const emptyUser = (uuid: string) => ({ uuid, avatar: null, telegram: null, email: "", name: null });
  const mockMessages: UiChatMessage[] = [
    {
      id: 1,
      ticket_id: 1,
      message: "Hello! I'm having a problem with my order payment.",
      created_at: "2026-02-15 10:01:00",
      updated_at: "2026-02-15 10:01:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 2,
      ticket_id: 1,
      message: "Good afternoon! Could you please provide the order number?",
      created_at: "2026-02-15 10:02:00",
      updated_at: "2026-02-15 10:02:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 3,
      ticket_id: 1,
      message: "Order #48291. The payment has failed for the second time already.",
      created_at: "2026-02-15 10:03:00",
      updated_at: "2026-02-15 10:03:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 4,
      ticket_id: 1,
      message: "Thank you, let me check. One moment please.",
      created_at: "2026-02-15 10:04:00",
      updated_at: "2026-02-15 10:04:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 5,
      ticket_id: 1,
      message: "The issue was on the payment gateway side. Please try again now.",
      created_at: "2026-02-15 10:12:00",
      updated_at: "2026-02-15 10:12:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 6,
      ticket_id: 1,
      message: "It went through, thank you!",
      created_at: "2026-02-15 10:14:00",
      updated_at: "2026-02-15 10:14:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 7,
      ticket_id: 1,
      message: "Happy to help! Feel free to reach out if you have any more questions.",
      created_at: "2026-02-15 10:15:00",
      updated_at: "2026-02-15 10:15:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 8,
      ticket_id: 1,
      message: "Hi, it's me again. I wanted to check the delivery status.",
      created_at: "2026-02-16 14:30:00",
      updated_at: "2026-02-16 14:30:00",
      files: [],
      attachments: [],
      user: emptyUser(MY_UUID)
    },
    {
      id: 9,
      ticket_id: 1,
      message: "Hello! Your order has been handed to the courier, expect delivery today by 6:00 PM.",
      created_at: "2026-02-16 14:35:00",
      updated_at: "2026-02-16 14:35:00",
      files: [],
      attachments: [],
      user: emptyUser(SUPPORT_UUID)
    },
    {
      id: 10,
      ticket_id: 1,
      message: "Great, I'll be waiting. Thanks!",
      created_at: "2026-02-16 14:36:00",
      updated_at: "2026-02-16 14:36:00",
      files: ["https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg"],
      attachments: [
        {
          uuid: "img-001",
          type: "image/jpeg",
          title: "frog.jpg",
          url: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg",
          file_size: 1024
        }
      ],
      user: emptyUser(MY_UUID)
    },
    {
      id: 11,
      ticket_id: 1,
      message: "Go to link: \n https://github.com/",
      created_at: "2026-02-16 14:40:00",
      updated_at: "2026-02-16 14:40:00",
      files: [
        "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg",
        "https://avatarko.ru/img/kartinka/18/multfilm_kotenok_snezhinka_17593.jpg"
      ],
      attachments: [
        {
          uuid: "img-001",
          type: "image/jpeg",
          title: "frog.jpg",
          url: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg",
          file_size: 1024
        },
        {
          uuid: "img-002",
          type: "image/jpeg",
          title: "kitten.jpg",
          url: "https://avatarko.ru/img/kartinka/18/multfilm_kotenok_snezhinka_17593.jpg",
          file_size: 1024
        }
      ],
      user: emptyUser(MY_UUID)
    }
  ];
  const ticket: UiChatTicket = {
    id: 83545,
    subject: "I need to pay using a different method",
    status: { name: "Online", value: 3 },
    created_at: "2025-10-12 22:17:45",
    updated_at: "2025-10-13 00:27:12",
    closed_at: null,
    messages_count: 9,
    init_message: mockMessages[0],
    support_name: "Sofia"
  };

  const showAlert = ref(true);
  const isLoadingMessages = ref(false);
  const isLoadingSend = ref(false);
  const uiChatRef = ref();
  const messages = ref<UiChatMessage[]>([]);
  const alertSeconds = ref(90);
  let timer: ReturnType<typeof setInterval>;

  const loadMessages = async () => {
    try {
      isLoadingMessages.value = true;
      await new Promise((res) => setTimeout(res, 3000));
      messages.value = mockMessages;
    } finally {
      isLoadingMessages.value = false;
    }
  };

  const onSubmit = async () => {
    try {
      isLoadingSend.value = true;
      await new Promise((res) => setTimeout(res, 3000));
      uiChatRef.value?.clearInputAndFiles();
    } catch (e) {
      console.log(e);
    } finally {
      isLoadingSend.value = false;
    }
  };

  onMounted(() => {
    void loadMessages();
    timer = setInterval(() => {
      if (alertSeconds.value > 0) {
        alertSeconds.value--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  });

  onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="page">
    <h1 class="global-title">Chat</h1>
    <UiChat
      ref="uiChatRef"
      :ticket="ticket"
      :ticket-loading="isLoadingMessages"
      :messages="messages"
      :current-user-uuid="MY_UUID"
      :show-manager-alert="showAlert"
      :manager-alert-seconds="alertSeconds"
      :sending-loading="isLoadingSend"
      :is-create-ticket="!TICKET_UUID"
      @submit="onSubmit"
    />
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
