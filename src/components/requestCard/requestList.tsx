import { FlatList } from 'react-native';
import RequestCard from './requestCard';
import { BloodRequest } from './requestCardType';

type Props = {
  data: BloodRequest[];
};

export default function RequestList({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RequestCard item={item}  />
      )}
    />
  );
}
