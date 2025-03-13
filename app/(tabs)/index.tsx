import { Button, Image, Pressable, StyleSheet, View } from "react-native";

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
        <TrueSheet ref={sheet} sizes={["auto", "large"]} cornerRadius={24}>
          <TrueSheetContent />
        </TrueSheet>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const TrueSheetContent = () => {
  const [count, setCount] = useState(0);
  const [countPressable, setCountPressable] = useState(0);
  return (
    <ThemedView className="px-5 py-12 gap-2">
      <ThemedText>True Sheet Content</ThemedText>
      <Button
        title={`Count: ${count}`}
        onPress={() => {
          console.log("count is updated", count);
          setCount((c) => c + 1);
        }}
      />
      <Pressable
        className="p-2 bg-blue-400"
        onPressIn={() => {
          console.log("count pressable is updated", countPressable);
          setCountPressable((c) => c + 1);
        }}
      >
        <ThemedText>{`Count Pressable: ${countPressable}`}</ThemedText>
      </Pressable>
    </ThemedView>
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
