import {
  BigHead,
  bodyMap,
  clothingMap,
  eyesMap,
  eyebrowsMap,
  hairMap,
  hatMap,
  theme,
  AvatarProps as AvatarBigHeadProps,
  mouthsMap,
} from "@bigheads/core";

export const defaultAvatarProps: AvatarBigHeadProps = {
  accessory: "none",
  body: "chest",
  circleColor: "blue",
  clothing: "naked",
  clothingColor: "red",
  eyebrows: "raised",
  eyes: "simple",
  faceMaskColor: "black",
  facialHair: "none",
  graphic: "none",
  hair: "none",
  hairColor: "black",
  hat: "none",
  hatColor: "red",
  lipColor: "green",
  mouth: "grin",
  skinTone: "light",
};

export const allBodies = Object.keys(bodyMap) as AvatarBigHeadProps["body"][];
export const allSkinTones = Object.keys(
  theme.colors.skin
) as AvatarBigHeadProps["skinTone"][];
export const allEyes = Object.keys(eyesMap) as AvatarBigHeadProps["eyes"][];
export const allEyebrows = Object.keys(eyebrowsMap) as AvatarBigHeadProps["eyebrows"][];
export const allHair = Object.keys(hairMap) as AvatarBigHeadProps["hair"][];
export const allHairColor = Object.keys(theme.colors.hair) as AvatarBigHeadProps["hairColor"][];
export const allClothes = Object.keys(
  clothingMap
) as AvatarBigHeadProps["clothing"][];
export const allClothesColor = Object.keys(theme.colors.clothing) as AvatarBigHeadProps["clothingColor"][];
export const allHats = Object.keys(hatMap) as AvatarBigHeadProps["hat"][];
export const allMouths = Object.keys(mouthsMap) as AvatarBigHeadProps["mouth"][];