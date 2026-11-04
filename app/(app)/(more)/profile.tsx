import { Container } from "components/common";
import { useAuthStore } from "lib/storage/useAuthStore";
import { Text, YStack } from "tamagui";

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <Container backgroundColor="white" flex={1} py="4">
      <YStack gap="3">
        <Text fontWeight="600" fontSize={14}>Name</Text>
        <Text fontSize={16}>{user?.name || "—"}</Text>
        <Text fontWeight="600" fontSize={14}>Email</Text>
        <Text fontSize={16}>{user?.email || "—"}</Text>
      </YStack>
    </Container>
  );
}
