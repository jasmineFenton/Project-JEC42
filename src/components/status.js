import React from "react";
import { View, Button } from "react";

export const Status = () => {
  //handles auto refreshes of page
  const isRefreshed = () => {
    window.location.reload(false);
  };

  return (
    <View>
      <Button onPress={isRefreshed()}>Refresh the list!</Button>
    </View>
  );
};

export default Status;
