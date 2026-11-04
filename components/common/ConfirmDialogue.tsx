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

      <AlertDialog.Portal theme={"blue_surface1"}>
        <AlertDialog.Overlay
          key="overlay"
          transition="quick"
          opacity="0.5 enter:0 exit:0"
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          transition="quick"
          x="0 enter:0 exit:0"
          scale="1 enter:0.9 exit:0.95"
          opacity="1 enter:0 exit:0"
          y="0 enter:-20px exit:10px"
        >
          <YStack gap="3">
            <AlertDialog.Title fontSize={20}>{title}</AlertDialog.Title>
            <AlertDialog.Description>{body}</AlertDialog.Description>

            <XStack gap="3" justifyContent="flex-end">
              <AlertDialog.Cancel onPress={_handleCancel} asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action onPress={handleOkay} asChild>
                <Button>Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
