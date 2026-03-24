import React from "react"
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
} from "react-native"

import { buttonStyles } from "./button.styles"
import { ButtonProperties } from "./interface"

export function Button({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  icon,
  fullWidth = true,
  disabled,
  ...rest
}: ButtonProperties) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      style={[
        buttonStyles.base,
        buttonStyles.size[size],
        buttonStyles.variant[variant],
        fullWidth && buttonStyles.fullWidth,
        isDisabled && buttonStyles.disabled
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={buttonStyles.content}>
          {icon && <View style={buttonStyles.icon}>{icon}</View>}

          <Text
            style={[
              buttonStyles.text,
              buttonStyles.textVariant[variant],
              buttonStyles.textSize[size]
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  )
}