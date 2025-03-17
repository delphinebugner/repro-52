import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  Pressable as RNGHPressable,
} from "react-native-gesture-handler";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

export default function HomeScreen() {
  const sheet = useRef<TrueSheet>(null);
  // Present the sheet ✅
  const present = async () => {
    await sheet.current?.present();
    console.log("horray! sheet has been presented 💩");
  };

  // Dismiss the sheet ✅
  const dismiss = async () => {
    await sheet.current?.dismiss();
    console.log("Bye bye 👋");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Repro Issue Modal iOS (react-native-screens/issues/2770):
        </ThemedText>
        <Button
          onPress={() => router.navigate("/modal")}
          title="Open Modal / formSheet"
        />
        <Button
          onPress={() => router.navigate("/full-screen-modal")}
          title="Open FullScreen Modal"
        />
        <ThemedText type="subtitle">
          Repro Issue Pressable True Sheet Android
          (lodev09/react-native-true-sheet/issues/163):
        </ThemedText>
        <Button onPress={present} title="Open True Sheet" />
        <RNGHPressable
          onPress={() => {
            Alert.alert("RNGHPressable", "onPress is pressed");
          }}
        >
          <ThemedText
            style={{ padding: 8, backgroundColor: "green" }}
          >{`RNGHPressable + onPress`}</ThemedText>
        </RNGHPressable>
        <TrueSheet
          ref={sheet}
          sizes={["auto", "large"]}
          cornerRadius={24}
          edgeToEdge={false} // Necessary for TextInput - see https://github.com/lodev09/react-native-true-sheet/issues/111
        >
          <TrueSheetContent />
        </TrueSheet>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const TrueSheetContent = () => {
  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <ThemedView className="px-5 py-12 gap-5">
        <ThemedText>True Sheet Content</ThemedText>
        <Button
          title={`Pressable + onPress`}
          onPress={() => {
            Alert.alert("Pressable is pressed");
          }}
        />
        <Pressable
          className="p-2 bg-blue-400"
          onPressIn={() => {
            Alert.alert("onPressIn is pressed");
          }}
        >
          <ThemedText>{`Pressable + onPressIn`}</ThemedText>
        </Pressable>
        <RNGHPressable
          onPress={() => {
            Alert.alert("RNGHPressable", "onPress is pressed");
          }}
        >
          <ThemedText
            style={{ padding: 8, backgroundColor: "green" }}
          >{`RNGHPressable + onPress`}</ThemedText>
        </RNGHPressable>
        <ThemedText>Text Input with autofocus</ThemedText>
        <TextInput
          className="border border-slate-500 py-2 px-2 text-slate-500"
          autoFocus
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
