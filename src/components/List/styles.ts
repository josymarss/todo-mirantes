import { StyleSheet } from "react-native";
("react-native");

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: 327,
    backgroundColor: "#333333",
    padding: 20,
    marginTop: 10,
    borderRadius: 8,
  },
  detail: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4EA8DE",
    borderRadius: 1000,
    width: 25,
    height: 25,
    marginRight: 10,
  },
  detail2: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4EA8DE",
    borderRadius: 1000,
    width: 25,
    height: 25,
    backgroundColor: "#5E60CE",
    marginRight: 10,
  },
  event: {
    color: "#F2F2F2",
    fontSize: 18,
    fontWeight: "bold",
  },
  trough: {
    color: "#808080",
    fontSize: 13,
    textDecorationLine: "line-through",
  },
  space: {
    flex: 1,
  },
  between: {
    flex: 1,
  },
  wrapDescriptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {   
    color: "#FFFFFF",
    marginTop: 20,
  },
});
