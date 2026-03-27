import { StyleSheet } from "react-native"

const baseStyles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  fullWidth: {
    width: "100%"
  },

  disabled: {
    opacity: 0.6
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  text: {
    fontWeight: "semibold"
  }
})

const sizeStyles = StyleSheet.create({
  small: {
    height: 36,
    paddingHorizontal: 12
  },

  medium: {
    height: 48,
    paddingHorizontal: 16
  },

  large: {
    height: 56,
    paddingHorizontal: 20
  }
})

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#E53935"
  },

  outline: {
    borderWidth: 1,
    borderColor: "#E53935",
    backgroundColor: "transparent"
  },

  ghost: {
    backgroundColor: "transparent"
  }
})

const textVariantStyles = StyleSheet.create({
  primary: {
    color: "#FFFFFF"
  },

  outline: {
    color: "#E53935"
  },

  ghost: {
    color: "#E53935"
  }
})

const textSizeStyles = StyleSheet.create({
  small: {
    fontSize: 14
  },

  medium: {
    fontSize: 16
  },

  large: {
    fontSize: 18
  }
})

export const buttonStyles = {
  ...baseStyles,
  size: sizeStyles,
  variant: variantStyles,
  textVariant: textVariantStyles,
  textSize: textSizeStyles
}