import { toast } from "react-toastify";

export const showToast = (message: string, type: "success" | "error") => {
  toast.dismiss();
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: 2000,
        position: "top-right",
      });
      break;
    case "error":
      toast.error(message, {
        autoClose: 2000,
        position: "top-right",
      });
      break;
  }
};
