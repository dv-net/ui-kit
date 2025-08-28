<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";
  import UiTable from "@/lib/components/UiTable/UiTable.vue";

  import { onMounted, ref } from "vue";

  import { UiTableHeader, UiTableSortObject } from "@/lib/components/UiTable/types";

  interface test {
    firstName: string;
    lastName: string;
    bool: boolean;
    age: {
      test: number;
    };
  }

  const data = ref<test[]>([
    {
      firstName: "Christophe",
      lastName: "Aolan",
      bool: false,
      age: {
        test: 123
      }
    },
    {
      firstName: "Ralf",
      lastName: "Calf",
      bool: undefined,
      age: {
        test: 12
      }
    },
    {
      firstName: "Paul",
      lastName: "Branklin",
      bool: true,
      age: {
        test: 333
      }
    }
  ]);
  const data2 = ref<test[]>([
    {
      firstName: "Ralf",
      lastName: "Calf",
      bool: false,
      age: {
        test: 12
      }
    },
    {
      firstName: "Christophe",
      lastName: "Aolan",
      bool: true,
      age: {
        test: 123
      }
    },

    {
      firstName: "Paasdddddddddul",
      lastName: "Brankasdasdlin",
      bool: true,
      age: {
        test: 12412412
      }
    }
  ]);

  const data3 = ref([
    {
      id: "f3a472ba-3347-47b2-a009-471bddd21489",
      store_id: "c32a5359-7743-4b17-8e71-0c8b0a607df9",
      transaction_id: "54f689d5-d079-474d-a2ef-427290bc1047",
      created_at: "2025-03-14T02:30:01.192414Z",
      is_success: true,
      request:
        '{"amount":"1.1","created_at":"2025-03-13T09:26:06.4537Z","paid_at":"2025-03-13T09:25:03Z","status":"completed","transactions":{"amount":"1.1","amount_usd":"1.1","bc_uniq_key":"2","blockchain":"tron","created_at":"2025-03-13T09:26:06.4537Z","currency":"USDT","currency_id":"USDT.Tron","tx_hash":"2a2e44fa7df4446df1f792b840df4d0d3d67d51bc675efdae423c590c18bc416","tx_id":"54f689d5-d079-474d-a2ef-427290bc1047"},"type":"PaymentReceived","wallet":{"id":"2a8d6a95-f8b3-417b-9fbb-52c9bf53faeb","store_external_id":"142909990"}}',
      response: "123",
      status_code: 200,
      url: "https://ce921fb6-a71e-4f46-92e7-200e4731ea7f.requestcatcher.com/"
    },
    {
      id: "77213f71-a989-42fd-b312-4c3d89289fe8",
      store_id: "c32a5359-7743-4b17-8e71-0c8b0a607df9",
      transaction_id: "54f689d5-d079-474d-a2ef-427290bc1047",
      created_at: "2025-03-14T02:29:59.193216Z",
      is_success: true,
      request:
        '{"amount":"1.1","created_at":"2025-03-13T09:26:06.4537Z","paid_at":"2025-03-13T09:25:03Z","status":"completed","transactions":{"amount":"1.1","amount_usd":"1.1","bc_uniq_key":"2","blockchain":"tron","created_at":"2025-03-13T09:26:06.4537Z","currency":"USDT","currency_id":"USDT.Tron","tx_hash":"2a2e44fa7df4446df1f792b840df4d0d3d67d51bc675efdae423c590c18bc416","tx_id":"54f689d5-d079-474d-a2ef-427290bc1047"},"type":"PaymentReceived","wallet":{"id":"2a8d6a95-f8b3-417b-9fbb-52c9bf53faeb","store_external_id":"142909990"}}',
      response: "123",
      status_code: 200,
      url: "https://ce921fb6-a71e-4f46-92e7-200e4731ea7f.requestcatcher.com/"
    },
    {
      id: "0ec1815c-625c-43e2-bcb2-4738d82803eb",
      store_id: "c32a5359-7743-4b17-8e71-0c8b0a607df9",
      transaction_id: "54f689d5-d079-474d-a2ef-427290bc1047",
      created_at: "2025-03-14T02:29:57.192227Z",
      is_success: true,
      request:
        '{"amount":"1.1","created_at":"2025-03-13T09:26:06.4537Z","paid_at":"2025-03-13T09:25:03Z","status":"completed","transactions":{"amount":"1.1","amount_usd":"1.1","bc_uniq_key":"2","blockchain":"tron","created_at":"2025-03-13T09:26:06.4537Z","currency":"USDT","currency_id":"USDT.Tron","tx_hash":"2a2e44fa7df4446df1f792b840df4d0d3d67d51bc675efdae423c590c18bc416","tx_id":"54f689d5-d079-474d-a2ef-427290bc1047"},"type":"PaymentReceived","wallet":{"id":"2a8d6a95-f8b3-417b-9fbb-52c9bf53faeb","store_external_id":"142909990"}}',
      response: "123",
      status_code: 200,
      url: "https://ce921fb6-a71e-4f46-92e7-200e4731ea7f.requestcatcher.com/"
    }
  ]);

  const columns = ref<UiTableHeader<test>[]>([
    {
      selection: true
    },

    {
      sortable: true,
      label: "Last name",
      name: "lastName",
      summary: () => "asdasd"
    },
    {
      sortable: true,
      label: "bo0l",
      name: "bool"
    },
    {
      label: "Age",
      name: "age.test",
      sortable: "custom",
      sortName: "age",
      summary: (summary) => typeof summary === "number" && summary * 2
    },
    {
      expande: true
    }
  ]);

  const columns2 = ref<UiTableHeader[]>([
    {
      label: "Created",
      name: "created_at"
    },
    {
      label: "Result",
      name: "status_code"
    },
    {
      label: "Request",
      name: "request"
    }
  ]);

  const isLoading = ref(false);
  const ttt = ref<string[]>([]);
  const eeee = ref<string[]>(["Ralf"]);
  const sss = ref<string[]>(["Ralf", "Paul"]);

  async function test2() {
    return await new Promise((res) => {
      setTimeout(() => {
        res(data2.value);
      }, 2000);
    });
  }

  async function sortChange(order) {
    console.log(order);
    if (order.name !== "lastName") {
      isLoading.value = true;
      data.value = await test2();
      isLoading.value = false;
    }
  }

  const meta = ref({
    page: 1,
    perPage: 200,
    total: 100
  });

  const meta2 = ref({
    page: 1,
    perPage: 20,
    next_page_exists: true
  });

  const sortObj = ref<UiTableSortObject>();

  function changePagination(e) {
    console.log(e);
  }

  function changePagination2(e) {
    meta2.value = {
      ...e,
      next_page_exists: e.page !== 3
    };
  }

  onMounted(() => {
    sortObj.value = { order: "asc", name: "lastName" };
  });
</script>

<template>
  <div class="page">
    <h1 class="global-title">Table</h1>

    <div class="grid">
      <div class="grid__header">Controls</div>
      <div>
        <UiSwitch label="IsLoading" v-model="isLoading" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Example 1</div>
      <UiTable
        @changePagination="changePagination"
        @sort-change="sortChange"
        :row-class="() => '123'"
        highlight-row="even"
        selectedKey="age"
        disabledKey="firstName"
        expande-key="firstName"
        v-model:disabled="sss"
        v-model:expanded="eeee"
        v-model:selected="ttt"
        v-model:sort="sortObj"
        :loading="isLoading"
        :data="data"
        :headers="columns"
        :meta="meta"
      />
    </div>

    <div class="grid">
      <div class="grid__header">Example 2</div>
      <UiTable
        :loading="isLoading"
        @changePagination="changePagination2"
        :data="data3"
        :headers="columns2"
        :meta="meta2"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .row-red {
    background: #fcd5ce;
  }
</style>
