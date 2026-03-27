import { Heart, MapPin, SquarePlus } from "lucide-react-native";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { Button } from "../button/Button";
import { ADDRESS, HOSPITAL, IMAGE } from "./caseCard.constants";
import { caseCard } from "./caseCard.style";
import { CaseCardProps } from "./interface";

export default function CaseCard({
  patientName,
  bloodType,
  status,
  onPress,
}: CaseCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={IMAGE}
        style={caseCard.hospitalImage}
        borderTopRightRadius={12}
        borderTopLeftRadius={12}
      >
        <View>
          <Text style={caseCard.caseStatus}>{status}</Text>
          <Text style={caseCard.bloodInfo}>{bloodType}</Text>
        </View>
      </ImageBackground>

      <View style={caseCard.caseInfo}>
        <Text style={caseCard.patientName}>
          {patientName}
        </Text>

        <View style={caseCard.addressInfo}>
          <SquarePlus color={"#876464"} size={12.5} />
          <Text style={caseCard.addressInfo}>{HOSPITAL}</Text>
        </View>

        <View style={[caseCard.addressInfo, { marginBottom: 12 }]}>
          <MapPin color={"#876464"} size={12.5} />
          <Text style={caseCard.addressInfo}>{ADDRESS}</Text>
        </View>

        <Button
          title="Quero Doar"
          size="medium"
          icon={<Heart color={"#fff"} size={20} />}
        />
      </View>
    </Pressable>
  );
}