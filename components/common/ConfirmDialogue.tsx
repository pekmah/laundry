import { useState } from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";
import React from "react";

type Props = {
  title?: string;
  body: string;
  handleAccept: () => void;
  handleCancel?: () => void; // Optional, in case you want to handle cancel action
  children: React.ReactNode;
};

export default function ConfirmDialogue({
  title = "Confirm",
  body,
  handleAccept,
  handleCancel,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkay = () => {
    handleAccept();
    handleClose();
  };

  // Optional: handle cancel action if provided
  const _handleCancel = () => {
    if (handleCancel) {
      handleCancel();
    }
    handleClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal theme={"blue_surface4"}>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title fontSize={20}>{title}</AlertDialog.Title>
            <AlertDialog.Description>{body}</AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel onPress={_handleCancel} asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action onPress={handleOkay} asChild>
                <Button theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
