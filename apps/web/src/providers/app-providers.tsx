"use client";

import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/en";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { createQueryClient } from "@/providers/query-client";
import { AuthProvider } from "@/providers/auth-provider";
import { theme } from "@/config/theme";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <DatesProvider settings={{ locale: "en", firstDayOfWeek: 0 }}>
            <ModalsProvider>
              <Notifications position="top-right" />
              {children}
            </ModalsProvider>
          </DatesProvider>
        </MantineProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
