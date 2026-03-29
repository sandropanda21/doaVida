import { MapPin } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { requestCardStyles as s } from './requestCard.style';
import { BloodRequest, RequestStatus } from './requestCardType';


type Props = {
  item: BloodRequest;
};


const HOSPITAL = 'Hosp. Materno Infantil Augusto Ngangula';

const STATUS_LABEL: Record<RequestStatus, string> = {
  'active': 'Ativo',
  'pending': 'Pendente',
  'fulfilled': 'Concluído',
};

// Mapeia estado → estilos definidos em requestCard.style.ts
const STATUS_STYLES: Record<
  RequestStatus,
  { badge: object; text: object; circle: object; blood: object }
> = {
  'active': {
    badge: s.badgeAtivo,
    text: s.textAtivo,
    circle: s.circleAtivo,
    blood: s.bloodAtivo,
  },
  'pending': {
    badge: s.badgeEmRevisao,
    text: s.textEmRevisao,
    circle: s.circleEmRevisao,
    blood: s.bloodEmRevisao,
  },
  'fulfilled': {
    badge: s.badgeConcluido,
    text: s.textConcluido,
    circle: s.circleConcluido,
    blood: s.bloodConcluido,
  },
};

export default function RequestCard({ item }: Props) {
  const theme = STATUS_STYLES[item.status];

  const formattedDate = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(item.created_at));

  return (
    <TouchableOpacity
      style={s.card}
      activeOpacity={0.75}
    >
      <View style={s.topRow}>
        <View style={s.topLeft}>
          <View style={[s.statusBadge, theme.badge]}>
            <Text style={[s.statusText, theme.text]}>
              {STATUS_LABEL[item.status]}
            </Text>
          </View>

          <Text style={s.date}>{formattedDate}</Text>
        </View>

        <View style={[s.bloodCircle, theme.circle]}>
          <Text style={[s.bloodType, theme.blood]}>{item.blood_type}</Text>
        </View>
      </View>

      <Text style={s.patientName}>{item.patient_name}</Text>

      <View style={s.addressRow}>
        <MapPin size={12} color="#876464" />
        <Text style={s.addressText}>{HOSPITAL}</Text>
      </View>
    </TouchableOpacity>
  );
}
