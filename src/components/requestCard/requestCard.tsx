import { MapPin } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { requestCardStyles as s } from './requestCard.style';
import { BloodRequest, RequestStatus } from './requestCardType';


type Props = {
  item: BloodRequest;
};


const HOSPITAL = 'Hosp. Materno Infantil Augusto Ngangula';

const STATUS_LABEL: Record<RequestStatus, string> = {
  'ativo': 'Ativo',
  'em revisão': 'Em análise',
  'concluído': 'Concluído',
};

// Mapeia estado → estilos definidos em requestCard.style.ts
const STATUS_STYLES: Record<
  RequestStatus,
  { badge: object; text: object; circle: object; blood: object }
> = {
  'ativo': {
    badge: s.badgeAtivo,
    text: s.textAtivo,
    circle: s.circleAtivo,
    blood: s.bloodAtivo,
  },
  'em revisão': {
    badge: s.badgeEmRevisao,
    text: s.textEmRevisao,
    circle: s.circleEmRevisao,
    blood: s.bloodEmRevisao,
  },
  'concluído': {
    badge: s.badgeConcluido,
    text: s.textConcluido,
    circle: s.circleConcluido,
    blood: s.bloodConcluido,
  },
};


export default function RequestCard({ item }: Props) {
  const theme = STATUS_STYLES[item.estado];

  return (
    <TouchableOpacity
      style={s.card}
      activeOpacity={0.75}
    >
      <View style={s.topRow}>
        <View style={s.topLeft}>
          <View style={[s.statusBadge, theme.badge]}>
            <Text style={[s.statusText, theme.text]}>
              {STATUS_LABEL[item.estado]}
            </Text>
          </View>

          <Text style={s.date}>{item.data_pedido}</Text>
        </View>

        <View style={[s.bloodCircle, theme.circle]}>
          <Text style={[s.bloodType, theme.blood]}>{item.tipo_sanguineo}</Text>
        </View>
      </View>

      <Text style={s.patientName}>{item.nome_paciente}</Text>

      <View style={s.addressRow}>
        <MapPin size={12} color="#876464" />
        <Text style={s.addressText}>{HOSPITAL}</Text>
      </View>
    </TouchableOpacity>
  );
}
