import React, { StyleSheet } from "react-native";
import { Fonts } from "../../utils/Fonts";
export default StyleSheet.create({
  textFont: {
    fontFamily: Fonts.MontSerratBold
  },
  itemHeader: {
    paddingTop: 10
  },
  dimSlider: {
    paddingTop: 5,
    paddingBottom: 5
  },
  dimSliderBody: {
    borderBottomWidth: 0,
    width: 150,
    marginRight: 10
  },
  dimSliderText: {
    fontSize: 16,
    width: 45,
    textAlign: 'right'
  },
  consumption: {},
  statusLabel: {
    fontSize: 15,
    //color: "#b1b5b8"
  },
  textFont: {
    fontFamily: Fonts.MontSerratBold,
    color: "#FFFFFF",
    borderBottomWidth: 0,
    borderColor: "black"
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    padding: 5
  },
  labelGreen: {
    backgroundColor: "rgb(106, 194, 191)"
  },
  labelOrange: {
    backgroundColor: "rgb(241, 101, 39)"
  },
  textColor: {
    color: "black"
    //  fontFamily: Fonts.MontSerratBold
  },
  roomBody: {
    paddingLeft: 25,
    borderBottomWidth: 0
    //paddingBottom:10
  },
  roomBtn: {
    borderBottomWidth: 0
    // paddingBottom:10
  },
  textAlignCenter: {
    textAlign: "center",
    color: "#b1b5b8",
    fontFamily: Fonts.MontSerratBold
  },
  textStatus: {
    // textAlign:'center',
    color: "#b1b5b8",
    fontFamily: Fonts.MontSerratBold,
    fontSize: 16,
    // paddingLeft: 15
  },
  btnTextColor: {
    color: "rgb(106, 194, 191)"
  },
  separator: {
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: "rgb(177,181,184)",
    borderTopColor: "rgb(177,181,184)"
  },
  separatorText: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  textAlignLeft: {
    // textAlign: left
  },
  lightingGroups: {
    backgroundColor: "#FFFFFF"
  },
  lightingSwitch: {
    backgroundColor: "rgb(177,181,184)",
    borderRadius: 17
  },
  listBorderd: {
    borderBottomColor: '#FFFAFA',
    borderBottomWidth: 1,
  },
  roomStatus: {
    color: '#999999',
    fontSize: 12
  },
  lightingStatus:{
    flex:1
  }
});
