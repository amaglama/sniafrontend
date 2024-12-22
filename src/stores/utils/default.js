import { formatDateInput } from "./dateFormats";

export function defaultValue(type){
    switch (type){
      case "date":
        return formatDateInput(Date());
      case "text":
        return "";
      case "number":
        return 0;
      default:
        return "";
    }
  }