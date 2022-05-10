import React from "react";
import Icon from "../globals/icon";
import { colors } from "../globals/utils";

let Search = (props) => {
  const { toggleSearch } = props;

  return (
    <Icon
      name="magnify"
      onPress={toggleSearch}
      backgroundColor={colors.primary}
      styles={{
        borderRadius: null,
      }}
    />
  );
};

export default Search;
