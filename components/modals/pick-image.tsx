import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  ChevronRight,
  Delete,
  Trash,
  Trash2,
  XCircle,
} from "@tamagui/lucide-icons";
import { ImagePlusSvg } from "assets/svg";
import { PressableImageView } from "components/common";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text, View, XStack } from "tamagui";

interface PickImageProps {
  images: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}
const PickImage = ({ setState, images }: PickImageProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const pickImage = useCallback(async () => {
    handleDismissModal();

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
    handleDismissModal();

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

  const renderBackdrop = useCallback((backdropProps: any) => {
    return (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={1}
        opacity={0.3}
      />
    );
  }, []);
  const handleDeleteImg = useCallback((ind) => {
    setState((prev) => prev.filter((_, i) => i !== ind));
  }, []);

  return (
    <>
      <XStack flexWrap="wrap" gap={"$2"} paddingVertical={"$1"}>
        {images?.map((image, index) => (
          <View
            key={index}
            borderWidth={1}
            borderRadius={"$3"}
            borderColor={"$gray9Light"}
            position="relative"
            overflow="hidden"
          >
            <PressableImageView
              borderRadius={"$3"}
              h={"$6"}
              w={"$6"}
              src={image}
              key={index}
              images={images}
            />

            <View
              pos={"absolute"}
              right={0}
              left={0}
              bottom={0}
              backgroundColor={"#00000020"}
              py={"$1"}
              alignItems="center"
            >
              <TouchableOpacity onPress={() => handleDeleteImg(index)}>
                <Trash2 size={18} color={"$red11Light"} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={handlePresentModal}>
          <View
            borderWidth={1}
            borderColor={"$gray9Light"}
            p={"$4"}
            mr={"auto"}
            borderRadius={"$3"}
          >
            <ImagePlusSvg />
          </View>
        </TouchableOpacity>
      </XStack>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={(props) => renderBackdrop(props)}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        snapPoints={["26%", "26%"]}
      >
        <View px={"$5"}>
          <ActionButton title="Take Photo" onPress={handleTakePhoto} />
          <ActionButton title="Choose from Gallery" onPress={pickImage} />
          <ActionButton title="Cancel" isCancel onPress={handleDismissModal} />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default PickImage;

interface ActionButtonProps extends TouchableOpacityProps {
  title: string;
  isCancel?: boolean;
}

const ActionButton = ({ title, isCancel, ...rest }: ActionButtonProps) => (
  <TouchableOpacity {...rest}>
    <XStack
      py={"$3"}
      px={"$2"}
      borderBottomWidth={1}
      borderColor={"$gray5Light"}
      justifyContent="space-between"
    >
      <Text
        fontWeight={"600"}
        color={isCancel ? "$red11Light" : "$gray12Light"}
      >
        {title}
      </Text>

      {/* icon */}
      {isCancel ? (
        <XCircle size={22} color={"$red11Light"} />
      ) : (
        <ChevronRight size={22} color={"$gray12Light"} />
      )}
    </XStack>
  </TouchableOpacity>
);
