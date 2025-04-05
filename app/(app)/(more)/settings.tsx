import { Container } from "components/common";
import { SettingsBtOption, SettingsSection } from "components/more";
import React from "react";

const Settings = () => {
  return (
    <Container px={"$4"} py={"$3"}>
      {/* section */}
      <SettingsSection title="Bluetooth & Devices">
        <SettingsBtOption />

        {/* Bt connection */}
      </SettingsSection>
    </Container>
  );
};

export default Settings;
