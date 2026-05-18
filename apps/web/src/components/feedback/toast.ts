import { notifications } from "@mantine/notifications";

type ToastPayload = {
  title: string;
  message?: string;
};

type ToastPromisePayload = {
  title: string;
  message?: string | ((error: unknown) => string);
};

export const toast = {
  success: ({ title, message }: ToastPayload) =>
    notifications.show({
      color: "teal",
      title,
      message,
    }),
  error: ({ title, message }: ToastPayload) =>
    notifications.show({
      color: "red",
      title,
      message,
    }),
  info: ({ title, message }: ToastPayload) =>
    notifications.show({
      color: "blue",
      title,
      message,
    }),
  loading: ({ title, message }: ToastPayload) =>
    notifications.show({
      loading: true,
      autoClose: false,
      withCloseButton: false,
      title,
      message,
    }),
};

export const toastPromise = async <T>(
  promise: Promise<T>,
  options: {
    loading: ToastPayload;
    success: ToastPayload;
    error: ToastPromisePayload;
  },
) => {
  const id = notifications.show({
    id: `toast-${Date.now()}`,
    loading: true,
    autoClose: false,
    withCloseButton: false,
    title: options.loading.title,
    message: options.loading.message,
  });

  try {
    const result = await promise;
    notifications.update({
      id,
      color: "teal",
      loading: false,
      autoClose: 2000,
      title: options.success.title,
      message: options.success.message,
    });
    return result;
  } catch (error) {
    notifications.update({
      id,
      color: "red",
      loading: false,
      autoClose: 4000,
      title: options.error.title,
      message:
        typeof options.error.message === "function"
          ? options.error.message(error)
          : options.error.message,
    });
    throw error;
  }
};
