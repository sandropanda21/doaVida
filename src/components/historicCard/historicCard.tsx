import { PlusSquare } from "lucide-react-native";
import { Text, View } from "react-native";
import { DonatorType, HospitalName } from "./historicCard.constants";
import { historicCard } from "./historicCard.styles";
import { HistoricCardProps } from "./interface";

export default function HistoricCard(props: HistoricCardProps) {
  const { date } = props;
  return (
    <>
      <View style={historicCard.historicCard}>
        <PlusSquare color={"#E53734"} />
        <View>
          <Text style={historicCard.hospitalName}>
            {HospitalName}
          </Text>
          <Text style={historicCard.donator}>
            {DonatorType}
          </Text>
        </View>
        <Text style={historicCard.date}>
          {date}
        </Text>
      </View>
    </>
  )
}