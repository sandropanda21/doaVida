import { Bell } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { headerButton } from "./headerButton.style";

export default function HeaderButton(props: TouchableOpacityProps){
  return (
    <>
      <TouchableOpacity style={headerButton.headerButton} {...props}>
        <Bell color={"#171111"} size={20} />
      </TouchableOpacity>
    </>
  )
}
