import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

const CustomBottomSheetModal = forwardRef((props: any, ref) => {
  const snapPoints = useMemo(
    () => (props?.snapPoints ? props.snapPoints : ["50%"]),
    [props?.snapPoints]
  );

  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        opacity={props?.backdropOpacity ? props?.backdropOpacity : 0.5}
        {...backdropProps}
      />
    ),
    [props?.backdropOpacity]
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      {...props}
    >
      {props?.children}
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
