import { FC, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import ImageView from "react-native-image-viewing";

import { GetProps, Image } from "tamagui";

export const DEFAUlT_IMG =
  "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

interface IPressableImageViewProps extends GetProps<typeof Image> {
  images?: string[];
  disabled?: boolean;
}

const PressableImageView: FC<IPressableImageViewProps> = ({
  images,
  source,
  disabled,
  ...rest
}) => {
  const [visible, setIsVisible] = useState(false);

  const handleViewImage = () => {
    setIsVisible(true);
  };

  const handleRequestClose = () => {
    setIsVisible(false);
  };

  const imageList = useMemo(() => {
    if (images?.length) {
      return images.map((image) => ({ uri: image }));
    } else if (Array.isArray(source)) {
      return source;
    } else if (typeof source === "number") {
      return [source];
    } else if (typeof source === "object") {
      return [{ uri: source?.uri || DEFAUlT_IMG }];
    } else {
      return [{ uri: DEFAUlT_IMG }];
    }
  }, [images, source]);

  return (
    <>
      <ImageView
        images={imageList}
        imageIndex={0}
        visible={visible}
        onRequestClose={handleRequestClose}
      />
      <TouchableOpacity disabled={disabled} onPress={handleViewImage}>
        <Image {...rest} source={source as number | undefined} />
      </TouchableOpacity>
    </>
  );
};

export default PressableImageView;
