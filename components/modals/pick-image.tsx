import { Trash2 } from "components/icons";
import { ImagePlusSvg } from "assets/svg";
import { PressableImageView } from "components/common";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { View, XStack } from "tamagui";

interface PickImageProps {
  images: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}
const PickImage = ({ setState, images }: PickImageProps) => {
  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      // reduce to strings
      const images = result.assets?.map((asset) => asset.uri);
      setState((prev) => [...prev, ...images]);
    }
  }, []);

  const handleTakePhoto = useCallback(async () => {
    // request camera permissions if not granted, then launch camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // dismiss modal
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      // reduce to strings
      const images = result.assets?.map((asset) => asset.uri);
      setState((prev) => [...prev, ...images]);
    }
  }, []);

  const handleDeleteImg = useCallback((ind) => {
    setState((prev) => prev.filter((_, i) => i !== ind));
  }, []);

  return (
    <>
      <XStack flexWrap="wrap" gap="2" paddingVertical="1">
        {images?.map((image, index) => (
          <View
            key={index}
            borderWidth={1}
            borderRadius="3"
            borderColor="gray9Light"
            position="relative"
            overflow="hidden"
          >
            <PressableImageView
              borderRadius={"3"}
              height={64}
              width={64}
              source={{ uri: image }}
              key={index}
              images={images}
            />

            <View
              pos={"absolute"}
              right={0}
              left={0}
              bottom={0}
              backgroundColor={"#00000020"}
              py="1"
              alignItems="center"
            >
              <TouchableOpacity accessibilityLabel={`Remove image ${index + 1}`} onPress={() => handleDeleteImg(index)}>
                <Trash2 size={18} color="red11Light" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity accessibilityLabel="Add order image" onPress={() => Alert.alert("Add image", "Choose an image source", [
          { text: "Take photo", onPress: () => { void handleTakePhoto(); } },
          { text: "Choose from gallery", onPress: () => { void pickImage(); } },
          { text: "Cancel", style: "cancel" },
        ])}>
          <View
            borderWidth={1}
            borderColor="gray9Light"
            p="4"
            mr={"auto"}
            borderRadius="3"
          >
            <ImagePlusSvg />
          </View>
        </TouchableOpacity>
      </XStack>

    </>
  );
};

export default PickImage;
