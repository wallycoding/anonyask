import { BigHead } from "@bigheads/core";

import {
  allClothes,
  allEyes,
  allHair,
  allHats,
  allSkinTones,
  allBodies,
  defaultAvatarProps,
  allEyebrows,
  allMouths,
  allHairColor,
  allClothesColor,
} from "@/constants/avatar";
import { Button } from "@/customs/closet";

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

type DefaultAvatarProps = typeof defaultAvatarProps;
interface AvatarProps {
  skin: DefaultAvatarProps;
  onChange(skin: DefaultAvatarProps): void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Closet = (props: AvatarProps) => {
  const [skin] = useState(defaultAvatarProps);
  const skinSize = 100;

  const changeSkin = (key: keyof DefaultAvatarProps, value: any) => () => {
    const _skin = { ...props.skin };
    _skin[key] = value;
    props.onChange({ ..._skin });
  };

  return (
    <Tabs w="90%">
      <TabList overflowX="auto" overflowY="hidden">
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Body
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Color
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Eyes
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Eyebrows
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Hair
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Hair Color
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Clothing
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Clothing Color
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Hat
          </Heading>
        </Tab>
        <Tab>
          <Heading noOfLines={1} fontSize={15}>
            Mouth
          </Heading>
        </Tab>
      </TabList>

      <TabPanels h={400}>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5} justifyContent="space-around">
            {allBodies.map((body) => {
              return (
                <Button
                  key={body}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("body", body)}
                >
                  <BigHead {...skin} body={body} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5} justifyContent="space-beetween">
            {allSkinTones.map((skinTone) => {
              return (
                <Button
                  key={skinTone}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("skinTone", skinTone)}
                >
                  <BigHead {...skin} skinTone={skinTone} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allEyes.map((eyes) => {
              return (
                <Button
                  key={eyes}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("eyes", eyes)}
                >
                  <BigHead {...skin} eyes={eyes} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allEyebrows.map((eyebrow) => {
              return (
                <Button
                  key={eyebrow}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("eyebrows", eyebrow)}
                >
                  <BigHead {...skin} eyebrows={eyebrow} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allHair.map((hair) => {
              return (
                <Button
                  key={hair}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("hair", hair)}
                >
                  <BigHead {...skin} hair={hair} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allHairColor.map((hairColor) => {
              return (
                <Button
                  key={hairColor}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("hairColor", hairColor)}
                >
                  <BigHead
                    {...skin}
                    hair={props.skin.hair}
                    hairColor={hairColor}
                  />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allClothes.map((clothing) => {
              return (
                <Button
                  key={clothing}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("clothing", clothing)}
                >
                  <BigHead {...skin} clothing={clothing} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allClothesColor.map((clothingColor) => {
              return (
                <Button
                  key={clothingColor}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("clothingColor", clothingColor)}
                >
                  <BigHead
                    {...skin}
                    clothing={props.skin.clothing}
                    clothingColor={clothingColor}
                  />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allHats.map((hat) => {
              return (
                <Button
                  key={hat}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("hat", hat)}
                >
                  <BigHead {...skin} hat={hat} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap="wrap" gap={5}>
            {allMouths.map((mouth) => {
              return (
                <Button
                  key={mouth}
                  w={skinSize}
                  h={skinSize}
                  onClick={changeSkin("mouth", mouth)}
                >
                  <BigHead {...skin} mouth={mouth} />
                </Button>
              );
            })}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Closet;
