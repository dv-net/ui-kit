import { reactive } from "vue";

export interface UiKitConfig {
  locale: string;
  uiDatePicker: {
    beginDate: string;
    modelValueFormat: string;
    inputFormat: string;
    translations: {
      invalidDate: string;
      todayPlaceholder: string;
      yesterdayPlaceholder: string;
      emptyPlaceholder: string;
      applyButton: string;
      clearButton: string;
      inputLabelStart: string;
      inputLabelEnd: string;
      presetToday: string;
      presetWeek: string;
      presetMonth: string;
      presetQuarter: string;
      presetYear: string;
      presetAllTime: string;
    };
  };
  uiLanguages: {
    translations: {
      modalSearchNotFound: string;
      searchInputPlaceholder: string;
      changeLanguage: string;
    };
  };
  uiSelect: {
    translations: {
      searchInputPlaceholder: string;
      notFound: string;
      multipleSelectedText: string;
    };
  };
  uiTable: {
    translations: {
      noData: string;
    };
  };
  uiPagination: {
    translations: {
      show: string;
      from: string;
    };
  };
  uiConfirm: {
    translations: {
      confirmBtn: string;
      cancelBtn: string;
    };
  };
  uiDragAndDrop: {
    translations: {
      file: string;
      dragOr: string;
      selectHere: string;
      cancel: string;
    };
  };
  uiNotification: {
    translations: {
      error: string;
      success: string;
      infoTitle: string;
    };
  };
}

export const config = reactive<UiKitConfig>({
  locale: "en",
  uiDatePicker: {
    beginDate: "2022-01-01",
    modelValueFormat: "YYYY-MM-DD",
    inputFormat: "DD.MM.YYYY",
    translations: {
      invalidDate: "The date is incorrect",
      todayPlaceholder: "Today",
      yesterdayPlaceholder: "Yesterday",
      emptyPlaceholder: "Choose date",
      applyButton: "Apply",
      clearButton: "Clear",
      inputLabelStart: "Start",
      inputLabelEnd: "End",
      presetToday: "Today",
      presetWeek: "Week",
      presetMonth: "Month",
      presetQuarter: "Quarter",
      presetYear: "Year",
      presetAllTime: "All time"
    }
  },
  uiLanguages: {
    translations: {
      searchInputPlaceholder: "Search",
      modalSearchNotFound: "Nothing found",
      changeLanguage: "Change language"
    }
  },
  uiSelect: {
    translations: {
      searchInputPlaceholder: "Search",
      notFound: "Nothing found",
      multipleSelectedText: "Selected:"
    }
  },
  uiTable: {
    translations: {
      noData: "No data"
    }
  },
  uiPagination: {
    translations: {
      show: "Show",
      from: "from"
    }
  },
  uiConfirm: {
    translations: {
      confirmBtn: "Confirm",
      cancelBtn: "Cancel"
    }
  },
  uiDragAndDrop: {
    translations: {
      file: "File",
      dragOr: "Drag the file or",
      selectHere: "select here",
      cancel: "Cancel"
    }
  },
  uiNotification: {
    translations: {
      error: "Error",
      success: "Success",
      infoTitle: "Information"
    }
  }
});
